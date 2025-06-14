"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TilesGallery from "../components/TilesGallery";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Ucapan = {
    name: string;
    message: string;
    timestamp: string;
};

export default function Open() {
    const bgRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);
    const mingguRef = useRef<HTMLDivElement>(null);
    const tanggalRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<Ucapan[]>([]);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status] = useState("");
    const [loading, setLoading] = useState(false);

    // Audio Effect
    const audioRef = useRef<HTMLAudioElement>(null);

    const playNavAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = 71; // mulai di detik ke-70
            audio.play();

            // Stop di detik ke-72 (setelah 2 detik)
            setTimeout(() => {
                audio.pause();
            }, 2000);
        }
    };

    // Box Section

    const box1Ref = useRef<HTMLDivElement>(null);
    const box2Ref = useRef<HTMLDivElement>(null);
    const box3Ref = useRef<HTMLDivElement>(null);
    const box4Ref = useRef<HTMLDivElement>(null);
    const box5Ref = useRef<HTMLDivElement>(null);
    const box6Ref = useRef<HTMLDivElement>(null);
    const box7Ref = useRef<HTMLDivElement>(null);
    const box8Ref = useRef<HTMLDivElement>(null);

    const sections = [
        box1Ref,
        box2Ref,
        box3Ref,
        box4Ref,
        box5Ref,
        box6Ref,
        box7Ref,
        box8Ref,
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (sections[index]?.current) {
            sections[index].current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setCurrentIndex(index);
        }
    };

    const handleNext = () => {
        playNavAudio();
        const next = Math.min(currentIndex + 1, sections.length - 1);
        scrollToIndex(next);
    };

    const handlePrev = () => {
        playNavAudio();
        const prev = Math.max(currentIndex - 1, 0);
        scrollToIndex(prev);
    };

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    const banks = [
        {
            name: "Mandiri",
            account: "Intan Purna Ningrum",
            number: "1370024804342",
        },
        {
            name: "Mandiri",
            account: "Deni Priyanto",
            number: "1370018306528",
        },
    ];

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (number: string, index: number) => {
        navigator.clipboard.writeText(number);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const fetchData = async () => {
        const res = await fetch("/api/getUcapan"); // local API route
        const json = await res.json();
        console.log(json);
        setData(json);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/postUcapan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });

            if (res.ok) {
                setBerhasil(true);
                setName("");
                setMessage("");

                fetchData();
            } else {
                alert("Gagal mengirim ucapan.");
            }
        } catch (err) {
            alert("Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        gsap.fromTo(
            bgRef.current,
            { filter: "blur(10px)", opacity: 0, y: 50 },
            {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
            }
        );

        gsap.fromTo(
            saveRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power2.in", duration: 0.5 }
        );

        gsap.fromTo(
            mingguRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, ease: "power2.in", duration: 1, delay: 0.2 }
        );

        gsap.fromTo(
            tanggalRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, ease: "power2.in", duration: 1, delay: 0.3 }
        );

        const targetDate = new Date("2025-06-22T10:00:00+07:00").getTime(); // WIB (GMT+7)

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="text-white overflow-y-hidden">
            <audio ref={audioRef} src="/sounds.mp3" preload="auto"></audio>
            <div className="gradient-wrapper overflow-hidden m-w-screen absolute inset-0">
                <div className="gradient-home-cover-top-left"></div>
                <div className="gradient-home-cover-right"></div>
                <div className="gradient-home-cover-middle"></div>
                <div className="gradient-home-cover-center"></div>
            </div>
            <div className="fixed bottom-52 right-20 flex flex-col gap-y-20 sm:right-34 lg:right-60 z-60">
                <button
                    onClick={handlePrev}
                    type="button"
                    className="group/button pointer-events-auto leading-none disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-block aspect-square h-60 w-60 overflow-hidden rounded-16 transition-[transform,opacity] duration-300 ease-easeOutQuint [position:var(--position,relative)] disabled:scale-75 disabled:opacity-25 bg-white text-black max-lg:h-60"
                >
                    <span
                        className="absolute inset-0 inline-flex items-center justify-center"
                        style={{ transform: "translateY(100%)" }}
                    >
                        <i
                            className="inline-flex not-italic h-18 rotate-180"
                            aria-hidden="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                className="h-full w-full"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8.127 0v14.645l-6.88-6.88L0 9l9 9 9-9-1.248-1.235-6.879 6.88V0H8.127z"
                                ></path>
                            </svg>
                        </i>
                    </span>
                    <span
                        className="absolute inset-0 inline-flex items-center justify-center"
                        style={{ transform: "none" }}
                    >
                        <i
                            className="inline-flex not-italic h-18 rotate-180"
                            aria-hidden="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                className="h-full w-full"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8.127 0v14.645l-6.88-6.88L0 9l9 9 9-9-1.248-1.235-6.879 6.88V0H8.127z"
                                ></path>
                            </svg>
                        </i>
                    </span>
                </button>
                <button
                    onClick={handleNext}
                    type="button"
                    className="group/button pointer-events-auto leading-none disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-block aspect-square h-60 w-60 overflow-hidden rounded-16 transition-[transform,opacity] duration-300 ease-easeOutQuint [position:var(--position,relative)] disabled:scale-75 disabled:opacity-25 bg-white text-black max-lg:h-60"
                >
                    <span
                        className="absolute inset-0 inline-flex items-center justify-center"
                        style={{ transform: "translateY(-100%)" }}
                    >
                        <i
                            className="inline-flex not-italic h-18"
                            aria-hidden="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                className="h-full w-full"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8.127 0v14.645l-6.88-6.88L0 9l9 9 9-9-1.248-1.235-6.879 6.88V0H8.127z"
                                ></path>
                            </svg>
                        </i>
                    </span>
                    <span
                        className="absolute inset-0 inline-flex items-center justify-center"
                        style={{ transform: "none" }}
                    >
                        <i
                            className="inline-flex not-italic h-18"
                            aria-hidden="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                className="h-full w-full"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8.127 0v14.645l-6.88-6.88L0 9l9 9 9-9-1.248-1.235-6.879 6.88V0H8.127z"
                                ></path>
                            </svg>
                        </i>
                    </span>
                </button>
            </div>
            <div className="relative [--round-bg:theme(spacing.24)]">
                <div className="w-full overflow-hidden h-100svh">
                    <div
                        className="center absolute inset-0 text-white h-100svh"
                        ref={box1Ref}
                    >
                        <div className="block overflow-hidden rounded-12">
                            <picture
                                className="absolute inset-0 block h-full w-full"
                                style={{ opacity: 0 }}
                                ref={bgRef}
                            >
                                <img
                                    src="/denintan.jpg"
                                    alt="DENI INTAN"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </picture>
                        </div>
                    </div>
                    <div className="absolute -left-[calc(var(--round-bg)/2)] -top-[calc(var(--round-bg)/2)] h-[calc(100%+var(--round-bg))] w-[calc(100%+var(--round-bg))]">
                        <div className="flex flex-col items-center text-center justify-end px-[4vw] pb-120 text-white min-h-100svh md:justify-center md:pb-0 md:max-w-50vw lg:px-[8.4895833333vw]">
                            <p
                                className="mb-[40svh] text-12 font-medium uppercase leading-[1.328] sm:mb-[50svh] md:mb-24"
                                ref={saveRef}
                                style={{ opacity: 0 }}
                            >
                                save the date :
                            </p>
                            <div className="pointer-events-auto sm:mb-16">
                                <h1 className="whitespace-pre-wrap text-balance text-center text-[length:var(--font-size)] font-medium uppercase leading-[1.2] sm:text-[length:var(--sm-font-size)] md:text-[length:var(--md-font-size)]">
                                    <span
                                        ref={mingguRef}
                                        style={{ opacity: 0 }}
                                    >
                                        Minggu
                                    </span>
                                    <br />
                                    <span
                                        ref={tanggalRef}
                                        style={{ opacity: 0 }}
                                    >
                                        22 Juni 2025
                                    </span>
                                </h1>
                            </div>
                            <div className="hidden">
                                <h3 className="rounded-30 border border-current px-17 pb-5 pt-7 text-center text-12 uppercase leading-none lg:text-14">
                                    popular dates
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col items-center justify-between pt-107 lg:flex-row lg:pt-0 inset-0 text-white min-h-100dvh md:py-[20vh] mb-screen"
                        dir="ltr"
                    ></div>
                </div>
                <div
                    ref={box2Ref}
                    id="intro"
                    className="relative inset-0 h-100svh pointer-events-none w-full pt-107 overflow-hidden text-center"
                >
                    <div className="gradient-home-cover-middle z-10"></div>
                    <div className="px-16 relative z-30">
                        <div className="transform">
                            <h2 className="text-16 font-medium uppercase leading-[1.63] max-md:text-center">
                                Assalamu`alaikum Warahmatullaahi Wabarakaatuh
                            </h2>
                        </div>
                        <p className="text-12 leading-[1.28] max-lg:mb-8 max-md:text-center mt-4">
                            Maha Suci Allah yang telah menciptakan makhluk-Nya
                            berpasang-pasangan. Ya Allah semoga ridho-Mu
                            tercurah mengiringi pernikahan kami:
                        </p>
                        <h1 className="font-serif text-40 italic leading-none text-center">
                            Intan Purna
                            <br />
                            Ningrum
                        </h1>
                        <p className="text-16 leading-[1.28] max-md:text-center mt-8">
                            Putri Bapak Subandi dan Ibu Winarni
                        </p>
                        <p className="text-12 leading-[1.28] max-lg:mb-8 max-md:text-center mt-2">
                            Karangasem RT 02, Muntuk Dlingo Bantul
                        </p>
                        <h2 className="font-serif text-40 italic leading-none text-center">
                            &
                        </h2>
                        <h1 className="font-serif text-40 italic leading-none text-center mt-16">
                            Deni Priyanto
                        </h1>
                        <p className="text-16 leading-[1.28] max-md:text-center mt-8">
                            Putra Bapak Pardimin dan Ibu Painten
                        </p>
                        <p className="text-12 leading-[1.28] max-lg:mb-8 max-md:text-center mt-1">
                            Sukorame RT 20, Mangunan Dlingo Bantul
                        </p>
                        <div className="flex flex-col justify-end absolute inset-x-0 bottom-0 bg-img z-10">
                            <div className="w-full max-w-sm mx-auto">
                                <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg rounded-12 top-0">
                                    <Image
                                        src="/denintan9.jpg"
                                        alt="Denintan"
                                        className="object-cover w-full h-full"
                                        width={300}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="event">
                    <div className="relative pointer-events-none w-full px-16">
                        <div className="gradient-home-cover-middle z-10"></div>
                        <div className="gradient-home-cover-top-left"></div>
                        <div
                            ref={box3Ref}
                            className="flex flex-col items-center text-center justify-start min-h-100svh pt-107 relative z-30"
                        >
                            <h3 className="rounded-30 border border-current px-17 pb-5 pt-7 text-center text-12 uppercase leading-none lg:text-14 mb-34">
                                Wedding events
                            </h3>
                            <h1 className="font-serif text-40 leading-none text-center mb-6">
                                Akad Nikah
                            </h1>
                            <h2 className="text-balance text-22 uppercase leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32">
                                Pukul : 10.00 - Selesai
                            </h2>
                            <p className="text-16 font-medium uppercase pt-107 leading-[1.28] max-lg:mb-2 max-md:text-center mt-32">
                                Kediaman mempelai wanita
                            </p>
                            <p className="text-16 leading-[1.28] max-lg:mb-8 max-md:text-center mt-4">
                                Yang berlokasi di Karangasem RT 02, Muntuk,
                                Dlingo, Bantul.
                            </p>
                            <div className="">
                                <a
                                    href="https://maps.app.goo.gl/fLgrYdEDBjTJrPHR6?g_st=iw"
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
                                                    width="16"
                                                    height="11"
                                                    viewBox="0 0 16 11"
                                                    fill="none"
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M8.002 8.168c.818 0 1.513-.286 2.085-.86a2.844 2.844 0 00.858-2.086c0-.819-.287-1.514-.86-2.086a2.844 2.844 0 00-2.087-.857c-.818 0-1.513.286-2.085.86a2.844 2.844 0 00-.858 2.086c0 .819.287 1.514.86 2.085a2.844 2.844 0 002.087.858zM8 7.094a1.8 1.8 0 01-1.325-.545 1.804 1.804 0 01-.546-1.326c0-.52.182-.961.546-1.325A1.804 1.804 0 018 3.352c.52 0 .962.182 1.325.546.364.364.546.806.546 1.325 0 .52-.182.962-.546 1.326A1.804 1.804 0 018 7.094zm.001 3.353c-1.749 0-3.342-.475-4.78-1.425A8.755 8.755 0 010 5.223a8.758 8.758 0 013.22-3.798C4.657.475 6.25 0 8 0s3.342.475 4.78 1.425A8.755 8.755 0 0116 5.223a8.757 8.757 0 01-3.22 3.799c-1.437.95-3.03 1.425-4.779 1.425zM8 9.433c1.455 0 2.8-.376 4.034-1.13a7.564 7.564 0 002.846-3.08 7.564 7.564 0 00-2.846-3.08A7.599 7.599 0 008 1.014c-1.455 0-2.8.377-4.034 1.13a7.564 7.564 0 00-2.846 3.08 7.564 7.564 0 002.845 3.08A7.599 7.599 0 008 9.433z"
                                                    ></path>
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
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                    />
                                                </svg>
                                            </i>
                                        </span>
                                    </span>
                                    <span className="my-auto grow" dir="ltr">
                                        lihat map lokasi
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div
                            ref={box4Ref}
                            className="flex flex-col items-start justify-start min-h-100svh pt-107 relative z-30"
                        >
                            <TilesGallery />
                            <p className="text-16 font-medium uppercase leading-[1.28] max-lg:mb-2 ">
                                berlanjut dengan acara
                            </p>
                            <h1 className="font-serif text-40 leading-none mb-6">
                                Resepsi
                            </h1>
                            <h2 className="text-balance text-22 uppercase leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32">
                                Pukul : 11.30 - 14.00
                            </h2>
                            {/* <p className="text-16 leading-[1.28] max-lg:mb-8 max-md:text-center mt-4">
                                    Kediaman mempelai wanita
                                </p> */}
                            <p className="text-16 pt-107 leading-[1.28] max-lg:mb-8 mt-4">
                                Yang berlokasi di Karangasem RT 02, Muntuk,
                                Dlingo, Bantul.
                            </p>
                            <div className="">
                                <a
                                    href="https://maps.app.goo.gl/fLgrYdEDBjTJrPHR6?g_st=iw"
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
                                                    width="16"
                                                    height="11"
                                                    viewBox="0 0 16 11"
                                                    fill="none"
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M8.002 8.168c.818 0 1.513-.286 2.085-.86a2.844 2.844 0 00.858-2.086c0-.819-.287-1.514-.86-2.086a2.844 2.844 0 00-2.087-.857c-.818 0-1.513.286-2.085.86a2.844 2.844 0 00-.858 2.086c0 .819.287 1.514.86 2.085a2.844 2.844 0 002.087.858zM8 7.094a1.8 1.8 0 01-1.325-.545 1.804 1.804 0 01-.546-1.326c0-.52.182-.961.546-1.325A1.804 1.804 0 018 3.352c.52 0 .962.182 1.325.546.364.364.546.806.546 1.325 0 .52-.182.962-.546 1.326A1.804 1.804 0 018 7.094zm.001 3.353c-1.749 0-3.342-.475-4.78-1.425A8.755 8.755 0 010 5.223a8.758 8.758 0 013.22-3.798C4.657.475 6.25 0 8 0s3.342.475 4.78 1.425A8.755 8.755 0 0116 5.223a8.757 8.757 0 01-3.22 3.799c-1.437.95-3.03 1.425-4.779 1.425zM8 9.433c1.455 0 2.8-.376 4.034-1.13a7.564 7.564 0 002.846-3.08 7.564 7.564 0 00-2.846-3.08A7.599 7.599 0 008 1.014c-1.455 0-2.8.377-4.034 1.13a7.564 7.564 0 00-2.846 3.08 7.564 7.564 0 002.845 3.08A7.599 7.599 0 008 9.433z"
                                                    ></path>
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
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                    />
                                                </svg>
                                            </i>
                                        </span>
                                    </span>
                                    <span className="my-auto grow" dir="ltr">
                                        lihat map lokasi
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div
                            ref={box5Ref}
                            className="flex flex-col items-end text-right justify-start pt-107 relative z-30"
                        >
                            <h1 className="font-serif text-40 leading-none text-right mb-6">
                                Ngunduh Mantu
                            </h1>
                            <h2 className="text-balance text-22 uppercase leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32">
                                Pukul : 15.00 - 17.00
                            </h2>
                            <p className="text-16 font-medium uppercase pt-107 leading-[1.28] max-lg:mb-2 max-md:text-center">
                                Kediaman mempelai pria
                            </p>
                            <p className="text-16 leading-[1.28] max-lg:mb-8 max-md:text-right mt-4">
                                Yang berlokasi di Sukorame RT 20, Mangunan,
                                Dlingo, Bantul.
                            </p>
                            <div className="">
                                <a
                                    href="https://maps.app.goo.gl/WnpDgSurRMYTGS6J7?g_st=com.google.maps.preview.copy"
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
                                                    width="16"
                                                    height="11"
                                                    viewBox="0 0 16 11"
                                                    fill="none"
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M8.002 8.168c.818 0 1.513-.286 2.085-.86a2.844 2.844 0 00.858-2.086c0-.819-.287-1.514-.86-2.086a2.844 2.844 0 00-2.087-.857c-.818 0-1.513.286-2.085.86a2.844 2.844 0 00-.858 2.086c0 .819.287 1.514.86 2.085a2.844 2.844 0 002.087.858zM8 7.094a1.8 1.8 0 01-1.325-.545 1.804 1.804 0 01-.546-1.326c0-.52.182-.961.546-1.325A1.804 1.804 0 018 3.352c.52 0 .962.182 1.325.546.364.364.546.806.546 1.325 0 .52-.182.962-.546 1.326A1.804 1.804 0 018 7.094zm.001 3.353c-1.749 0-3.342-.475-4.78-1.425A8.755 8.755 0 010 5.223a8.758 8.758 0 013.22-3.798C4.657.475 6.25 0 8 0s3.342.475 4.78 1.425A8.755 8.755 0 0116 5.223a8.757 8.757 0 01-3.22 3.799c-1.437.95-3.03 1.425-4.779 1.425zM8 9.433c1.455 0 2.8-.376 4.034-1.13a7.564 7.564 0 002.846-3.08 7.564 7.564 0 00-2.846-3.08A7.599 7.599 0 008 1.014c-1.455 0-2.8.377-4.034 1.13a7.564 7.564 0 00-2.846 3.08 7.564 7.564 0 002.845 3.08A7.599 7.599 0 008 9.433z"
                                                    ></path>
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
                                                    className="h-full w-full"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                    />
                                                </svg>
                                            </i>
                                        </span>
                                    </span>
                                    <span className="my-auto grow" dir="ltr">
                                        lihat map lokasi
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={box6Ref}
                    id="count-date"
                    className="relative pointer-events-none w-full px-16 mb-16"
                >
                    <div className="flex flex-col mb-12 pt-107 items-center text-center">
                        <h3 className="rounded-30 border border-current px-17 pb-5 pt-7 text-center text-12 uppercase leading-none lg:text-14">
                            Count The Date
                        </h3>
                        <h1 className="text-balance text-22 uppercase leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32 mt-8">
                            MINGGU - 22 JUNI 2025
                        </h1>
                    </div>
                    {/* COUNT DATE */}
                    <div className="flex items-center justify-between">
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-10 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Day
                            </p>
                            <p className="text-center text-24 uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.days}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-10 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Hour
                            </p>
                            <p className="text-center text-24 uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.hours}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-10 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Minute
                            </p>
                            <p className="text-center text-24 uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.minutes}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-10 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Second
                            </p>
                            <p className="text-center text-24 uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.seconds}
                                <span className="italic">{`"`}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-107">
                        <h1 className="font-serif italic text-40 leading-none text-center mb-6">
                            Wedding gift
                        </h1>
                        <p className="text-16 leading-[1.28] max-md:text-center">
                            Doa Restu Anda merupakan karunia yang sangat berarti
                            bagi kami. Namun jika memberi adalah ungkapan tanda
                            kasih Anda, Anda dapat memberi gift
                        </p>
                    </div>
                    <div className="flex flex-col mb-12 pt-12 items-center text-center">
                        <div className="">
                            <button className="group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] w-full">
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
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="h-full w-full"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
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
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="h-full w-full"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                />
                                            </svg>
                                        </i>
                                    </span>
                                </span>
                                <span className="my-auto grow" dir="ltr">
                                    kirim wedding gift
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="px-16 space-y-8">
                        {banks.map((bank, index) => (
                            <div className="px-8" key={index}>
                                <button className="card-mandiri group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-64 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] w-full">
                                    <span className="relative inline-block aspect-square h-full overflow-hidden rounded-12 bg-white/10">
                                        <div className="absolute inset-0 pt-4">
                                            <img
                                                src="/mandiri-fix.webp"
                                                className="w-auto h-auto"
                                                alt=""
                                            />
                                        </div>
                                    </span>
                                    <span
                                        className="my-auto grow text-16"
                                        dir="ltr"
                                    >
                                        {bank.name} - {bank.account}
                                        <br />
                                        <input
                                            type="text"
                                            value={bank.number}
                                            readOnly
                                            className="text-lg text-center font-mono bg-transparent outline-none w-[150px] cursor-default"
                                            onClick={() =>
                                                handleCopy(bank.number, index)
                                            }
                                        />
                                        <i>
                                            {copiedIndex === index
                                                ? "✔ Disalin"
                                                : "📋 Salin"}
                                        </i>
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="relative min-h-100svh pointer-events-none w-full px-16"
                    id="ucapan"
                    ref={box7Ref}
                >
                    <div className="pt-107">
                        <h1 className="font-serif text-40 leading-none text-center mb-6">
                            Ucapan & Doa
                        </h1>
                    </div>
                    <div className="mt-8 px-16 w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label className="sm:text-12 text-11 font-medium uppercase leading-[1.328]">
                                    ucapan dan doa
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="mt-2 w-full group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-22 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] sm:w-full"
                                    placeholder="Kirim ucapan dan doa..."
                                ></textarea>
                            </div>
                            <div className="">
                                <label className="sm:text-12 text-11 font-medium uppercase leading-[1.328]">
                                    nama
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nama"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-2 w-full group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] sm:w-full"
                                />
                            </div>
                            <p className="text-center text-sm text-gray-600">
                                {status}
                            </p>
                            <div className="flex flex-col mb-12 pt-12 items-center text-center">
                                <div className="">
                                    <button
                                        type="submit"
                                        className="group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white/10 text-white backdrop-blur-[8px] w-full"
                                    >
                                        <span className="relative inline-block aspect-square h-full overflow-hidden rounded-12 bg-white/10">
                                            <span
                                                className="absolute inset-0 inline-flex items-center justify-center"
                                                style={{
                                                    transform:
                                                        "translateX(-100%)",
                                                }}
                                            >
                                                <i
                                                    className="inline-flex not-italic h-16"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-full w-full"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
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
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-full w-full"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                                        />
                                                    </svg>
                                                </i>
                                            </span>
                                        </span>
                                        <span
                                            className="my-auto grow"
                                            dir="ltr"
                                        >
                                            {loading
                                                ? "Mengirim..."
                                                : "Kirim Ucapan"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mb-8 px-16 h-64 overflow-hidden rounded-16 bg-white/10 text-white backdrop-blur-[8px] p-2">
                        <div className="flex flex-col items-center gap-2">
                            {data.map((item, idx) => (
                                <div
                                    className="animate-marquee-vertical"
                                    key={idx}
                                >
                                    <button className="group/button pointer-events-auto disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-flex h-48 items-stretch gap-x-16 rounded-16 py-4 pl-4 pr-20 text-center text-11 font-medium uppercase leading-[1.328] [position:var(--position,static)] sm:h-56 sm:text-12 bg-white text-gray-800 w-full">
                                        <span className="relative inline-block aspect-square h-full overflow-hidden rounded-12 bg-gray-300">
                                            <span className="absolute inset-0 inline-flex items-center justify-center">
                                                <i
                                                    className="inline-flex not-italic h-16"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-full w-full"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                                        />
                                                    </svg>
                                                </i>
                                            </span>
                                        </span>
                                        <span
                                            className="my-auto grow text-left"
                                            dir="ltr"
                                        >
                                            {item.name}
                                            <br />
                                            <i>{item.message}</i>
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pt-107" ref={box8Ref}>
                    <p className="text-16 text-center leading-[1.28] max-md:text-center px-16">
                        Terima kasih atas doa, cinta, dan dukungan yang telah
                        anda berikan. Kehadiran dan restu dari anda adalah
                        kebahagiaan bagi kami.
                    </p>
                    <h2 className="text-balance text-22 leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32  text-center mt-8">
                        Salam Hangat,
                    </h2>
                    <h1 className="font-serif text-40 italic leading-none text-center mb-24">
                        Intan & Deni
                    </h1>
                </div>
            </div>
            <div className="hidden fixed inset-x-0 bottom-30 z-10 flex items-center max-sm:justify-center">
                <div className="hidden flex-1 sm:block"></div>
                <div className="">
                    <div className="flex gap-x-2 rounded-18 bg-white p-4 sm:gap-x-10 sm:rounded-20 pointer-events-auto">
                        <a
                            href="#"
                            className="relative inline-flex h-48 items-center rounded-14 px-12 text-center text-11 font-medium uppercase sm:h-64 sm:rounded-18 sm:px-20 pointer-events-none outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2"
                        >
                            <div
                                className="absolute inset-0 bg-gray-300"
                                style={{
                                    borderRadius: "14px",
                                    transform: "none",
                                    transformOrigin: "50% 50% 0px",
                                    opacity: 1,
                                }}
                            ></div>
                            <span className="relative z-10">intro</span>
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex h-48 items-center rounded-14 px-12 text-center text-11 font-medium uppercase sm:h-64 sm:rounded-18 sm:px-20 pointer-events-none outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2"
                        >
                            <span className="relative z-10">description</span>
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex h-48 items-center rounded-14 px-12 text-center text-11 font-medium uppercase sm:h-64 sm:rounded-18 sm:px-20 pointer-events-none outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2"
                        >
                            <span className="relative z-10">finishes</span>
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex h-48 items-center rounded-14 px-12 text-center text-11 font-medium uppercase sm:h-64 sm:rounded-18 sm:px-20 pointer-events-none outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2"
                        >
                            <span className="relative z-10">look</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
