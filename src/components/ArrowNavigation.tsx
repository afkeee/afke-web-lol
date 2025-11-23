import { useEffect, useRef, useState } from 'react'

type Props = {
    sections: readonly string[]
    active: string
    onNavigate: (id: string) => void
}

export default function ArrowNavigation({ sections, active, onNavigate }: Props) {
    const currentIndex = sections.indexOf(active)
    const hasPrev = currentIndex > 0
    const hasNext = currentIndex < sections.length - 1

    const handlePrev = () => {
        if (!hasPrev) return
        onNavigate(sections[currentIndex - 1])
    }

    const handleNext = () => {
        if (!hasNext) return
        onNavigate(sections[currentIndex + 1])
    }

    const pretty = (id: string) => id.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase())

    const [pressed, setPressed] = useState<'prev' | 'next' | null>(null)
    const [hovering, setHovering] = useState(false)
    const [visible, setVisible] = useState(true)
    const [mounted, setMounted] = useState(false)

    const inactivityTimer = useRef<number | null>(null)

    const clearInactivity = () => {
        if (inactivityTimer.current) {
            window.clearTimeout(inactivityTimer.current)
            inactivityTimer.current = null
        }
    }

    const scheduleInactivity = () => {
        clearInactivity()
        inactivityTimer.current = window.setTimeout(() => setVisible(false), 3000)
    }

    const touch = () => {
        setVisible(true)
        scheduleInactivity()
    }

    useEffect(() => {
        scheduleInactivity()
        requestAnimationFrame(() => setMounted(true))
        return () => {
            clearInactivity()
            setMounted(false)
        }
    }, [])

    const pressReset = (which: 'prev' | 'next') => {
        setPressed(which)
        window.setTimeout(() => {
            setPressed(p => (p === which ? null : p))
        }, 800)
    }

    const labelBase = 'px-2 py-0.5 rounded-lg transition-opacity duration-200'
    const prevLabelClass = `${labelBase} ${hasPrev ? 'bg-white/10 border border-white/20 text-white backdrop-blur-xl' : 'bg-black/30 text-white/40 backdrop-blur-sm'}`
    const nextLabelClass = `${labelBase} ${hasNext ? 'bg-white/10 border border-white/20 text-white backdrop-blur-xl' : 'bg-black/30 text-white/40 backdrop-blur-sm'}`

    const prevButtonClass =
        `w-7 h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-lg flex items-center justify-center transition-opacity duration-200 ` +
        `${hasPrev ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/30 text-white/40 pointer-events-none'} backdrop-blur-xl`

    const nextButtonClass =
        `w-7 h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-lg flex items-center justify-center transition-opacity duration-200 ` +
        `${hasNext ? 'bg-white/10 border border-white/20 text-white' : 'bg-black/30 text-white/40 pointer-events-none'} backdrop-blur-xl`

    const computeOpacity = (which: 'prev' | 'next') => {
        if (pressed === which) return 1
        if (hovering) return 0.8
        return visible ? 1 : 0.2
    }

    return (
        <>
            <div
                className="fixed left-1/2 transform -translate-x-1/2 top-6 z-50 flex flex-col items-center gap-1 group"
                onMouseEnter={() => { setHovering(true); touch() }}
                onMouseMove={() => touch()}
                onMouseLeave={() => { setHovering(false); scheduleInactivity() }}
                onTouchStart={() => { setHovering(true); touch() }}
            >
                {hasPrev && (
                    <>
                        <button
                            aria-label={`Previous: ${sections[currentIndex - 1]}`}
                            title={`Previous: ${sections[currentIndex - 1]}`}
                            onClick={handlePrev}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handlePrev()
                                    pressReset('prev')
                                }
                            }}
                            className={prevButtonClass}
                            onMouseDown={() => pressReset('prev')}
                            onTouchEnd={() => pressReset('prev')}
                            style={{ opacity: mounted ? computeOpacity('prev') : 0 }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className={prevLabelClass} style={{ opacity: mounted ? computeOpacity('prev') : 0 }}>
                            <span className="text-xs select-none">
                                {pretty(sections[currentIndex - 1])}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div
                className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50 flex flex-col items-center gap-1 group"
                onMouseEnter={() => { setHovering(true); touch() }}
                onMouseMove={() => touch()}
                onMouseLeave={() => { setHovering(false); scheduleInactivity() }}
                onTouchStart={() => { setHovering(true); touch() }}
            >
                {hasNext && (
                    <>
                        <div className={nextLabelClass} style={{ opacity: mounted ? computeOpacity('next') : 0 }}>
                            <span className="text-xs select-none">
                                {pretty(sections[currentIndex + 1])}
                            </span>
                        </div>

                        <button
                            aria-label={`Next: ${sections[currentIndex + 1]}`}
                            title={`Next: ${sections[currentIndex + 1]}`}
                            onClick={handleNext}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleNext()
                                    pressReset('next')
                                }
                            }}
                            className={nextButtonClass}
                            onMouseDown={() => pressReset('next')}
                            onTouchEnd={() => pressReset('next')}
                            style={{ opacity: mounted ? computeOpacity('next') : 0 }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </>
    )
}
