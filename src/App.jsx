import { useEffect, useRef, useState } from 'react'
import './App.css'
import GlobeMap from './components/GlobeMap'

const itinerary = [
  {
    id: 'day-1',
    day: 1,
    date: '25th April',
    title: 'Arrive Ho Chi Minh City',
    transport: 'flight',
    from: 'Bangalore, India',
    to: 'Ho Chi Minh City, Vietnam',
    arrival: '14:30',
    summary: 'Touch down in Saigon and dive into the vibrant city life.',
    description:
      'Arrive at Tan Son Nhat Airport, check into your hotel, and start exploring the bustling streets of Ho Chi Minh City. From historic landmarks to trendy cafes, the city awaits.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Saigon Central Post Office', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80' },
      { name: 'War Remnants Museum', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cu Chi Tunnels', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80' },
      { name: 'Café Apartment Complex', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
      { name: 'Saigon Opera House', image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Historic charm meets modern energy.'
  },
  {
    id: 'day-2',
    day: 2,
    date: '26th April',
    title: 'Day 2 Title',
    transport: 'taxi',
    from: 'Ho Chi Minh City',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-3',
    day: 3,
    date: '27th April',
    title: 'Day 3 Title',
    transport: 'bus',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-4',
    day: 4,
    date: '28th April',
    title: 'Day 4 Title',
    transport: 'bike',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-5',
    day: 5,
    date: '29th April',
    title: 'Day 5 Title',
    transport: 'car',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-6',
    day: 6,
    date: '30th April',
    title: 'Day 6 Title',
    transport: 'flight',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-7',
    day: 7,
    date: '1st May',
    title: 'Day 7 Title',
    transport: 'bus',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-8',
    day: 8,
    date: '2nd May',
    title: 'Day 8 Title',
    transport: 'taxi',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  },
  {
    id: 'day-9',
    day: 9,
    date: '3rd May',
    title: 'Day 9 Title',
    transport: 'car',
    from: 'Location',
    to: 'Destination',
    arrival: '09:00',
    summary: 'Update summary here.',
    description:
      'Update description here.',
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    places: ['Place 1', 'Place 2', 'Place 3', 'Place 4', 'Place 5'],
    mood: 'Update mood here.'
  }
]

const transportMeta = {
  flight: { icon: '🛩️', label: 'Flight', color: 'rgba(56, 189, 248, 0.25)' },
  bus: { icon: '�', label: 'Bus', color: 'rgba(14, 165, 233, 0.25)' },
  car: { icon: '�', label: 'Car', color: 'rgba(2, 132, 199, 0.25)' },
  taxi: { icon: '�', label: 'Taxi', color: 'rgba(56, 189, 248, 0.2)' },
  bike: { icon: '🛵', label: '2-wheel', color: 'rgba(125, 211, 252, 0.2)' }
}

const DB_NAME = 'itinerary-db'
const STORE_NAME = 'days'
const DB_VERSION = 1

const supportsIndexedDb = typeof window !== 'undefined' && 'indexedDB' in window

const openDb = () =>
  new Promise((resolve, reject) => {
    if (!supportsIndexedDb) {
      reject(new Error('IndexedDB not supported'))
      return
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

const getAllDayData = async () => {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => db.close()
  })
}

const putDayData = async (data) => {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.put(data)
    transaction.oncomplete = () => {
      db.close()
      resolve()
    }
    transaction.onerror = () => reject(transaction.error)
  })
}

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

function App() {
  const [expandedId, setExpandedId] = useState(itinerary[0].id)
  const [activeId, setActiveId] = useState(itinerary[0].id)
  const [dayData, setDayData] = useState({})
  const [dbNotice, setDbNotice] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [visibleDays, setVisibleDays] = useState({})
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionProgress, setSectionProgress] = useState({})
  const [heroProgress, setHeroProgress] = useState(0)
  const sectionRefs = useRef({})
  const heroRef = useRef(null)
  const journeyRef = useRef(null)
  const ratiosRef = useRef({})
  const activeIdRef = useRef(itinerary[0].id)
  const sectionProgressRef = useRef({})
  const heroProgressRef = useRef(0)

  useEffect(() => {
    if (!supportsIndexedDb) {
      setDbNotice('IndexedDB is unavailable in this browser. Photos will only persist in memory.')
      setIsLoading(false)
      return
    }

    const loadData = async () => {
      try {
        const stored = await getAllDayData()
        const storedMap = stored.reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {})
        const defaults = itinerary.reduce((acc, day) => {
          const base = {
            id: day.id,
            completed: false,
            photos: [],
            notes: ''
          }
          acc[day.id] = { ...base, ...(storedMap[day.id] ?? {}) }
          return acc
        }, {})
        setDayData(defaults)
      } catch (error) {
        setDbNotice('Could not read from IndexedDB. Your changes will stay in memory.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const thresholds = Array.from({ length: 6 }, (_, index) => index / 5)
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleDays((prev) => {
          const next = { ...prev }
          entries.forEach((entry) => {
            const id = entry.target.dataset.day
            if (entry.isIntersecting && id) {
              next[id] = true
            }
          })
          return next
        })

        entries.forEach((entry) => {
          const id = entry.target.dataset.day
          if (!id) return
          ratiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0
        })

        const nextActive = Object.entries(ratiosRef.current).reduce(
          (best, [id, ratio]) => (ratio > best.ratio ? { id, ratio } : best),
          { id: activeIdRef.current, ratio: 0 }
        )

        if (nextActive.id && nextActive.id !== activeIdRef.current && nextActive.ratio > 0.1) {
          activeIdRef.current = nextActive.id
          setActiveId(nextActive.id)
        }
      },
      { threshold: thresholds }
    )

    const sections = Object.values(sectionRefs.current)
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false
    const updateProgress = () => {
      if (!journeyRef.current) return
      const rect = journeyRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const start = window.scrollY + rect.top
      const total = journeyRef.current.scrollHeight - viewportHeight
      const scrolled = Math.min(total, Math.max(0, window.scrollY - start))
      const progress = total > 0 ? scrolled / total : 1
      setScrollProgress(progress)

      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect()
        const heroStart = window.scrollY + heroRect.top
        const heroEnd = heroStart + heroRef.current.offsetHeight - viewportHeight
        const heroRaw = heroEnd > heroStart ? (window.scrollY - heroStart) / (heroEnd - heroStart) : 1
        const heroClamped = Math.min(1, Math.max(0, heroRaw))
        if (Math.abs(heroProgressRef.current - heroClamped) > 0.01) {
          heroProgressRef.current = heroClamped
          setHeroProgress(heroClamped)
        }
      }

      const viewportCenter = window.scrollY + viewportHeight * 0.5
      const nextSectionProgress = {}
      let sectionChanged = false

      itinerary.forEach((day) => {
        const section = sectionRefs.current[day.id]
        if (!section) return
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const sectionHeight = section.offsetHeight
        const rawProgress = (viewportCenter - sectionTop) / sectionHeight
        const clamped = Math.min(1, Math.max(0, rawProgress))
        nextSectionProgress[day.id] = clamped

        const previous = sectionProgressRef.current[day.id] ?? 0
        if (Math.abs(previous - clamped) > 0.02) {
          sectionChanged = true
        }
      })

      if (sectionChanged) {
        sectionProgressRef.current = nextSectionProgress
        setSectionProgress(nextSectionProgress)
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = window.scrollY / totalScroll
      const translateY = scrollPercent * -50
      const scale = 1 + scrollPercent * 0.1
      document.body.style.setProperty('--bg-translate', `${translateY}px`)
      document.body.style.setProperty('--bg-scale', scale)
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateProgress()
        ticking = false
      })
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const updateDay = (id, updater) => {
    setDayData((prev) => {
      const current = prev[id] ?? { id, completed: false, photos: [], notes: '' }
      const updated = typeof updater === 'function' ? updater(current) : { ...current, ...updater }
      const next = { ...prev, [id]: updated }

      if (supportsIndexedDb) {
        putDayData(updated).catch(() => {
          setDbNotice('Unable to write to IndexedDB. Your latest change may not persist.')
        })
      }

      return next
    })
  }

  const handleToggleComplete = (event, id) => {
    event.stopPropagation()
    updateDay(id, (current) => ({
      ...current,
      completed: !current.completed
    }))
  }

  const handlePhotoAdd = async (event, id) => {
    event.stopPropagation()
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const dataUrls = await Promise.all(files.map(fileToDataUrl))
    updateDay(id, (current) => ({
      ...current,
      photos: [
        ...current.photos,
        ...dataUrls.map((url, index) => ({
          id: `${Date.now()}-${index}`,
          url,
          name: files[index].name
        }))
      ]
    }))

    event.target.value = ''
  }

  const handlePhotoRemove = (dayId, photoId) => {
    updateDay(dayId, (current) => ({
      ...current,
      photos: current.photos.filter((photo) => photo.id !== photoId)
    }))
  }

  const heroStart = itinerary[0]
  const heroEnd = itinerary[itinerary.length - 1]
  const toggleSection = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }
  const handleDotClick = (id) => {
    const section = sectionRefs.current[id]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    activeIdRef.current = id
    setActiveId(id)
    setExpandedId(id)
  }
  const activeIndex = Math.max(0, itinerary.findIndex((day) => day.id === activeId))

  return (
    <div className="app">
      <header
        className="hero hero--intro"
        ref={heroRef}
        style={{ '--hero-progress': heroProgress }}
      >
        <div className="hero__sticky">
          <div className="hero__backdrop" aria-hidden="true"></div>
          <div className="hero__globe" aria-hidden="true">
            <GlobeMap progress={heroProgress} />
          </div>
          <div className="hero__destination" aria-hidden="true">
            <div className="destination__text">
              <span className="destination__tag">Destination</span>
              <h2>Vietnam</h2>
              <p>From the bustling streets of Ho Chi Minh City to the serene waters of Ha Long Bay, your adventure awaits.</p>
            </div>
          </div>
        </div>
      </header>

      {dbNotice ? <div className="notice notice--global">{dbNotice}</div> : null}

      <section className="progress">
        <div className="progress__label">
          <span>Trip timeline</span>
          <strong>Day {activeIndex + 1} of {itinerary.length}</strong>
        </div>
        <div className="progress__track">
          <div
            className="progress__fill"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          ></div>
          <div className="progress__dots">
            {itinerary.map((day, index) => (
              <button
                type="button"
                key={day.id}
                className={`progress__dot ${index <= activeIndex ? 'is-active' : ''}`}
                aria-label={`Jump to day ${day.day}`}
                onClick={() => handleDotClick(day.id)}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="journey" ref={journeyRef}>
        {itinerary.map((day, index) => {
          const transport = transportMeta[day.transport]
          const state = dayData[day.id] ?? { completed: false, photos: [], notes: '' }
          const isExpanded = expandedId === day.id
          const isVisible = visibleDays[day.id]
          const isActive = activeId === day.id
          const isLast = index === itinerary.length - 1
          const sectionValue = sectionProgress[day.id] ?? 0

          return (
            <article
              key={day.id}
              data-day={day.id}
              ref={(el) => {
                sectionRefs.current[day.id] = el
              }}
              className={`day-section is-open ${
                isVisible ? 'is-visible' : ''
              } ${isActive ? 'is-active' : ''}`}
              style={{
                '--section-color': transport.color,
                '--section-progress': sectionValue
              }}
            >
              {!isLast ? (
                <div className="travel-connector" aria-hidden="true">
                  <span className="travel-icon">{transport.icon}</span>
                  <span className="travel-line"></span>
                </div>
              ) : null}
              <div className="day-shell">
                <div className="day-content">
                  <div className="day-copy">
                    <div className="day-pill-row">
                      <span className="day-pill">Day {day.day}</span>
                      <span className="day-date">{day.date}</span>
                      <span className={`status-pill ${state.completed ? 'is-done' : ''}`}>
                        {state.completed ? 'Completed' : 'In progress'}
                      </span>
                    </div>
                    <div className="day-heading">
                      <h2>{day.title}</h2>
                    </div>
                    <div className="day-media">
                      <div className="day-photo">
                        <img src={day.photo} alt={day.to} loading="lazy" />
                      </div>
                      <div className="day-notes">
                        <label htmlFor={`${day.id}-notes`}>Plans &amp; to-dos</label>
                        <textarea
                          id={`${day.id}-notes`}
                          name={`${day.id}-notes`}
                          placeholder="Add the key things you want to do on this day."
                          value={state.notes ?? ''}
                          onChange={(event) => updateDay(day.id, { notes: event.target.value })}
                        />
                        <button
                          type="button"
                          className={`complete-btn ${state.completed ? 'is-complete' : ''}`}
                          onClick={(event) => handleToggleComplete(event, day.id)}
                        >
                          {state.completed ? 'Completed ✓' : 'Mark as completed'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="day-details" aria-hidden={false}>
                <div className={`places ${sectionValue > 0.3 ? 'places--visible' : ''}`}>
                  <h3>Places visited</h3>
                  <div className="places-scroll">
                    <ul className="places-tree">
                      {day.places.map((place, placeIndex) => {
                        const placeName = typeof place === 'string' ? place : place.name
                        const placeImage = typeof place === 'object' ? place.image : null
                        return (
                          <li 
                            key={placeName} 
                            style={{ 
                              transitionDelay: `${placeIndex * 0.1}s`,
                              opacity: sectionValue > 0.2 + placeIndex * 0.08 ? 1 : 0,
                              transform: sectionValue > 0.2 + placeIndex * 0.08 ? 'translateY(0)' : 'translateY(30px)',
                              backgroundImage: placeImage ? `url(${placeImage})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            <span className="place-name">{placeName}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                <div className="photos">
                  <div className="photos__header">
                    <div>
                      <h3>Your photos</h3>
                      <p>Store memories for this landing zone in IndexedDB.</p>
                    </div>
                    <label
                      className="upload-btn"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => handlePhotoAdd(event, day.id)}
                        disabled={isLoading}
                      />
                      Add photos
                    </label>
                  </div>

                  <div className="photo-stack">
                    {state.photos.length ? (
                      state.photos.map((photo) => (
                        <figure key={photo.id} className="photo-card">
                          <button
                            className="photo-card__remove"
                            onClick={() => handlePhotoRemove(day.id, photo.id)}
                            aria-label="Remove photo"
                          >
                            ×
                          </button>
                          <img src={photo.url} alt={photo.name} loading="lazy" />
                          <figcaption>{photo.name}</figcaption>
                        </figure>
                      ))
                    ) : (
                      <div className="gallery__empty">
                        No photos yet. Upload snapshots of this destination to keep it personal.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </main>
    </div>
  )
}

export default App
