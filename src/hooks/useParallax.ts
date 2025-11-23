import { useEffect, useState } from 'react'

interface UseParallaxProps {
    strength?: number; // how much parallax effect
    containerId: string;
    elementRef: React.RefObject<HTMLElement | HTMLDivElement | HTMLVideoElement | null>;
}

export const useParallax = ({
    strength = 0.0,
    containerId,
    elementRef,
}: UseParallaxProps) => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const container = document.getElementById(containerId)
        const element = elementRef.current
        
        if (!container || !element) return

        const handleScroll = () => {
            const scrollTop = container.scrollTop
            const containerHeight = container.clientHeight

            const elementRect = element.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            
            const elementScrollTop = scrollTop + (elementRect.top - containerRect.top)
            const elementCenter = elementScrollTop + elementRect.height / 2
            const containerCenter = scrollTop + containerHeight / 2
            
            const distance = elementCenter - containerCenter
            
            const parallaxOffset = distance * strength
            setOffset(parallaxOffset)
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        
        handleScroll()

        return () => {
            container.removeEventListener('scroll', handleScroll)
        }
    }, [containerId, elementRef, strength])

    return { offset }
}
