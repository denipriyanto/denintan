"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, Send, Gift, Heart, Instagram } from "lucide-react";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

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

    const introSectionRef = useRef(null);
    const containerProfileWomanRef = useRef(null);
    const containerProfileManRef = useRef(null);
    const brideRef = useRef(null);
    const groomRef = useRef(null);

    // Audio Effect
    const audioRef = useRef<HTMLAudioElement>(null);

    // const playNavAudio = () => {
    //     const audio = audioRef.current;
    //     if (audio) {
    //         audio.currentTime = 71; // mulai di detik ke-70
    //         audio.play();

    //         // Stop di detik ke-72 (setelah 2 detik)
    //         setTimeout(() => {
    //             audio.pause();
    //         }, 2000);
    //     }
    // };

    // Slideshow

    const images = [
        "/ENDA_SLIDE_1.avif",
        "/ENDA_SLIDE_2.avif",
        "/ENDA_SLIDE_3.avif",
    ];

    const galleryImages = [
        { src: "/endamawan6.avif", title: "The Beginning" },
        { src: "/endamawan4.avif", title: "The Proposal" },
        { src: "/endamawan14.avif", title: "Engagement" },
        { src: "/endamawan7.avif", title: "Pre-Wedding" },
        { src: "/endamawan1.avif", title: "Our Journey" },
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        const ctx = gsap.context(() => {
            // Hitung total geser: lebar total konten minus lebar layar
            const totalWidth = section.scrollWidth;
            const windowWidth = window.innerWidth;

            gsap.to(sectionRef.current, {
                x: () => -(totalWidth - windowWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`, // Durasi scroll sesuai lebar konten
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Re-kalkulasi jika layar diputar/resize
                },
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    const giftRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animasi Teks & Button Pembuka
            gsap.from(".gift-header > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: giftRef.current,
                    start: "top 85%",
                },
            });

            // 2. Animasi Kartu Bank (Efek Floating Reveal)
            gsap.from(".bank-card", {
                scale: 0.8,
                y: 100,
                rotationX: 45, // Kartu seolah miring dari bawah
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".bank-card-container",
                    start: "top 80%",
                },
            });
        }, giftRef);

        return () => ctx.revert();
    }, []);

    const wishSectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Reveal Judul & Form
            gsap.from(".wish-header, .wish-form", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: wishSectionRef.current,
                    start: "top 80%",
                },
            });

            // 2. Reveal List Ucapan (Staggered)
            gsap.from(".wish-card", {
                x: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".wish-list-container",
                    start: "top 85%",
                },
            });
        }, wishSectionRef);

        return () => ctx.revert();
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);
    const bgSlideRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(introSectionRef.current, {
                y: 50, // Mulai 50px di bawah
                opacity: 0, // Mulai transparan
                duration: 1.5, // Durasi animasi
                ease: "power3.out", // Easing yang smooth dan natural
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%", // Mulai animasi saat bagian ini 80% terlihat
                    toggleActions: "play none none reverse", // Play saat masuk, reverse saat keluar
                },
            });

            // Animasi terpisah untuk judul (stagger lebih halus)
            gsap.from(".caslon-font", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                delay: 0.3, // Sedikit delay setelah introSection muncul
                ease: "power3.out",
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animasi untuk paragraf (terakhir muncul)
            gsap.from(".intro-paragraph", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                delay: 0.6, // Delay setelah judul muncul
                ease: "power3.out",
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }, introSectionRef); // Pastikan context mengarah ke ref yang benar

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi Domino
            gsap.from(".images-wrapper", {
                y: 100, // Muncul dari bawah sejauh 100px
                opacity: 0, // Mulai dari transparan
                duration: 1.2, // Durasi per gambar
                ease: "power4.out", // Easing yang halus ala Webflow
                stagger: 0.3, // Jeda antar gambar (efek domino)
                scrollTrigger: {
                    trigger: containerProfileWomanRef.current,
                    start: "top 40%", // Animasi mulai saat container 80% terlihat di layar
                    toggleActions: "play none none reverse",
                },
            });
        }, containerProfileWomanRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi Domino
            gsap.from(".images-wrapper", {
                y: 100, // Muncul dari bawah sejauh 100px
                opacity: 0, // Mulai dari transparan
                duration: 1.2, // Durasi per gambar
                ease: "power4.out", // Easing yang halus ala Webflow
                stagger: 0.3, // Jeda antar gambar (efek domino)
                scrollTrigger: {
                    trigger: containerProfileManRef.current,
                    start: "top 30%", // Animasi mulai saat container 80% terlihat di layar
                    toggleActions: "play none none reverse",
                },
            });
        }, containerProfileManRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-bio > *", {
                y: 20, // Gerak sedikit dari bawah (20px saja agar subtle)
                opacity: 0, // Dari transparan
                duration: 0.8, // Durasi kemunculan
                stagger: 0.15, // Jeda antar baris (efek domino)
                ease: "power2.out", // Easing yang smooth
                scrollTrigger: {
                    trigger: brideRef.current,
                    start: "top 80%", // Muncul sedikit lebih awal saat scroll
                    toggleActions: "play none none reverse",
                },
            });
        }, brideRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animasi untuk list detail (domino effect)
            gsap.from(".reveal-groom > *", {
                x: 40, // Muncul dari kanan (40px)
                opacity: 0,
                skewX: -10, // Sedikit miring untuk kesan dinamis
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: groomRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });
        }, groomRef);

        return () => ctx.revert();
    }, []);

    const eventRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: eventRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            // 1. Animasi Header & Garis (Reveal dari kiri)
            tl.from(".event-title", { x: -30, opacity: 0, duration: 1 })
                .from(
                    ".event-line",
                    { scaleX: 0, transformOrigin: "left center", duration: 1 },
                    "-=0.7"
                )

                // 2. Reveal Gambar (Efek Unmasking)
                .from(
                    ".event-image",
                    {
                        clipPath: "inset(100% 0% 0% 0%)", // Reveal dari bawah ke atas
                        scale: 1.2,
                        duration: 1.5,
                        ease: "power4.out",
                    },
                    "-=0.5"
                )

                // 3. Stagger Detail Acara (Day, Akad, Resepsi)
                .from(
                    ".event-detail-item",
                    {
                        y: 30,
                        opacity: 0,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.8"
                )

                // 4. Alamat & Tombol Map
                .from(
                    ".event-footer",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.4"
                );
        }, eventRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    const banks = [
        {
            name: "BCA",
            account: "Enda Ayu Charissa",
            number: "8610879285",
        },
    ];

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const handleCopy = async (number: string, index: number) => {
        try {
            await navigator.clipboard.writeText(number.replace(/\s/g, "")); // Copy tanpa spasi
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000); // Reset icon setelah 2 detik
            console.log("CLICKED");
        } catch (err) {
            console.error("Gagal menyalin: ", err);
        }
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

        gsap.to(".wish-card:first-child", {
            scale: 1.05,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "back.out(1.7)",
        });

        try {
            const res = await fetch("/api/postUcapan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });

            if (res.ok) {
                setName("");
                setMessage("");

                fetchData();
            } else {
                alert("Gagal mengirim ucapan.");
            }
        } catch (err) {
            console.log(err);
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

        const targetDate = new Date("2026-04-19T09:00:00+07:00").getTime(); // WIB (GMT+7)

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

        const slideInterval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearInterval(slideInterval);
        };
    }, [images.length]);
    return (
        <div className="text-white overflow-hidden">
            <audio ref={audioRef} src="/sounds.mp3" preload="auto"></audio>
            <div className="hidden gradient-wrapper overflow-hidden m-w-screen absolute inset-0">
                <div className="gradient-home-cover-top-left"></div>
                <div className="gradient-home-cover-right"></div>
                <div className="gradient-home-cover-middle"></div>
                <div className="gradient-home-cover-center"></div>
            </div>
            <div className="relative w-full h-screen [--round-bg:theme(spacing.24)]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source
                        src="https://res.cloudinary.com/deniking/video/upload/v1770662632/PREWED_VIDEO_copy_zzratt.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div
                    id="count-date"
                    className="absolute top-4 pointer-events-none w-full px-16 mb-16 z-30"
                >
                    <div className="flex flex-col mb-12 pt-8 items-center text-center">
                        <h3 className="rounded-30 border border-current px-17 pb-5 pt-7 text-center text-16 uppercase leading-none lg:text-14">
                            Menuju Hari Bahagia
                        </h3>
                        <h1 className="hidden text-balance text-22 uppercase leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32 mt-8">
                            MINGGU - 22 JUNI 2025
                        </h1>
                    </div>
                    {/* COUNT DATE */}
                    <div className="flex items-center justify-between">
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-12 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Day
                            </p>
                            <p className="text-center text-4xl uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.days}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-12 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Hour
                            </p>
                            <p className="text-center text-4xl uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.hours}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-12 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Minute
                            </p>
                            <p className="text-center text-4xl uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.minutes}
                            </p>
                        </div>
                        <div className="flex-col itemc-center">
                            <p className="mb-10 text-center text-12 uppercase leading-none text-white sm:mb-20 sm:text-12 sm:leading-[2]">
                                Second
                            </p>
                            <p className="text-center text-4xl uppercase leading-[1.1] text-white sm:text-40">
                                {timeLeft.seconds}
                                <span className="italic">{`"`}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="section-title absolute w-full bottom-62 px-4 z-30">
                    <h2 className="text-12 font-light uppercase leading-[1.328]">
                        The wedding of
                    </h2>
                    <div className="flex">
                        <div className="title-name">
                            <h1 className="font-serif text-40 italic leading-none">
                                Enda & <br />
                                Mawan
                            </h1>
                        </div>
                        <div className="title-second"></div>
                    </div>
                    <div className="flex mt-4 gap-22">
                        <div className="date">
                            <h2 className="font-sans text-20 italic">
                                19.04.2026
                            </h2>
                        </div>
                        <div className="border-t-2 w-full"></div>
                    </div>
                </div>
                <div className="absolute inset-0 z-10">
                    {/* Gradient Hitam untuk pembacaan teks (Vignette) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

                    {/* Efek Grain/Noise */}
                    <div className="bg-grain absolute inset-0 w-full h-full opacity-40"></div>
                </div>
            </div>
            <div ref={introSectionRef} className="px-4">
                <div className="flex flex-col items-center pt-12">
                    <h1 className="caslon-font italic text-3xl text-center mb-6">
                        Assalamu`alaikum Warahmatullaahi Wabarakaatuh
                    </h1>
                    <p className="text-16 leading-[1.28] max-md:text-center intro-paragraph">
                        Maha Suci Allah yang telah menciptakan makhluk-Nya
                        berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah
                        mengiringi pernikahan kami:
                    </p>
                </div>
            </div>
            <div ref={containerProfileWomanRef} className="px-4 mt-22">
                <div className="flex items-start justify-between">
                    <div className="images-wrapper w-[150px] h-[200px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/ENDA_1.avif')]"></div>
                    </div>
                    <div className="images-wrapper w-[150px] h-[150px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/ENDA_3.avif')]"></div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="images-wrapper w-[280px] h-[420px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/ENDA_2.avif')]"></div>
                    </div>
                </div>
            </div>
            <div
                ref={brideRef}
                className="reveal-bio px-6 mt-12 border-l border-white/10 ml-4 relative"
            >
                <div className="gradient-home-cover-middle"></div>

                {/* Sub-judul kecil di atas nama */}
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-2">
                    The Bride
                </span>

                {/* Nama Utama */}
                <h1 className="caslon-font text-4xl leading-[0.9] text-white mb-6">
                    Enda Ayu <br />
                    <span className="italic caslon-font">Charissa</span>
                    <span className="block text-sm mt-2 font-sans not-italic opacity-60 tracking-normal">
                        S.M., M.B.A
                    </span>
                </h1>

                {/* Info Orang Tua dengan gaya list */}
                <div className="mt-8 space-y-4">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">
                            Putri Dari
                        </p>
                        <p className="text-sm font-light text-white/90 leading-relaxed">
                            Bpk. R. Bambang Hantaka S (alm) <br /> & Ibu Dewa
                            Ayu Ketut E
                        </p>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">
                            Alamat
                        </p>
                        <p className="text-sm font-light text-white/70">
                            Krapyak, RT 02/54 Wedomartani, Sleman, Yogyakarta
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <a
                        href="https://www.instagram.com/endacharissa?igsh=MWVpeXRwdjl0bjI2bA=="
                        target="_blank"
                        className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white transition-all"
                    >
                        <Instagram size={14} />
                        Instagram
                    </a>
                </div>
            </div>
            <div ref={containerProfileManRef} className="px-4 mt-22">
                <div className="flex justify-end mt-4">
                    <div className="images-wrapper w-[280px] h-[420px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/MAWAN_1.avif')]"></div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="images-wrapper w-[300px] h-[150px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/MAWAN_2.avif')]"></div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="images-wrapper w-[150px] h-[150px] flex-none">
                        <div className="image-item relative w-full h-full max-w-full before:bg-[url('/MAWAN_3.avif')]"></div>
                    </div>
                </div>
            </div>

            <div
                ref={groomRef}
                className="reveal-groom px-6 mt-12 border-r border-white/10 mr-4 text-right relative"
            >
                {/* <div className="gradient-home-cover-right"></div> */}
                <div className="gradient-home-cover-center"></div>

                {/* Sub-judul kecil */}
                <div className="">
                    <span className="groom-sub text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-2">
                        The Groom
                    </span>
                </div>

                {/* Nama Utama */}
                <h1 className="caslon-font text-4xl leading-[0.9] text-white mb-6">
                    <div className="">
                        <span className="groom-name block caslon-font">
                            Darmawan
                        </span>
                    </div>
                    <div className="">
                        <span className="groom-name italic block caslon-font">
                            Triansyah
                        </span>
                    </div>
                    <div className="">
                        <span className="groom-title block text-sm mt-2 font-sans not-italic opacity-60 tracking-normal">
                            S.M.
                        </span>
                    </div>
                </h1>

                {/* Info Orang Tua & Origin */}
                <div className="mt-8 space-y-4">
                    <div className="groom-info">
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">
                            Putra Dari
                        </p>
                        <p className="text-sm font-light text-white/90 leading-relaxed">
                            Bapak Darmanto <br /> & Ibu Sulastri
                        </p>
                    </div>

                    <div className="groom-info">
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">
                            Alamat
                        </p>
                        <p className="text-sm font-light text-white/70">
                            Jabung RT 001 Plupuh, Sragen, Jawa Tengah
                        </p>
                    </div>
                </div>

                {/* Instagram Button */}
                <div className="mt-10 overflow-hidden">
                    <a
                        href="https://www.instagram.com/darmawantriansyah?igsh=MTFrc3NpbGxzMHRtbQ=="
                        target="_blank"
                        className="groom-link inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white transition-all"
                    >
                        <Instagram size={14} />
                        Instagram
                    </a>
                </div>
            </div>

            <div ref={eventRef} id="event" className="px-4 mt-32">
                {/* Header */}
                <div className="flex mt-4 items-center gap-4">
                    <div className="date event-title">
                        <h1 className="font-serif text-40 leading-none text-white whitespace-nowrap">
                            Wedding Events
                        </h1>
                    </div>
                    <div className="event-line border-b-2 w-full border-white/30"></div>
                </div>

                <div className="my-22 bg-white text-black pb-12 overflow-hidden rounded-sm shadow-xl">
                    {/* Image Section */}
                    <div className="flex">
                        <div className="event-image images-wrapper w-full h-[220px] flex-none overflow-hidden">
                            <div className="image-item relative w-full h-full bg-cover bg-center bg-[url('/ENDA_MARWAN_1.jpg')]"></div>
                        </div>
                    </div>

                    <div className="flex justify-between border-b-1 border-neutral-200">
                        <div className="w-14 border-r-1 border-neutral-200 relative min-h-[20px]">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                                <span className="whitespace-nowrap uppercase tracking-widest text-lg font-calson text-neutral-400">
                                    Our Wedding
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-[28px] flex-1 px-4 my-12">
                            {["Day", "Akad Nikah", "Resepsi"].map(
                                (label, index) => (
                                    <div
                                        key={index}
                                        className="event-detail-item flex flex-col gap-2 flex-wrap items-center justify-between"
                                    >
                                        <div className="self-start caslon-font text-xl text-neutral-600 italic">
                                            <p>{label}</p>
                                        </div>
                                        <p className="self-end caslon-font text-3xl italic">
                                            {label === "Day"
                                                ? "Minggu 19.04.2026"
                                                : label === "Akad Nikah"
                                                ? "09.00"
                                                : "12.00 - 14.00"}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className="event-footer">
                        <p className="text-14 leading-[1.28] mt-6 text-center px-6 text-neutral-600">
                            Lokasi : Gedung Serbaguna Sinduharjo, Jl. Kaliurang
                            Km. 10,5 No. 22, Ngaglik, Dentan, Sinduharjo,
                            Sleman, Yogyakarta
                        </p>
                        <div className="mt-8 max-w-[250px] m-auto px-4 event-footer">
                            <a
                                href="https://www.google.com/maps/dir//Gedung+Serba+Guna+Sinduharjo,+Jl.+Kaliurang+Km.+10,5+No.+22,+Ngaglik,+Dentan,+Sinduharjo,+Kec.+Sleman,+Kabupaten+Sleman,+Daerah+Istimewa+Yogyakarta+55581/@-7.8730469,110.4242874,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2e7a5949bb2e9473:0x2efe02d8f2cb2cd8!2m2!1d110.4050157!2d-7.7181611?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D" // Masukkan link aslinya di sini
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex h-14 items-center justify-between overflow-hidden rounded-full bg-black px-2 py-2 transition-all duration-500 hover:bg-neutral-800"
                            >
                                {/* Lingkaran Ikon yang Beranimasi */}
                                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-[360deg]">
                                    {/* Ikon 1 (Default) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="absolute h-5 w-5 transition-all duration-500 group-hover:translate-y-[-150%]"
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

                                    {/* Ikon 2 (Muncul saat Hover dari Bawah) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="absolute h-5 w-5 translate-y-[150%] transition-all duration-500 group-hover:translate-y-0"
                                    >
                                        <path d="M15.817.113a.303.303 0 0 0-.301-.064L.444 5.523a.303.303 0 0 0-.01.559l7.101 3.254 3.254 7.101a.303.303 0 0 0 .559-.01L15.881.485a.303.303 0 0 0-.064-.372z" />
                                    </svg>
                                </div>

                                {/* Teks Tombol */}
                                <span className="flex-1 pr-4 text-center text-11 font-bold uppercase tracking-widest text-white">
                                    Lihat Map Lokasi
                                </span>

                                {/* Efek Cahaya (Glow) saat Hover */}
                                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/10 to-transparent transition-transform duration-500 group-hover:translate-y-0"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <section id="gallery" className="bg-black text-white">
                {/* Wrapper Pin */}
                <div
                    ref={triggerRef}
                    className="h-screen flex flex-col overflow-hidden"
                >
                    {/* Title: Di atas pada mobile, menyesuaikan pada desktop */}
                    <div className="pt-12 pb-6 px-6 md:px-20">
                        <h2 className="font-serif text-4xl md:text-6xl italic leading-tight">
                            Our Moments
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="h-[1px] w-12 bg-white/50"></div>
                            <p className="uppercase tracking-[0.2em] text-[10px] text-white/40">
                                Swipe or scroll to explore
                            </p>
                        </div>
                    </div>

                    {/* Horizontal Container */}
                    <div
                        ref={sectionRef}
                        className="flex flex-1 items-center gap-6 px-6 md:px-20 h-full w-fit"
                    >
                        {galleryImages.map((img, index) => (
                            <div
                                key={index}
                                className="relative flex-none w-[75vw] md:w-[400px] h-[50vh] md:h-[550px] overflow-hidden rounded-sm group"
                            >
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${img.src})`,
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <div className="overflow-hidden">
                                        <span className="block text-white caslon-font text-xl italic translate-y-0 transition-transform duration-500 hidden">
                                            {img.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Spacer Akhir agar gambar terakhir tidak mepet */}
                        <div className="flex-none w-[5vw]" />
                    </div>
                </div>
            </section>

            <section ref={giftRef} id="wedding-gift" className="relative">
                <div className="gradient-home-cover-middle"></div>
                {/* Header Section */}
                <div className="gift-header flex flex-col items-center pt-40 px-6">
                    <h1 className="font-serif italic text-40 leading-none text-center mb-6">
                        Wedding Gift
                    </h1>
                    <p className="text-16 leading-[1.28] text-center max-w-md opacity-80">
                        Doa Restu Anda merupakan karunia yang sangat berarti
                        bagi kami. Namun jika memberi adalah ungkapan tanda
                        kasih Anda, Anda dapat memberi hadiah.
                    </p>

                    {/* Button Container */}
                    <div className="mt-10 w-full max-w-[280px]">
                        <button className="group/button relative w-full h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center px-2 transition-all hover:bg-white/10">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black overflow-hidden relative">
                                {/* Icon Slide Effect sama seperti tombol Map */}
                                <div className="group-hover/button:-translate-y-10 transition-transform duration-500">
                                    <Gift size={20} />
                                </div>
                                <div className="absolute translate-y-10 group-hover/button:translate-y-0 transition-transform duration-500">
                                    <Heart size={20} className="text-red-500" />
                                </div>
                            </div>
                            <span className="flex-1 text-center text-11 uppercase tracking-[0.2em] font-bold">
                                Kirim Wedding Gift
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bank Cards Section */}
                <div className="bank-card-container space-y-8 px-4 py-16 flex flex-col items-center perspective-1000">
                    {banks.map((bank, index) => (
                        <div
                            className="bank-card w-full max-w-[350px] min-h-[210px] rounded-3xl p-7 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden group border border-white/5"
                            key={index}
                        >
                            {/* Efek Kilatan (Reflective Light) */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-3">
                                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">
                                        Debit Card
                                    </p>
                                    <div className="w-11 h-8 bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 rounded-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"></div>
                                </div>
                                <h1 className="italic font-bold text-2xl tracking-tight opacity-90">
                                    {bank.name}
                                </h1>
                            </div>

                            {/* Nomor Kartu */}
                            <div className="mt-10 flex items-center gap-4 relative z-10">
                                <p className="text-xl md:text-2xl tracking-[0.18em] font-mono font-medium drop-shadow-lg">
                                    {bank.number}
                                </p>
                                <button
                                    onClick={() =>
                                        handleCopy(bank.number, index)
                                    }
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 transition-all border border-white/10"
                                >
                                    {copiedIndex === index ? (
                                        <Check
                                            size={16}
                                            className="text-green-400"
                                        />
                                    ) : (
                                        <Copy
                                            size={16}
                                            className="text-white/50"
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Card Holder & Logo */}
                            <div className="mt-8 flex justify-between items-end relative z-10">
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">
                                        Card Holder
                                    </p>
                                    <p className="text-sm tracking-[0.1em] font-medium uppercase italic">
                                        {bank.account}
                                    </p>
                                </div>

                                <div className="flex -space-x-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-orange-500/80 blur-[1px]"></div>
                                    <div className="w-10 h-10 rounded-full bg-red-600/80 blur-[1px]"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section
                ref={wishSectionRef}
                className="relative min-h-screen w-full px-6 mt-22 pb-12 flex flex-col items-center pointer-events-auto mb-8"
                id="ucapan"
            >
                {/* Judul Section */}
                <div className="wish-header text-center mb-8">
                    <h1 className="font-serif text-4xl leading-tight text-white drop-shadow-md">
                        Ucapan & Doa
                    </h1>
                    <p className="text-white/60 text-16 mt-2 font-light italic">
                        Berikan doa restu untuk kedua mempelai
                    </p>
                </div>

                {/* Container Form */}
                <div className="wish-form w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/70 ml-1">
                                Nama Anda
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Jhon Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1.5 w-full block bg-white/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/70 ml-1">
                                Pesan & Doa
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="mt-1.5 w-full block bg-white/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm resize-none"
                                placeholder="Tuliskan harapan terbaikmu..."
                            ></textarea>
                        </div>

                        {status && (
                            <p className="text-center text-xs text-white/80 italic animate-pulse">
                                {status}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group/button relative flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-white px-2 py-2 transition-all duration-500 hover:bg-neutral-200 disabled:opacity-50"
                        >
                            {/* Lingkaran Ikon (Sama dengan button Map) */}
                            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black text-white transition-transform duration-500 group-hover/button:rotate-[360deg]">
                                {loading ? (
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    <>
                                        {/* Ikon 1: Pesawat Kertas (Default) */}
                                        <Send
                                            size={18}
                                            className="absolute transition-all duration-500 group-hover/button:translate-y-[-150%] group-hover/button:translate-x-[150%]"
                                        />
                                        {/* Ikon 2: Hati (Muncul saat Hover) */}
                                        <Heart
                                            size={18}
                                            className="absolute translate-y-[150%] transition-all duration-500 group-hover/button:translate-y-0 text-red-500 fill-red-500"
                                        />
                                    </>
                                )}
                            </div>

                            {/* Teks Tombol (Centered) */}
                            <span className="flex-1 pr-4 text-center text-11 font-bold uppercase tracking-[0.2em] text-black">
                                {loading ? "Mengirim..." : "Kirim Ucapan"}
                            </span>

                            {/* Efek Overlay Halus */}
                            <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-black/5 to-transparent transition-transform duration-500 group-hover/button:translate-y-0"></div>
                        </button>
                    </form>
                </div>

                {/* Container List Ucapan (Timeline Style) */}
                <div className="wish-list-container mt-10 w-full max-w-md">
                    <h3 className="text-white/80 text-sm font-medium mb-4 px-2">
                        {data.length} Pesan Tersimpan
                    </h3>
                    <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {[...data].reverse().map((item, idx) => (
                            <div
                                key={idx}
                                className="wish-card bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl transition-all hover:bg-white/10"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-400 to-gray-200 flex items-center justify-center text-gray-800 font-bold text-xs">
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-white tracking-wide">
                                        {item.name}
                                    </span>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed italic font-light">
                                    {`"${item.message}"`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARALAX */}
            <div
                ref={containerRef}
                className="relative h-[90vh] w-full overflow-hidden"
            >
                <div
                    ref={bgSlideRef}
                    className="absolute inset-0 w-full h-[120%] -top-[10%]"
                >
                    {images.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.4,0.4,0,1)] ${
                                index === currentSlide
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <div
                                className={`w-full h-full bg-cover bg-center transition-transform duration-[5000ms] ease-[cubic-bezier(0.4,0.4,0,1)] ${
                                    index === currentSlide
                                        ? "scale-108"
                                        : "scale-100"
                                }`}
                                style={{ backgroundImage: `url(${src})` }}
                            />
                        </div>
                    ))}
                    <div className="relative z-10 flex flex-col h-full items-center justify-center">
                        <p className="text-16 text-center leading-[1.28] max-md:text-center px-16">
                            Terima kasih atas doa, cinta, dan dukungan yang
                            telah anda berikan. Kehadiran dan restu dari anda
                            adalah kebahagiaan bagi kami.
                        </p>
                        <h2 className="text-balance text-22 leading-[1.2] sm:text-20 lg:text-fluid-lg-design-null-32  text-center mt-8">
                            Salam
                        </h2>
                        <h1 className="caslon-font text-40 italic leading-none text-center mb-24">
                            Enda & Mawan
                        </h1>
                    </div>
                </div>
            </div>

            <FloatingNav />
            <Footer />
        </div>
    );
}
