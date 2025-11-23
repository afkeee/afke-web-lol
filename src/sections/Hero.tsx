import SocialButton from '../components/SocialButton';
import { useState, useEffect } from 'react';
import { pinnedProject } from '../data/content';

const birthDate = new Date('2005-11-01T03:00:00+03:00');

function getAge(date: Date) {
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    if (now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())) {
        age--;
    }
    return age;
}

function getDetailedAge(date: Date) {
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    let months = now.getMonth() - date.getMonth();
    let days = now.getDate() - date.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years} aastat, ${months} kuud ja ${days} päeva`;
}

function getExactSeconds(date: Date) {
    return Math.floor((Date.now() - date.getTime()) / 1000);
}

export default function Hero() {
    const [hoverStart, setHoverStart] = useState<number | null>(null);
    const [hoverDuration, setHoverDuration] = useState(0);
    const [detailedAge, setDetailedAge] = useState(getDetailedAge(birthDate));
    const [exactSeconds, setExactSeconds] = useState(getExactSeconds(birthDate));

    useEffect(() => {
        if (!hoverStart) return;

        const interval = setInterval(() => {
            const duration = (Date.now() - hoverStart) / 1000;
            setHoverDuration(duration);
            setExactSeconds(getExactSeconds(birthDate));
        }, 100);

        const minuteUpdate = setInterval(() => setDetailedAge(getDetailedAge(birthDate)), 60000);

        return () => {
            clearInterval(interval);
            clearInterval(minuteUpdate);
        };
    }, [hoverStart]);

    const opacityStates = () => {
        if (!hoverStart) return { initial: 1, detailed: 0, seconds: 0 };
        if (hoverDuration < 2) return { initial: 0, detailed: 1, seconds: 0 };
        const progress = Math.min((hoverDuration - 2) / 5, 1);
        return { initial: 0, detailed: 1 - progress, seconds: progress };
    };

    const { initial, detailed, seconds } = opacityStates();

    return (
        <div className="text-center text-white px-4 md:px-0">
            <div className="mb-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    Afke // Tauri Väli
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-display mt-4 sm:mt-6 max-w-3xl mx-auto">
                    <div className="flex flex-wrap justify-center items-baseline gap-2">
                        <div className="relative inline-block" style={{ minWidth: '150px' }}>
                            <span
                                onMouseEnter={() => setHoverStart(Date.now())}
                                onMouseLeave={() => { setHoverStart(null); setHoverDuration(0); }}
                                className="inline-block"
                            >
                                <span style={{ opacity: initial, transition: 'opacity 0.3s ease', display: 'inline-block' }}>
                                    {`${getAge(birthDate)}-aastane`}
                                </span>
                                <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', opacity: detailed, transition: 'opacity 0.3s ease', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                    {detailedAge}
                                </span>
                                <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', opacity: seconds, transition: 'opacity 0.3s ease', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                    {`Täpselt ${exactSeconds.toLocaleString()} sekundit vana`}
                                </span>
                            </span>
                        </div>
                        <div className="inline-block">monteerija, sisulooja ja muusika produtsent</div>
                    </div>
                </h1>
            </div>

            <div className="flex justify-center mt-8">
                <div className="max-w-3xl w-full grid grid-cols-2 gap-4">
                    <SocialButton name="YouTube" url="https://www.youtube.com/@afkest" icon="simple-icons:youtube" className="w-full" />
                    <SocialButton name="Kontakt" url="mailto:tauri.vali@gmail.com" icon="material-symbols:alternate-email-rounded" className="w-full" />
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="bg-white/5 border-white/10 backdrop-blur-sm border rounded-xl p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-center max-w-3xl w-full min-h-[220px] md:min-h-[320px]">
                    <div className="aspect-video w-full max-w-xs md:max-w-md overflow-hidden rounded-lg shadow-2xl">
                        <img src={pinnedProject.image} alt={pinnedProject.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 md:gap-3">
                        <h3 className="text-xl md:text-3xl font-bold text-white">{pinnedProject.title}</h3>
                        <p className="text-slate-400 text-sm md:text-lg leading-relaxed">{pinnedProject.description}</p>
                        <a href="/pinned" className="inline-block text-white bg-black/50 border-white/10 hover:bg-black/70 backdrop-blur-sm border font-bold px-3 md:px-4 py-2 text-sm md:text-base rounded-lg transition-colors">
                            Vaata projekti
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
