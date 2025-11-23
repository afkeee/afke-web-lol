import { Card, Button } from "@heroui/react";
import SocialButton from "../components/SocialButton";
import { pinnedProjects } from "../data/content";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function PinnedPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 text-white relative">
            <Button
            onClick={() => {navigate("/")}}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/5 hover:bg-white/10 border border-white/20 rounded-sm p-1.5 transition hover:scale-105"
            >
            <Icon icon="material-symbols:keyboard-arrow-left" className="text-white w-6 h-6 md:w-8 md:h-8" />
            </Button>


            <section className="text-center mb-12 mt-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                    VITTU
                </h1>
                <p className="text-slate-300 mt-4 max-w-xl mx-auto text-lg">
                    paneb descriptioni siia
                </p>
            </section>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {pinnedProjects.map((project, idx) => (
                    <Card
                        key={project.title + idx}
                        className="w-full bg-white/5 border border-white/10 backdrop-blur-sm p-2 hover:bg-white/10 transform transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        <Card.Header className="flex flex-col gap-4 items-center">
                            <div className="w-full rounded-lg overflow-hidden shadow-xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-48 md:h-56 rounded-sm"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-3 text-center md:text-left">
                                <Card.Title className="text-2xl md:text-3xl font-bold">
                                    {project.title}
                                </Card.Title>
                                <Card.Description className="text-slate-400 text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </Card.Description>
                            </div>
                        </Card.Header>

                        <Card.Footer className="pt-4">
                            <SocialButton
                                name="Ava Projekt"
                                url={project.link || "/"}
                                icon="mdi:open-in-new"
                                className="w-full justify-center"
                            />
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </main>
    );
}
