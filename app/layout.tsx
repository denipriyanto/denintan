import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { AudioProvider } from "./context/audioContext";

export const metadata: Metadata = {
    title: "The Wedding of Intan dan Deni - Dellfoks Invitations",
    description: "Wedding Invitations Deni - Intan, 22 Juni 2025",
    openGraph: {
        title: "Undangan Pernikahan Deni & Intan",
        description: "Wedding Invitations Deni - Intan 22 Juni 2025",
        url: "https://denintan.vercel.app",
        type: "website",
        images: [
            {
                url: "https://denintan.vercel.app/denintan-ultimate.jpg", // HARUS FULL URL dan TERPUBLISH
                width: 1200,
                height: 630,
                alt: "Undangan Pernikahan Deni & Intan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Undangan Pernikahan Deni & Intan",
        description: "Wedding Invitations Deni - Intan 22 Juni 2025",
        images: ["https://denintan.vercel.app/denintan-ultimate.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`font-sans selection:bg-gray-300 selection:text-black antialiased`}
            >
                <div
                    id="wrap-page"
                    className="h-[calc(var(--vh) * 100)] pointer-events-auto fixed left-0 top-0 z-10 w-full touch-auto overflow-hidden scroll-auto"
                >
                    <div className="relative top-0 left-0 w-full h-[calc(var(--vh) * 100)] overflow-auto visible">
                        <div className="relative top-0 left-0 w-full h-auto min-h-full">
                            <div
                                className="relative z-[1] select-none pointer-events-none"
                                id="main-content"
                            >
                                <AudioProvider>
                                    <Header />
                                    {children}
                                </AudioProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
