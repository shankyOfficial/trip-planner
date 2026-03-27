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
    photo:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Saigon Central Post Office', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80' },
      { name: 'War Remnants Museum', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cu Chi Tunnels', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80' },
      { name: 'Café Apartment Complex', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
      { name: 'Saigon Opera House', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Historic charm meets modern energy.'
  },
  {
    id: 'day-2',
    day: 2,
    date: '26th April',
    title: 'Fly to Phu Quoc & Sunset Markets',
    transport: 'flight',
    from: 'Ho Chi Minh City',
    to: 'Phu Quoc Island',
    arrival: '13:00',
    photo:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Long Beach (Bãi Trường)', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dinh Cau Night Market', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Sao Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80' },
      { name: 'Phu Quoc Prison', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' },
      { name: 'Duong Dong Town', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Salt air and sunset lights.'
  },
  {
    id: 'day-3',
    day: 3,
    date: '27th April',
    title: 'Phu Quoc Island Adventure',
    transport: 'bike',
    from: 'Phu Quoc Island',
    to: 'Phu Quoc Island',
    arrival: '09:00',
    photo:
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Hon Thom Cable Car', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
      { name: 'Sun World Hon Thom', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rach Vem Starfish Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80' },
      { name: 'Vinpearl Safari', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
      { name: 'Phu Quoc Pepper Farm', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Adventure on the island.'
  },
  {
    id: 'day-4',
    day: 4,
    date: '28th April',
    title: 'Fly to Da Nang & Riverside',
    transport: 'flight',
    from: 'Phu Quoc Island',
    to: 'Da Nang',
    arrival: '13:30',
    photo:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'My Khe Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dragon Bridge', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
      { name: 'Marble Mountains', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
      { name: 'Han Market', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
      { name: 'Son Tra Peninsula', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'City lights and ocean air.'
  },
  {
    id: 'day-5',
    day: 5,
    date: '29th April',
    title: 'Hoi An Lanterns & Ba Na Hills',
    transport: 'car',
    from: 'Da Nang',
    to: 'Hoi An',
    arrival: '09:00',
    photo:
      'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Hoi An Ancient Town', image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=800&q=80' },
      { name: 'Japanese Covered Bridge', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
      { name: 'An Bang Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80' },
      { name: 'Ba Na Hills', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
      { name: 'Golden Bridge', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Lantern glow and mountaintop views.'
  },
  {
    id: 'day-6',
    day: 6,
    date: '30th April',
    title: 'Fly to Hanoi & Old Quarter',
    transport: 'flight',
    from: 'Da Nang',
    to: 'Hanoi',
    arrival: '14:00',
    photo:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Hoan Kiem Lake', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' },
      { name: 'St. Joseph Cathedral', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dong Xuan Market', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
      { name: 'Hanoi Train Street', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
      { name: 'Temple of Literature', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Street food and lantern-lit lanes.'
  },
  {
    id: 'day-7',
    day: 7,
    date: '1st May',
    title: 'Ha Long Bay Cruise',
    transport: 'bus',
    from: 'Hanoi',
    to: 'Ha Long Bay',
    arrival: '08:00',
    photo:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Ha Long Bay', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' },
      { name: 'Sung Sot Cave', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Ti Top Island', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80' },
      { name: 'Luon Cave', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Bai Tu Long Bay', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Blue water and limestone cliffs.'
  },
  {
    id: 'day-8',
    day: 8,
    date: '2nd May',
    title: 'Sapa Valley & Fansipan',
    transport: 'bus',
    from: 'Hanoi',
    to: 'Sapa',
    arrival: '10:00',
    photo:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Sapa Valley', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cat Cat Village', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silver Waterfall', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Ham Rong Mountain', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
      { name: 'Fansipan Cable Car', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Mist, peaks, and rice terraces.'
  },
  {
    id: 'day-9',
    day: 9,
    date: '3rd May',
    title: 'Hanoi Cafés & Fly Home',
    transport: 'flight',
    from: 'Hanoi',
    to: 'Bangalore, India',
    arrival: '22:30',
    photo:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    places: [
      { name: 'Egg Coffee Cafe', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
      { name: 'West Lake', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' },
      { name: 'Hanoi Opera House', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80' },
      { name: 'Imperial Citadel', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' },
      { name: 'Noi Bai Airport', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80' }
    ],
    mood: 'Slow coffee and a final goodbye.'
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

const normalizeImageUrl = (url, size = '1600x900') => {
  if (!url) return url
  return url.includes('source.unsplash.com/featured')
    ? url.replace('source.unsplash.com/featured', `source.unsplash.com/${size}`)
    : url
}

function App() {
  const [activeId, setActiveId] = useState(itinerary[0].id)
  const [activePhoto, setActivePhoto] = useState(null)
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
            notes: '',
            placeInfo: {},
            comments: [],
            commentDraft: ''
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
      const current = prev[id] ?? {
        id,
        completed: false,
        photos: [],
        notes: '',
        placeInfo: {},
        comments: [],
        commentDraft: ''
      }
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
  const handleCommentSave = (dayId) => {
    updateDay(dayId, (current) => {
      const draft = (current.commentDraft ?? '').trim()
      if (!draft) return current
      const nextComment = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        text: draft
      }
      return {
        ...current,
        comments: [...(current.comments ?? []), nextComment],
        commentDraft: ''
      }
    })
  }
  const handleCommentCancel = (dayId) => {
    updateDay(dayId, { commentDraft: '' })
  }
  const handleCommentRemove = (dayId, commentId) => {
    updateDay(dayId, (current) => ({
      ...current,
      comments: (current.comments ?? []).filter((comment) => comment.id !== commentId)
    }))
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
  const handlePhotoView = (photo) => {
    setActivePhoto(photo)
  }
  const handlePhotoClose = () => {
    setActivePhoto(null)
  }

  const heroStart = itinerary[0]
  const heroEnd = itinerary[itinerary.length - 1]
  const defaultPlaceInfo = {
    openingTime: '',
    ticketInfo: '',
    bookingStatus: 'not_booked'
  }
  const handlePlaceInfoChange = (dayId, placeKey, field, value) => {
    updateDay(dayId, (current) => {
      const currentPlaceInfo = current.placeInfo?.[placeKey] ?? {}
      return {
        ...current,
        placeInfo: {
          ...(current.placeInfo ?? {}),
          [placeKey]: {
            ...defaultPlaceInfo,
            ...currentPlaceInfo,
            [field]: value
          }
        }
      }
    })
  }
  const handleDotClick = (id) => {
    const section = sectionRefs.current[id]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    activeIdRef.current = id
    setActiveId(id)
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
        <div className="progress__mini">
          {itinerary.map((day) => (
            <button
              type="button"
              key={`${day.id}-mini`}
              className={`mini-day ${day.id === activeId ? 'is-active' : ''}`}
              onClick={() => handleDotClick(day.id)}
            >
              <span className="mini-day__number">Day {day.day}</span>
            </button>
          ))}
        </div>
      </section>

      <main className="journey" ref={journeyRef}>
        {itinerary.map((day, index) => {
          const transport = transportMeta[day.transport]
          const state = dayData[day.id] ?? {
            completed: false,
            photos: [],
            notes: '',
            placeInfo: {},
            comments: [],
            commentDraft: ''
          }
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
                      <span className="day-date day-pill">{day.date}</span>
                      <span className={`status-pill ${state.completed ? 'is-done' : ''}`}>
                        {state.completed ? 'Completed' : 'In progress'}
                      </span>
                    </div>
                    <div className="day-heading">
                      <h2>{day.title}</h2>
                    </div>
                    <div className="day-media">
                      <div className="day-photo">
                        <img src={normalizeImageUrl(day.photo)} alt={day.to} loading="lazy" />
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
                        const placeInfo = {
                          ...defaultPlaceInfo,
                          ...(state.placeInfo?.[placeName] ?? {})
                        }
                        return (
                          <li 
                            key={placeName} 
                            style={{ 
                              transitionDelay: `${placeIndex * 0.1}s`,
                              opacity: 1,
                              transform: 'translateY(0)'
                            }}
                          >
                            <div className="place-card">
                              <div
                                className="place-card__media"
                                style={{
                                  backgroundImage: placeImage
                                    ? `url(${normalizeImageUrl(placeImage, '800x600')})`
                                    : 'none'
                                }}
                              >
                                <span className="place-name">{placeName}</span>
                              </div>
                              <div className="place-card__info">
                                <label className="place-field">
                                  <span>Opening time</span>
                                  <input
                                    type="text"
                                    value={placeInfo.openingTime}
                                    placeholder="09:00 – 17:00"
                                    onChange={(event) =>
                                      handlePlaceInfoChange(day.id, placeName, 'openingTime', event.target.value)
                                    }
                                  />
                                </label>
                                <label className="place-field">
                                  <span>Ticket info</span>
                                  <input
                                    type="text"
                                    value={placeInfo.ticketInfo}
                                    placeholder="e.g. 250k VND"
                                    onChange={(event) =>
                                      handlePlaceInfoChange(day.id, placeName, 'ticketInfo', event.target.value)
                                    }
                                  />
                                </label>
                                <label className="place-field">
                                  <span>Booking status</span>
                                  <select
                                    value={placeInfo.bookingStatus}
                                    onChange={(event) =>
                                      handlePlaceInfoChange(day.id, placeName, 'bookingStatus', event.target.value)
                                    }
                                  >
                                    <option value="not_booked">Not booked</option>
                                    <option value="requested">Requested</option>
                                    <option value="booked">Booked</option>
                                  </select>
                                </label>
                              </div>
                            </div>
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

                  {state.photos.length ? (
                    <div className="photo-stack">
                      {state.photos.map((photo) => (
                        <figure
                          key={photo.id}
                          className="photo-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => handlePhotoView(photo)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              handlePhotoView(photo)
                            }
                          }}
                        >
                          <button
                            className="photo-card__remove"
                            onClick={(event) => {
                              event.stopPropagation()
                              handlePhotoRemove(day.id, photo.id)
                            }}
                            aria-label="Remove photo"
                          >
                            ×
                          </button>
                          <img src={photo.url} alt={photo.name} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  <div className="comment-box">
                    <div className="comment-box__header">
                      <h4>Comments</h4>
                    </div>
                    <textarea
                      placeholder="Write a quick comment..."
                      value={state.commentDraft ?? ''}
                      onChange={(event) => updateDay(day.id, { commentDraft: event.target.value })}
                      rows={3}
                    />
                    {state.commentDraft?.trim() ? (
                      <div className="comment-actions">
                        <button
                          type="button"
                          className="comment-action comment-action--save"
                          onClick={() => handleCommentSave(day.id)}
                          aria-label="Save comment"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          className="comment-action comment-action--cancel"
                          onClick={() => handleCommentCancel(day.id)}
                          aria-label="Cancel comment"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}
                    {state.comments?.length ? (
                      <ul className="comment-list">
                        {state.comments.map((comment) => (
                          <li key={comment.id}>
                            <span>{comment.text}</span>
                            <button
                              type="button"
                              className="comment-remove"
                              onClick={() => handleCommentRemove(day.id, comment.id)}
                              aria-label="Remove comment"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="day-actions day-actions--below">
                  <button
                    type="button"
                    className={`complete-btn ${state.completed ? 'is-complete' : ''}`}
                    onClick={(event) => handleToggleComplete(event, day.id)}
                  >
                    {state.completed ? 'Completed ✓' : 'Day Completed'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </main>
      {activePhoto ? (
        <div className="photo-viewer" role="dialog" aria-modal="true">
          <div className="photo-viewer__content">
            <button
              type="button"
              className="photo-viewer__close"
              onClick={handlePhotoClose}
              aria-label="Close photo"
            >
              ✕
            </button>
            <img src={activePhoto.url} alt={activePhoto.name} />
            <p>{activePhoto.name}</p>
          </div>
          <button
            type="button"
            className="photo-viewer__backdrop"
            onClick={handlePhotoClose}
            aria-label="Close photo"
          ></button>
        </div>
      ) : null}
    </div>
  )
}

export default App
