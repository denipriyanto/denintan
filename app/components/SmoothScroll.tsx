"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        // Sinkronisasi ScrollTrigger dengan Lenis
        function update() {
            ScrollTrigger.update();
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1, // Sensitivitas scroll (0.1 = sangat smooth)
                duration: 1.5, // Durasi scroll
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
