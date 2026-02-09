"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const menuItems = [
    { label: "Event", id: "event" },
    { label: "Gallery", id: "gallery" },
    { label: "Gift", id: "wedding-gift" },
    { label: "Wishes", id: "ucapan" },
];

export default function FloatingNav() {
    const navRef = useRef(null);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const nav = navRef.current;

        // 1. Animasi Sembunyi/Muncul (Smart Navbar)
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === 1) {
                    gsap.to(nav, {
                        y: 100,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                    });
                } else {
                    gsap.to(nav, {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                }
            },
        });

        // 2. Logic Active State
        menuItems.forEach((item) => {
            ScrollTrigger.create({
                trigger: `#${item.id}`,
                start: "top center", // Trigger saat bagian atas section mencapai tengah layar
                end: "bottom center",
                onToggle: (self) => {
                    if (self.isActive) setActiveSection(item.id);
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    const scrollToSection = (id: string) => {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: `#${id}`, offsetY: 40 },
            ease: "power4.inOut",
        });
    };

    return (
        <nav
            ref={navRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-fit"
        >
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
                {menuItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`relative px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 rounded-full
                ${isActive ? "text-black" : "text-white/50 hover:text-white"}
            `}
                        >
                            {/* Indikator Background (Pill) - Menggunakan div biasa dengan transisi CSS */}
                            <div
                                className={`absolute inset-0 bg-white rounded-full -z-10 transition-all duration-500 ease-out
                    ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
                            />

                            <span className="relative z-10">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
