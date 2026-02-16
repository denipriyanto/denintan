import Header from "../components/Header";
// import { AudioProvider } from "../context/audioContext";
import SmoothScroll from "../components/SmoothScroll";

export default function TamuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div id="wrap-page" className="relative w-full">
            {/* <AudioProvider> */}
            <SmoothScroll>
                <Header />
                <main id="main-content" className="relative z-[1]">
                    {children}
                </main>
            </SmoothScroll>
            {/* </AudioProvider> */}
        </div>
    );
}
