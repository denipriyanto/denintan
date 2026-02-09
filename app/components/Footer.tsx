import React from "react";
import { Instagram, MessageCircle, Heart } from "lucide-react"; // Pastikan sudah instal lucide-react

export default function Footer() {
    const brandName = "Mantenan app";
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black text-white/80 py-12 px-6 border-t border-white/10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
                {/* Logo & Slogan */}
                <div className="space-y-2">
                    <h2 className="text-2xl caslon-font tracking-[0.2em] text-white uppercase">
                        {brandName}
                    </h2>
                    <p className="text-xs font-light tracking-widest text-white/50 uppercase">
                        Premium Digital Invitation
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-8">
                    <a
                        href="https://wa.me/6281914471444" // Ganti dengan nomor Anda
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 transition-all hover:text-white"
                    >
                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <MessageCircle size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] uppercase tracking-tighter">
                            WhatsApp
                        </span>
                    </a>

                    <a
                        href="https://instagram.com/mantenan" // Ganti dengan link IG brand Anda
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 transition-all hover:text-white"
                    >
                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Instagram size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] uppercase tracking-tighter">
                            Instagram
                        </span>
                    </a>
                </div>

                {/* Decorative Divider */}
                <div className="w-12 h-[1px] bg-white/20"></div>

                {/* Copyright */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-[11px] font-light tracking-widest">
                        MADE WITH{" "}
                        <Heart
                            size={10}
                            className="inline-block mx-1 text-red-400 fill-red-400"
                        />{" "}
                        BY {brandName.toUpperCase()}
                    </p>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">
                        © {currentYear} ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>

            {/* Background Subtle Texture (Optional) */}
            <div className="bg-grain absolute inset-0 pointer-events-none opacity-20"></div>
        </footer>
    );
}
