import { useEffect, useRef, useState } from 'react'
import { useParallax } from '../hooks/useParallax'

type Props = {
    src: string
    opacity?: number
    blur?: number
    isActive?: boolean
}

export default function BackgroundVideo({ src, opacity = 0.1, blur = 8, isActive = true }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const { offset } = useParallax({
        strength: 0.1,
        containerId: 'main-container',
        elementRef: containerRef,
    })

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isActive) {
            video.play().catch(() => {})
        } else {
            video.pause()
        }

        return () => {
            video.pause()
        }
    }, [isActive])

    return (
        <div 
            ref={containerRef}
            className="absolute inset-0 -z-10 overflow-hidden"
        >
            <video
                ref={videoRef}
                className="absolute w-full h-full object-cover transition-opacity duration-1000"
                style={{
                    opacity: isLoaded ? opacity : 0,
                    filter: `blur(${blur}px) brightness(0.4)`,
                    transform: `translateY(${offset}px) scale(${1.0 + Math.abs(offset) * 0.005})`,
                    transformOrigin: 'center center',
                }}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsLoaded(true)}
            >
                <source src={src} type="video/webm" />
            </video>
        </div>
    )
}