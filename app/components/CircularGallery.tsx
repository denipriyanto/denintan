"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./CircularGallery.css";

gsap.registerPlugin(MotionPathPlugin);

const images = [
    "/denintan1.jpg",
    "/denintan2.jpg",
    "/denintan3.jpg",
    "/denintan4.jpg",
    "/denintan5.jpg",
    "/denintan1.jpg",
    "/denintan2.jpg",
    "/denintan3.jpg",
    "/denintan4.jpg",
    "/denintan5.jpg",
    "/denintan5.jpg",
];

const CircularGallery = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const total = images.length;
    const radius = 150;

    useEffect(() => {
        const radius = 250;
        const total = images.length;
        const angleStep = Math.PI / (total - 1);

        // GSAP animation loop
        let rotation = 0;

        const animate = () => {
            rotation += 0.01;

            itemRefs.current.forEach((item, index) => {
                const angle = angleStep * index + rotation - Math.PI / 2;
                const x = Math.cos(angle - Math.PI) * radius;
                const y = Math.sin(angle - Math.PI) * radius;

                const scale = 0.6 + 0.4 * Math.cos(angle); // bigger in center
                const opacity = 0.3 + 0.7 * Math.cos(angle); // fade on sides

                gsap.set(item, {
                    x,
                    y,
                    scale,
                    opacity,
                    zIndex: Math.floor(scale * 100),
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className="">
            <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden">
                <div className="relative" ref={containerRef}>
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="absolute"
                            ref={(el) => {
                                itemRefs.current[i] = el;
                            }}
                        >
                            <div className="w-28 h-40 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <img
                                    src={src}
                                    alt={`lip-${i}`}
                                    className="w-10 h-24 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative w-full h-[400px] mt-10">
                {images.map((src, index) => {
                    const angle = (index / (total - 1)) * Math.PI; // 0 to PI
                    const x = Math.cos(angle - Math.PI) * radius;
                    const y = Math.sin(angle - Math.PI) * 60;
                    // const rotate = (angle * 180) / Math.PI - 90;
                    const rotateZ = ((angle - Math.PI / 2) * 180) / Math.PI;

                    return (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                // left: `calc(50% + ${x}px)`,
                                // top: `${y + 1}px`, // shift down from top
                                // transform: `translate(-50%, -50%) rotate(0deg)`,
                                left: `calc(50% + ${x}px)`,
                                top: `${y + 180}px`, // vertical center shift
                                transform: `translate(-50%, -50%) rotateZ(${rotateZ}deg)`,
                            }}
                        >
                            <div className="w-28 h-40 rounded-xl flex items-center justify-center">
                                <img
                                    src={src}
                                    alt={`lip-${index}`}
                                    className="w-10 h-24 object-contain"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CircularGallery;
