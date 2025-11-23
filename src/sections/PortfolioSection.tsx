import { useEffect, useState } from 'react'
import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import SocialButton from '../components/SocialButton'
import { portfolioProjects } from '../data/content'

export default function PortfolioSection() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)
    const [embed, setEmbed] = useState<{ src: string; title?: string } | null>(null)

    const project = portfolioProjects[current]

    const changeProject = (delta: number) => {
        const next = current + delta
        if (next < 0 || next >= portfolioProjects.length) return
        setDirection(delta)
        setCurrent(next)
    }

    const getYoutubeEmbed = (url: string) => {
        try {
            const u = new URL(url)
            const host = u.hostname.replace('www.', '')
            let id = ''
            if (host.includes('youtu.be')) id = u.pathname.slice(1)
            else if (host.includes('youtube.com')) id = u.searchParams.get('v') || u.pathname.split('/').pop() || ''
            return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null
        } catch { return null }
    }

    const openLink = (url: string, title?: string) => {
        const src = getYoutubeEmbed(url)
        if (src) setEmbed({ src, title })
        else window.open(url, '_blank')
    }

    useEffect(() => {
        if (!embed) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = prev }
    }, [embed])

    const motionProps = {
        initial: { opacity: 0, x: direction * 100 },
        animate: { opacity: 1, x: 0 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    }

    return (
        <div className="w-full min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-3 sm:px-4">
            <div className="max-w-4xl md:max-w-7xl w-full text-center">
                <h2 className="font-bold text-3xl md:text-4xl mb-4 md:mb-5 tracking-widest">portfolio</h2>
                <p className="max-w-xl mx-auto text-neutral-300 mb-6 md:mb-8">
                    lorem ipsum dolor sit amet jne värki särki ...
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 overflow-hidden">
                    <motion.div key={project.title} {...motionProps} className="flex flex-col text-left">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed">{project.description}</p>
                    </motion.div>

                    <motion.div key={project.image} {...motionProps} className="flex flex-col space-y-4">
                        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <SocialButton
                            name="Vaata projekti"
                            url={project.link}
                            icon="mdi:youtube"
                            onPress={() => openLink(project.link, project.title)}
                            className="w-full"
                        />
                    </motion.div>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-8">
                    <Button isIconOnly onPress={() => changeProject(-1)} isDisabled={current === 0} className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm border-1 border-white/20">
                        <Icon icon="solar:alt-arrow-left-linear" className="text-xl" />
                    </Button>
                    <span className="text-slate-400">{current + 1} / {portfolioProjects.length}</span>
                    <Button isIconOnly onPress={() => changeProject(1)} isDisabled={current === portfolioProjects.length - 1} className="text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm border-1 border-white/20">
                        <Icon icon="solar:alt-arrow-right-linear" className="text-xl" />
                    </Button>
                </div>
            </div>

            {embed && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setEmbed(null)} />
                    <div className="relative z-10 w-full max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            {embed.title && <h3 className="text-white font-semibold">{embed.title}</h3>}
                            <button onClick={() => setEmbed(null)} className="text-white p-2 rounded bg-black/40 hover:bg-black/60" aria-label="Close video">
                                <Icon icon="solar:close-linear" className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
                            <iframe src={embed.src} title={embed.title || 'video'} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
