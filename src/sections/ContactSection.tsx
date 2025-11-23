import { useEffect, useRef, useState } from "react"
import SocialButton from "../components/SocialButton"
import Watermark from "../components/Watermark"

export default function ContactSection() {
    const ref = useRef<HTMLDivElement | null>(null)
    const [inView, setInView] = useState(false)

    // since we can't use "fixed", i'm straight up fucking forced to do the most ghetto shit possible, live laugh react and html
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                setInView(entry.isIntersecting && entry.intersectionRatio > 0)
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="text-center text-white" ref={ref}>
            <div className="relative w-full h-full">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 tracking-widest">kontakt</h2>
                <div className="mb-4 sm:mb-6 text-sm sm:text-base">tauri.vali@gmail.com</div>
                <div className="flex justify-center gap-2 sm:gap-4">
                    <SocialButton
                        key="Discord"
                        name="Discord"
                        url="https://discord.com/users/382556798214995968"
                        icon="simple-icons:discord"
                    />
                    <SocialButton
                        key="Gmail"
                        name="Gmail"
                        url="mailto:tauri.vali@gmail.com"
                        icon="simple-icons:gmail"
                    />
                    <SocialButton
                        key="Instagram"
                        name="Instagram"
                        url="https://www.instagram.com/tauri_vali"
                        icon="simple-icons:instagram"
                    />
                </div>
            </div>
            {inView && <Watermark text="<veebilehe tegi zphrprod>" href="https://www.instagram.com/zeppph" />}
        </div>
    )
}