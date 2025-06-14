"use client";
import Link from "next/link";
import TilesGallery from "./components/TilesGallery";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import { useAudio } from "./context/audioContext";

export default function Home() {
    const textRef = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const charRefs = useRef<HTMLSpanElement[]>([]);
    charRefs.current = [];
    const charRefs2 = useRef<HTMLSpanElement[]>([]);
    charRefs2.current = [];
    const textTitle = "Intan & Deni";
    const invTitle = `Wedding Invitation`;
    const buttonRef = useRef<HTMLDivElement>(null);
    const opacityRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const [displayName, setDisplayName] = useState("...");

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

        const name = searchParams.get("for");

        if (name) {
            setDisplayName(decodeURIComponent(name));
        } else {
            setDisplayName("Tamu");
        }
    }, [searchParams]);

    const { togglePlay } = useAudio();

    const handleClick = () => {
        localStorage.setItem("opened_invitation", "true");
        togglePlay(); // Mulai audio saat undangan dibuka
    };
    return (
        <div className="max-h-dvh overflow-hidden">
            <main ref={opacityRef} style={{ opacity: 0 }}>
                <div className="space-y-custom flex-col px-4 text-center text-white center min-h-100svh [--mt:theme(spacing.20)] sm:[--mt:theme(spacing.40)]">
                    <h1 className="text-balance text-78 font-medium uppercase leading-none sm:h-[1cap] sm:text-90 lg:text-fluid-lg-design-null-118">
                        {textTitle.split("").map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => el && (charRefs.current[i] = el)}
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
                                ref={(el) => el && (charRefs2.current[i] = el)}
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
                        className="flex flex-col gap-x-80 gap-y-25 [--mt:theme(spacing.40)] sm:[--mt:theme(spacing.51)] lg:[--mt:theme(spacing.65)]"
                        ref={buttonRef}
                    >
                        <div className="z-10">
                            <a
                                href="#"
                                className="group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white text-gray-800 w-full"
                            >
                                <span className="relative inline-block aspect-square h-full overflow-hidden rounded-12 bg-gray-300">
                                    <span
                                        className="absolute inset-0 inline-flex items-center justify-center"
                                        style={{
                                            transform: "translateX(-100%)",
                                        }}
                                    >
                                        <i
                                            className="inline-flex not-italic h-16"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </i>
                                    </span>
                                    <span className="absolute inset-0 inline-flex items-center justify-center">
                                        <i
                                            className="inline-flex not-italic h-16"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </i>
                                    </span>
                                </span>
                                <span className="my-auto grow" dir="ltr">
                                    {displayName}
                                </span>
                            </a>
                        </div>
                        <div className="z-10">
                            <Link
                                onClick={handleClick}
                                href="open"
                                className="group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] w-full"
                            >
                                <span className="relative inline-block aspect-square h-full overflow-hidden rounded-12 bg-white/10">
                                    <span
                                        className="absolute inset-0 inline-flex items-center justify-center"
                                        style={{
                                            transform: "translateX(-100%)",
                                        }}
                                    >
                                        <i
                                            className="inline-flex not-italic h-16"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                                />
                                            </svg>
                                        </i>
                                    </span>
                                    <span className="absolute inset-0 inline-flex items-center justify-center">
                                        <i
                                            className="inline-flex not-italic h-16"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                                />
                                            </svg>
                                        </i>
                                    </span>
                                </span>
                                <span className="my-auto grow" dir="ltr">
                                    buka undangan
                                </span>
                            </Link>
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
