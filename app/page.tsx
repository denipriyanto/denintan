"use client";
import Link from "next/link";
import TilesGallery from "./components/TilesGallery";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAudio } from "./context/audioContext";
import DisplayName from "./components/DisplayName";
import { Suspense } from "react";
import { Mail, MailOpen } from "lucide-react";

export default function Home() {
    const textRef = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const charRefs = useRef<HTMLSpanElement[]>([]);
    charRefs.current = [];
    const charRefs2 = useRef<HTMLSpanElement[]>([]);
    charRefs2.current = [];
    const textTitle = "Enda & Mawan";
    const invTitle = `Wedding Invitation`;
    const buttonRef = useRef<HTMLDivElement>(null);
    const opacityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            charRefs.current,
            { filter: "blur(10px)", opacity: 0, y: 50 },
            {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 2,
                ease: "power3.out",
            }
        );

        gsap.fromTo(
            charRefs2.current,
            { filter: "blur(10px)", opacity: 0, y: 30 },
            {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power3.out",
                delay: 1,
            }
        );

        gsap.fromTo(
            textRef.current,
            {
                opacity: 0,
                filter: "blur(20px)",
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power3.out",
                delay: 1.5,
            }
        );

        gsap.fromTo(
            textRef2.current,
            {
                opacity: 0,
                filter: "blur(20px)",
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power3.out",
                delay: 1.6,
            }
        );

        gsap.fromTo(
            buttonRef.current,
            {
                opacity: 0,
                filter: "blur(30px)",
                y: 60,
            },
            {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 2,
                ease: "power3.out",
                delay: 1.9,
                zIndex: 500,
            }
        );

        gsap.to(opacityRef.current, { opacity: 1 });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Reveal Nama Tamu (Card)
            tl.from(".recipient-card", {
                y: 40,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.5,
            })
                // Reveal Button Buka Undangan
                .from(
                    ".invitation-btn",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=1"
                ); // Start sedikit barengan
        }, buttonRef);

        return () => ctx.revert();
    }, []);

    const { togglePlay } = useAudio();

    const handleClick = () => {
        localStorage.setItem("opened_invitation", "true");
        togglePlay(); // Mulai audio saat undangan dibuka
    };
    return (
        <div className="max-h-dvh overflow-hidden">
            <main ref={opacityRef} style={{ opacity: 0 }}>
                <div className="space-y-custom flex-col px-4 text-center text-white center min-h-100svh [--mt:theme(spacing.20)] sm:[--mt:theme(spacing.40)]">
                    <h1 className="text-balance text-center text-78 font-medium uppercase leading-none sm:h-[1cap] sm:text-90 lg:text-fluid-lg-design-null-118">
                        {textTitle.split("").map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => {
                                    if (el) charRefs.current[i] = el;
                                }}
                                className="inline-block whitespace-pre"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h2 className="font-serif text-40 italic leading-none [--mt:theme(spacing.0)] sm:text-42 sm:[--mt:theme(spacing.20)] lg:text-fluid-lg-design-null-50 mt-0">
                        {invTitle.split("").map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => {
                                    if (el) charRefs2.current[i] = el;
                                }}
                                className="inline-block whitespace-pre"
                            >
                                {char}
                            </span>
                        ))}
                    </h2>
                    <p className="text-balance text-12 font-medium uppercase leading-[2] tracking-[0.25em] max-md:[--mt:theme(spacing.60)] max-sm:[--mt:theme(spacing.34)]">
                        <span ref={textRef}>
                            Untuk Teman, Sahabat dan Saudaraku.
                        </span>
                        <br />
                        <span ref={textRef2}>
                            Dengan penuh rasa syukur dan bahagia, kami
                            mengundang kehadiranmu untuk menjadi bagian dari
                            hari istimewa kami.
                        </span>
                    </p>

                    <div
                        className="flex flex-col items-center gap-y-12 w-full max-w-[320px] mx-auto mt-[var(--mt)]"
                        ref={buttonRef}
                    >
                        {/* Slot Nama Tamu (The Recipient) */}
                        <div className="w-full text-center space-y-4 recipient-card">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block">
                                Dear, Special Guest
                            </span>

                            {/* Nama Tamu dengan Style Glass Card */}
                            <div className="relative py-6 px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
                                {/* Dekorasi Garis Halus ala Editorial */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-white/20"></div>

                                <div className="caslon-font text-2xl md:text-3xl italic text-white tracking-wide">
                                    <Suspense
                                        fallback={
                                            <div className="animate-pulse opacity-20">
                                                Loading...
                                            </div>
                                        }
                                    >
                                        <DisplayName />
                                    </Suspense>
                                </div>

                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-white/20"></div>
                            </div>
                        </div>

                        {/* Tombol Buka Undangan (Seragam dengan Style Pill Anda) */}
                        <div className="z-10 w-full group invitation-btn">
                            <Link
                                onClick={handleClick}
                                href="open"
                                className="group/button relative flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-white px-2 py-2 transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                            >
                                {/* Lingkaran Ikon - Identik dengan Button Map & Gift */}
                                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black text-white transition-transform duration-700 group-hover/button:rotate-[360deg]">
                                    <Mail
                                        size={18}
                                        className="absolute transition-all duration-500 group-hover/button:translate-y-[-150%]"
                                    />
                                    <MailOpen
                                        size={18}
                                        className="absolute translate-y-[150%] transition-all duration-500 group-hover/button:translate-y-0 text-white"
                                    />
                                </div>

                                {/* Teks Tombol */}
                                <span className="flex-1 pr-4 text-center text-11 font-bold uppercase tracking-[0.2em] text-black">
                                    Buka Undangan
                                </span>
                            </Link>

                            {/* Text Hint Kecil di Bawah */}
                            <p className="text-[9px] text-center text-white/30 uppercase tracking-[0.2em] mt-6 animate-pulse">
                                Tap to Reveal Journey
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-hidden h-100svh">
                    <div className="center absolute inset-0 text-white h-100svh overflow-hidden">
                        <TilesGallery />
                    </div>
                </div>
            </main>
        </div>
    );
}
