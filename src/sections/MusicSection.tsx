import { useState, useRef, useEffect } from 'react';
import { Tabs } from '@heroui/react';
import { Icon } from "@iconify/react";
import SocialButton from '../components/SocialButton';
import { musicArtists } from '../data/content';

export default function MusicSection() {
    const [active, setActive] = useState(0);
    const artists = musicArtists;

    const changeArtist = (index: number) => {
        const len = artists.length;
        setActive((index + len) % len); // wrap around
    };

    // ghetto hack to actually make the tab indicator work, i'm not sure why it didn't work at first.
    const tabsWrapperRef = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<{ left: number; width: number; height: number }>({ left: 0, width: 0, height: 0 });

    useEffect(() => {
        const update = () => {
            const container = tabsWrapperRef.current;
            if (!container) return;
            const tab = container.querySelector(`[data-index="${active}"]`) as HTMLElement | null;
            if (tab) {
                const containerRect = container.getBoundingClientRect();
                const tabRect = tab.getBoundingClientRect();
                setIndicator({
                    left: tabRect.left - containerRect.left + container.scrollLeft,
                    width: tabRect.width,
                    height: tabRect.height,
                });
            }
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [active, artists.length]);

    // this makes it not tweak out, it just works
    useEffect(() => {
        if (artists.length <= 1) return;
        let t1: number | undefined;
        let t2: number | undefined;
        t1 = window.setTimeout(() => setActive(1), 10);
        t2 = window.setTimeout(() => setActive(0), 60);
        return () => {
            if (t1) clearTimeout(t1);
            if (t2) clearTimeout(t2);
        };
    }, []);
    // end of that awesome ghetto hack

    return (
        <div className="text-center text-white max-w-6xl mx-auto px-4 py-8 md:py-12">
            <h2 className="font-bold text-3xl md:text-4xl mb-2 tracking-widest">muusika</h2>
            <p className="max-w-xl mx-auto text-neutral-300 mb-6 md:mb-8">
                lorem ipsum dolor sit amet jne värki särki ...
            </p>

            <Tabs.Root selectedKey={active.toString()} onSelectionChange={key => setActive(Number(key))} className="w-full mb-8">
                <div ref={tabsWrapperRef} className="relative w-full">
                    <Tabs.List aria-label="Artist tabs" className="flex justify-center gap-6">
                        {artists.map((a, i) => (
                            <Tabs.Tab
                                key={i}
                                id={i.toString()}
                                data-index={i}
                                className={`px-6 py-3 font-semibold text-lg transition-all duration-300 rounded-full ${i === active ? 'text-white z-20' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="relative z-20">{a.alias}</span>
                                <Tabs.Indicator className="hidden" />
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    <div
                        className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none border-2 border-orange-400 transition-all duration-300 z-10"
                        style={{ left: `${indicator.left}px`, width: `${indicator.width}px`, height: `${indicator.height}px` }}
                    />
                </div>
            </Tabs.Root>

            <div className="relative overflow-hidden rounded-2xl border border-neutral-700">
                {artists.map((artist, i) => (
                    <div
                        key={`bg-${i}`}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out rounded-2xl ${i === active ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            background: `url(${artist.backgroundImage}) center/cover no-repeat`,
                            filter: 'blur(20px) brightness(0.4)',
                            transform: 'scale(1.1)',
                        }}
                    />
                ))}

                <div className="relative bg-neutral-900/70 backdrop-blur-sm">
                    {['left', 'right'].map(dir => (
                        <button
                            key={dir}
                            onClick={() => changeArtist(active + (dir === 'left' ? -1 : 1))}
                            className={`hidden md:block absolute top-1/2 ${dir}-4 -translate-y-1/2 z-10 transition hover:scale-110 bg-black/30 hover:bg-black/50 border border-white/20 rounded-full p-1`}
                        >
                            <Icon icon={`material-symbols:keyboard-arrow-${dir}`} className="text-white w-8 h-8" />
                        </button>
                    ))}

                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${active * 100}%)` }}>
                        {artists.map((artist) => (
                            <div key={artist.alias} className="w-full flex-shrink-0 p-4 md:p-8">
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex items-center justify-center mb-4 gap-2">
                                        {['left', 'right'].map(dir => (
                                            <button
                                                key={dir}
                                                onClick={() => changeArtist(active + (dir === 'left' ? -1 : 1))}
                                                className="md:hidden inline-flex items-center justify-center transition hover:scale-110 bg-black/30 hover:bg-black/50 rounded-full p-1 border border-white/20"
                                            >
                                                <Icon icon={`material-symbols:keyboard-arrow-${dir}`} className="text-white w-7 h-7" />
                                            </button>
                                        ))}
                                        <h3 className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                            {artist.alias}
                                        </h3>
                                    </div>

                                    <div className="w-2xl h-0.5 bg-white/10 mx-auto mb-6 rounded-full"></div>
                                    <p className="text-neutral-300 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">{artist.description}</p>

                                    <div className="flex justify-center gap-4 mb-8">
                                        {artist.socials.map(s => (
                                            <SocialButton key={s.name} {...s} className="w-full" />
                                        ))}
                                    </div>

                                    <div className="max-w-full mx-auto rounded-xl overflow-hidden shadow-2xl">
                                        <iframe
                                            src={artist.spotifyEmbed}
                                            title={`${artist.alias} spotify`}
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            className="rounded-lg h-[152px] md:h-[352px] w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
