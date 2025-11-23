import { useEffect, useRef, useState } from 'react'

type Props = {
    isLoaded: boolean
    onFinish?: () => void
}

export default function Loading({ isLoaded, onFinish }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const [isAnimationDone, setIsAnimationDone] = useState(false)

    useEffect(() => {
        if (!isLoaded) return
        const borderAnimation = setTimeout(() => {
            setIsAnimationDone(true)
            
            animationRef.current = window.setTimeout(() => {
                onFinish?.()
            }, 700)
        }, 1600)

        return () => {
            clearTimeout(borderAnimation)
            if (animationRef.current) clearTimeout(animationRef.current)
        }
    }, [isLoaded, onFinish])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black transition-opacity duration-700 ease-out" style={{ opacity: isAnimationDone ? '0' : '1' }}>
            <div className="absolute inset-0 bg-black pointer-events-none" />
            <div ref={containerRef} className="relative w-44 h-28 flex items-center justify-center transform-gpu will-change-transform transition-all duration-1000 ease-out-cubic" style={{ transform: `scale(${isAnimationDone ? '1.5' : '1'})`, filter: `blur(${isAnimationDone ? '10px' : '0'})` }}>
                <div className="relative w-full h-full rounded-md">
                    <div className="absolute inset-0 border-0 overflow-hidden">
                        <div className={`absolute top-0 left-0 h-[5px] bg-gradient-to-r from-white to-white border-tracer-top ${isLoaded ? 'animate-tracer-top' : ''}`} />
                        <div className={`absolute top-0 right-0 w-[5px] bg-gradient-to-b from-white to-white border-tracer-right ${isLoaded ? 'animate-tracer-right' : ''}`} />
                        <div className={`absolute bottom-0 right-0 h-[5px] bg-gradient-to-l from-white to-white border-tracer-bottom ${isLoaded ? 'animate-tracer-bottom' : ''}`} />
                        <div className={`absolute bottom-0 left-0 w-[5px] bg-gradient-to-t from-white to-white border-tracer-left ${isLoaded ? 'animate-tracer-left' : ''}`} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`text-4xl font-bold text-white tracking-wider transform-gpu loader-text ${isLoaded ? 'text-done' : ''}`}>AFKE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}