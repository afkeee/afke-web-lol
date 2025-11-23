import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Element, scroller, Events } from 'react-scroll'
import SidebarNav from './components/SidebarNav'
import Loading from './components/Loading'
import ArrowNavigation from './components/ArrowNavigation'
import Hero from './sections/Hero'
import PortfolioSection from './sections/PortfolioSection'
import FilmSection from './sections/FilmSection'
import VideoSection from './sections/VideoSection'
import MusicSection from './sections/MusicSection'
import ContactSection from './sections/ContactSection'
import BackgroundVideo from './components/BackgroundVideo'
import { useIsMobile } from './hooks/useIsMobile'
import { useWheelSnap } from './hooks/useWheelSnap'
import PinnedPage from './pages/pinned'

const sections = ['portfolio', 'kodu', 'filmid', 'video', 'muusika', 'kontakt'] as const
type SectionId = typeof sections[number]

function HomePage() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState<SectionId>('kodu')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const currentIndex = sections.indexOf(active)

  const scrollToSection = (section: SectionId) => {
    setActive(section)
    scroller.scrollTo(section, {
      duration: 800,
      smooth: "easeOutQuint",
      containerId: 'main-container',
      isDynamic: true
    })
  }

  useWheelSnap({
    sections,
    currentIndex,
    onSectionChange: (index) => {
      scrollToSection(sections[index])
    },
    containerId: 'main-container',
  })

  useEffect(() => {
    scrollToSection("kodu")
    const t = setTimeout(() => setIsLoaded(true), 0)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    scrollToSection("kodu")
    if (!isLoaded) return
    const t = setTimeout(() => setIsLoading(false), 5000)
    return () => clearTimeout(t)
  }, [isLoaded, isMobile])

  useEffect(() => {
    return () => {
      Events.scrollEvent.remove('begin')
      Events.scrollEvent.remove('end')
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && sections.includes(hash as SectionId)) {
        scrollToSection(hash as SectionId)
      }
    }

    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isLoaded])

  return (
    <>
      {isLoading && <Loading isLoaded={isLoaded} onFinish={() => setIsLoading(false)} />}

      <div className="relative h-full">
        <SidebarNav
          items={sections}
          active={active}
          onNavigate={(id) => scrollToSection(id as SectionId)}
          isVisible={!isMobile}
        />

        {!isLoading && (
          <ArrowNavigation
            sections={sections}
            active={active}
            onNavigate={(id) => scrollToSection(id as SectionId)}
          />
        )}

        <main
          id="main-container"
          className="container-scroll relative z-10 overflow-y-auto h-screen"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {sections.map(id => (
            <Element
              key={id}
              name={id}
              className="section flex items-center justify-center min-h-screen w-full"
            >
              <div className="container w-full mx-auto px-4">
                <BackgroundVideo
                  src={`/bg/${id}.webm`}
                  opacity={0.4}
                  blur={6}
                  isActive={active === id}
                />
                {id === 'portfolio' && <PortfolioSection />}
                {id === 'kodu' && <Hero />}
                {id === 'filmid' && <FilmSection />}
                {id === 'video' && <VideoSection />}
                {id === 'muusika' && <MusicSection />}
                {id === 'kontakt' && <ContactSection />}
              </div>
            </Element>
          ))}
        </main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pinned" element={<PinnedPage />} />
    </Routes>
  )
}