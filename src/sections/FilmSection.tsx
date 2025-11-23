import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { Card, Button, Separator } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { films } from '../data/content'

const FilmCard = memo(({ film, style, isMobile }: any) => (
    <motion.div
        className={`absolute aspect-[2/3] w-full preserve-3d ${isMobile ? 'max-w-[240px]' : 'max-w-[360px]'}`}
        animate={{ x: style.x, scale: style.scale, opacity: style.opacity }}
        initial={{ x: style.x * 1.2, scale: style.scale * 0.9, opacity: 0 }}
        exit={{ x: style.x * 1.5, scale: style.scale * 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
            zIndex: style.zIndex,
            transform: `translateZ(${style.z}px)`,
            filter: isMobile ? 'none' : style.scale < 1 ? 'brightness(0.8) saturate(0.8)' : 'none',
        }}
    >
        <Card.Root className="w-full h-full bg-transparent shadow-xl">
            <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 bg-gradient-to-br from-slate-700 to-slate-900 relative overflow-hidden">
                    <div className="h-full flex items-center justify-center">
                        <img alt={film.title} src={film.image} loading="lazy" className="block w-full aspect-square object-cover select-none" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
                <div className="bg-black p-4 flex-1 flex flex-col overflow-y-auto text-left">
                    <h3 className="font-bold text-xl mb-2 text-white line-clamp-2">{film.title}</h3>
                    <div className="flex items-center gap-2 text-slate-300 mb-3 flex-wrap text-sm">
                        <span>{film.length}</span><Separator orientation="vertical" className="h-3" />
                        <span>{film.genre}</span><Separator orientation="vertical" className="h-3" />
                        <span className="font-bold">{film.year}</span>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-4 whitespace-pre-line">{film.description}</p>
                </div>

            </div>
        </Card.Root>
    </motion.div>
))

export default function FilmSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const next = useCallback(() => setCurrentIndex(i => (i + 1) % films.length), [])
    const prev = useCallback(() => setCurrentIndex(i => (i - 1 + films.length) % films.length), [])

    const handleTouch = useCallback((e: React.TouchEvent, type: 'start' | 'move') => {
        if (type === 'start') return setTouchStart(e.touches[0].clientX)
        if (touchStart === null) return
        const diff = touchStart - e.touches[0].clientX
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev()
            setTouchStart(null)
        }
    }, [touchStart, next, prev])

    const getStyle = useCallback((index: number) => {
        const count = films.length
        const pos = (index - currentIndex + count) % count
        const adj = pos > count / 2 ? pos - count : pos
        const side = adj > 0 ? 1 : -1
        if (adj === 0) return { x: 0, z: 0, scale: 1, opacity: 1, zIndex: 40 }
        if (Math.abs(adj) === 1) return { x: side * (isMobile ? 180 : 300), z: -9000, scale: 0.9, opacity: 0.85, zIndex: 1 }
        return { x: adj * (isMobile ? 220 : 300), z: -900, scale: 0, opacity: 0, zIndex: 10 }
    }, [currentIndex, isMobile])

    const visible = (() => {
        const c = films.length
        if (c <= 3) return Array.from({ length: c }, (_, i) => i)
        const offsets = isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2]
        return offsets.map(o => (currentIndex + o + c) % c)
    })()

    return (
        <div className="text-center text-white py-8">
            <h2 className="font-bold text-4xl mb-3 tracking-widest">filmid</h2>
            <p className="max-w-xl mx-auto text-slate-300 px-4 mb-8">lorem ipsum dolor sit amet jne värki särki ...</p>

            <div className="w-full perspective-1000 overflow-visible">
                <div ref={carouselRef} className={`relative max-w-6xl mx-auto flex items-center justify-center overflow-visible px-4 ${isMobile ? 'h-[360px]' : 'h-[550px]'}`}
                    onTouchStart={e => handleTouch(e, 'start')} onTouchMove={e => handleTouch(e, 'move')}>
                    {!isMobile && <>
                        <Button isIconOnly className="absolute left-4 z-50 text-white bg-black/50 border border-white/20" onPress={prev}><Icon icon="solar:alt-arrow-left-linear" className="text-2xl" /></Button>
                        <Button isIconOnly className="absolute right-4 z-50 text-white bg-black/50 border border-white/20" onPress={next}><Icon icon="solar:alt-arrow-right-linear" className="text-2xl" /></Button>
                    </>}
                    <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {visible.map(i => <FilmCard key={i} film={films[i]} style={getStyle(i)} isMobile={isMobile} />)}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {!isMobile && <div className="flex justify-center gap-1.5 mt-4 px-2">
                {films.map((_, i) => (
                    <motion.button key={i} className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-white shadow-lg' : 'bg-slate-600'}`}
                        onClick={() => setCurrentIndex(i)} whileTap={{ scale: 0.9 }}
                        animate={{ scale: i === currentIndex ? 1.6 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} />
                ))}
            </div>}

            <style>{`
                .perspective-1000 { perspective: 2600px; }
                .preserve-3d { transform-style: preserve-3d; }
                .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
            `}</style>
        </div>
    )
}
