import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const BANGALORE = { lng: 77.5946, lat: 12.9716 }
const HO_CHI_MINH = { lng: 106.6297, lat: 10.8231 }

function generateArc(start, end, numPoints = 100) {
  const points = []
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints
    const lng = start.lng + (end.lng - start.lng) * t
    const lat = start.lat + (end.lat - start.lat) * t
    const altitude = Math.sin(Math.PI * t) * 8
    const adjustedLat = lat + altitude
    points.push([lng, adjustedLat])
  }
  return points
}

export default function GlobeMap({ progress = 0 }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const planeMarker = useRef(null)
  const arcPoints = useRef(generateArc(BANGALORE, HO_CHI_MINH))

  useEffect(() => {
    if (map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '&copy; Esri'
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 19
          }
        ],
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
      },
      center: [92, 12],
      zoom: 2.5,
      pitch: 0,
      bearing: 0,
      interactive: false,
      attributionControl: false
    })

    map.current.on('load', () => {
      map.current.addSource('flight-arc', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: arcPoints.current
          }
        }
      })

      map.current.addLayer({
        id: 'flight-arc-bg',
        type: 'line',
        source: 'flight-arc',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'rgba(255, 255, 255, 0.3)',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      })

      map.current.addLayer({
        id: 'flight-arc-active',
        type: 'line',
        source: 'flight-arc',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#f97316',
          'line-width': 3
        }
      })

      map.current.addSource('cities', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Bangalore' },
              geometry: { type: 'Point', coordinates: [BANGALORE.lng, BANGALORE.lat] }
            },
            {
              type: 'Feature',
              properties: { name: 'Ho Chi Minh' },
              geometry: { type: 'Point', coordinates: [HO_CHI_MINH.lng, HO_CHI_MINH.lat] }
            }
          ]
        }
      })

      map.current.addLayer({
        id: 'city-dots',
        type: 'circle',
        source: 'cities',
        paint: {
          'circle-radius': 8,
          'circle-color': '#f97316',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      })

      map.current.addLayer({
        id: 'city-labels',
        type: 'symbol',
        source: 'cities',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Regular'],
          'text-size': 12,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff',
          'text-halo-color': 'rgba(0, 0, 0, 0.7)',
          'text-halo-width': 2
        }
      })

      const planeEl = document.createElement('div')
      planeEl.className = 'plane-marker'
      planeEl.innerHTML = '✈️'
      planeEl.style.fontSize = '28px'
      planeEl.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'

      planeMarker.current = new maplibregl.Marker({
        element: planeEl,
        rotationAlignment: 'map'
      })
        .setLngLat([BANGALORE.lng, BANGALORE.lat])
        .addTo(map.current)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !planeMarker.current) return

    const points = arcPoints.current
    const index = Math.min(Math.floor(progress * (points.length - 1)), points.length - 1)
    const point = points[index]

    if (point) {
      planeMarker.current.setLngLat(point)

      let prevPoint = index > 0 ? points[index - 1] : point
      let nextPoint = index < points.length - 1 ? points[index + 1] : point
      
      const dx = nextPoint[0] - prevPoint[0]
      const dy = nextPoint[1] - prevPoint[1]
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      planeMarker.current.setRotation(angle + 45)
    }

    const visiblePoints = points.slice(0, index + 1)
    const source = map.current.getSource('flight-arc')
    if (source) {
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: visiblePoints.length > 1 ? visiblePoints : points.slice(0, 2)
        }
      })
    }

    const startLng = 85
    const endLng = 100
    const currentLng = startLng + (endLng - startLng) * progress
    map.current.easeTo({
      center: [currentLng, 12],
      duration: 0
    })
  }, [progress])

  return (
    <div
      ref={mapContainer}
      className="globe-map"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden'
      }}
    />
  )
}