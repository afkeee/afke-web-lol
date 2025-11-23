import { useEffect, useState } from "react"

type WatermarkProps = {
	text?: string
	href?: string
}

export default function Watermark({ text = "afke", href = "/" }: WatermarkProps) {
	const [shown, setShown] = useState(false)

	useEffect(() => {
		const raf = requestAnimationFrame(() => setShown(true))
		return () => {
			cancelAnimationFrame(raf)
			setShown(false)
		}
	}, [])

	return (
		<a
			href={href}
			aria-label={text}
			className={`fixed bottom-4 right-4 z-50 select-none text-xs sm:text-sm md:text-base text-white transition-opacity duration-500 ${
				shown ? "opacity-10" : "opacity-0"
			}`}
		>
			<span className="tracking-widest font-semibold">{text}</span>
		</a>
	)
}
