"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContextApp = createContext<{
    isPlaying: boolean;
    togglePlay: () => void;
}>({ isPlaying: false, togglePlay: () => {} });

export const useAudio = () => useContext(AudioContextApp);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const loopStart = 0;
    const loopEnd = 36;

    useEffect(() => {
        const shouldAutoPlay =
            localStorage.getItem("opened_invitation") === "true";
        if (shouldAutoPlay) {
            initAudio();
        }
    }, []);

    const initAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio("/Andmesh_anugerah_terindah.mp3");
            audioRef.current = audio;

            audio.addEventListener("timeupdate", () => {
                if (audio.currentTime > loopEnd) {
                    audio.currentTime = loopStart;
                }
            });

            audio.currentTime = loopStart;
            audio.loop = true;
            audio
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                    // catch autoplay block
                });
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) {
            initAudio();
        } else {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <AudioContextApp.Provider value={{ isPlaying, togglePlay }}>
            {children}
        </AudioContextApp.Provider>
    );
};
