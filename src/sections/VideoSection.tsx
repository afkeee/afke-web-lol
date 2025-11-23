import SocialButton from '../components/SocialButton'

export default function VideoSection() {
    return (
        <div className="text-center text-white">
            <h2 className="font-bold text-4xl mb-2 tracking-widest">video</h2>
            <p className="max-w-xl mx-auto text-slate-300 mb-6">lorem ipsum dolor sit amet jne värki särki ...</p>

            <div className="mx-auto max-w-2xl">
                <div className="mb-4 flex gap-3 justify-center">
                    <SocialButton
                        key="Youtube"
                        name="YouTube"
                        url="https://www.youtube.com/@afkest"
                        icon="simple-icons:youtube"
                        className='w-full'
                    />
                    <SocialButton
                        key="Tiktok"
                        name="Tiktok"
                        url="https://www.tiktok.com/@leafkest"
                        icon="simple-icons:tiktok"
                        className='w-full'
                    />
                    <SocialButton
                        key="Discord"
                        name="Discord"
                        url="https://discord.com/users/382556798214995968"
                        icon="simple-icons:discord"
                        className='w-full'
                    />
                </div>

                <div className="relative" style={{ paddingTop: '56.25%' }}>
                    <iframe
                        title="youtube"
                        src="https://www.youtube.com/embed/Srh7nmoyNPs"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className='rounded-lg'
                    />
                </div>
            </div>
        </div>
    )
}