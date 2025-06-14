"use client";
import { useAudio } from "../context/audioContext";

export default function Header() {
    const { isPlaying, togglePlay } = useAudio();

    return (
        <header className="fixed inset-x-0 top-0 z-header flex items-center px-10 py-35 sm:px-34 lg:px-60 lg:py-29">
            <div
                className="absolute inset-x-0 top-0 h-120 [background:linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.3)_49.13%,rgba(0,0,0,0)_98.25%)] sm:h-150"
                style={{
                    opacity: "1",
                    willChange: "auto",
                }}
            ></div>
            <div className="flex-1">
                <div className="flex"></div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-8 sm:gap-x-14 lg:gap-x-18">
                <button
                    type="button"
                    aria-label="Enable background audio"
                    aria-pressed="false"
                    className="group/button pointer-events-auto leading-none disabled:cursor-not-allowed forced-colors:border forced-colors:border-black forced-colors:disabled:text-[GrayText] outline outline-0 outline-offset-2 outline-[var(--outline-color)] forced-colors:outline-[Highlight] [--outline-color:theme(colors.outline)] focus-visible:outline-2 inline-block aspect-square h-44 overflow-hidden rounded-12 [position:var(--position,relative)] bg-white/10 text-white backdrop-blur-[8px]"
                    data-rac=""
                    onClick={togglePlay}
                >
                    <span
                        className={`absolute inset-0 inline-flex items-center justify-center gap-x-4 opacity-50 transition-all duration-300 ease-easeOutQuint group-hover/button:opacity-100 group-selected/button:opacity-100 ${
                            isPlaying ? "sound-wave" : ""
                        }`}
                    >
                        <span
                            className="inline-block w-1 rounded-full bg-current"
                            style={{ height: "0.5rem" }}
                        ></span>
                        <span
                            className="inline-block w-1 rounded-full bg-current"
                            style={{ height: "0.5rem" }}
                        ></span>
                        <span
                            className="inline-block w-1 rounded-full bg-current"
                            style={{ height: "0.5rem" }}
                        ></span>
                        <span
                            className="inline-block w-1 rounded-full bg-current"
                            style={{ height: "0.5rem" }}
                        ></span>
                        <span
                            className="inline-block w-1 rounded-full bg-current"
                            style={{ height: "0.5rem" }}
                        ></span>
                    </span>
                </button>
            </div>
        </header>
    );
}
