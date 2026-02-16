import "./globals.css";
import Header from "./components/Header";
import { AudioProvider } from "./context/audioContext";
import SmoothScroll from "./components/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-sans selection:bg-gray-300 selection:text-black antialiased">
                <div id="wrap-page" className="relative w-full">
                    <AudioProvider>
                        <SmoothScroll>
                            <Header />
                            <main id="main-content" className="relative z-[1]">
                                {children}
                            </main>
                        </SmoothScroll>
                    </AudioProvider>
                    <SpeedInsights />
                </div>
            </body>
        </html>
    );
}
