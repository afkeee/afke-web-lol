import { useEffect, useRef } from 'react'

interface UseWheelSnapProps {
  sections: readonly string[]
  currentIndex: number
  onSectionChange: (index: number) => void
  containerId: string
}

export const useWheelSnap = ({
  sections,
  currentIndex,
  onSectionChange,
  containerId,
}: UseWheelSnapProps) => {
  const scrollingRef = useRef(false)
  const wheelAccumulatorRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const currentIndexRef = useRef(currentIndex)
  const onSectionChangeRef = useRef(onSectionChange)

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    onSectionChangeRef.current = onSectionChange
  }, [onSectionChange])

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      wheelAccumulatorRef.current += e.deltaY

      const threshold = 20
      if (Math.abs(wheelAccumulatorRef.current) < threshold) {
        e.preventDefault()
        return
      }

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1
      const nextIndex = currentIndexRef.current + direction

      if (nextIndex < 0 || nextIndex >= sections.length) {
        wheelAccumulatorRef.current = 0
        e.preventDefault()
        return
      }

      e.preventDefault()
      wheelAccumulatorRef.current = 0

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      scrollingRef.current = true

      onSectionChangeRef.current(nextIndex)

      timeoutRef.current = setTimeout(() => {
        scrollingRef.current = false
      }, 800)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      wheelAccumulatorRef.current = 0
    }
  }, [containerId, sections.length])

  return {
    isScrolling: scrollingRef.current,
  }
}
