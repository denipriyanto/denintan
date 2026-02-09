import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { AudioProvider } from "./context/audioContext";
import SmoothScroll from "./components/SmoothScroll";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
    // Ambil nama dari searchParams (misal: ?to=Budi) atau dari database/variable
    // const to = typeof searchParams.to === "string" ? searchParams.to : "";
    const to = (await searchParams)?.to || "";
    const guestName = to ? `untuk ${to}` : "";

    const brandName = "Mantenan App";
    const weddingNames = "Enda & Mawan";
    const weddingDate = "19 April 2026";
    const baseUrl = "https://mantenan.vercel.app";

    return {
        title: `${weddingNames} Wedding ${guestName} - ${brandName}`,
        description: `Undangan Pernikahan Digital ${weddingNames} pada ${weddingDate}. Dibuat oleh ${brandName}.`,

        // SEO & OpenGraph (Penting untuk tampilan Share WhatsApp/FB)
        openGraph: {
            title: `Undangan Pernikahan ${weddingNames}`,
            description: `Spesial ${guestName}, Kami mengundang Anda untuk hadir di hari bahagia kami.`,
            url: baseUrl,
            siteName: brandName,
            type: "article", // Gunakan article agar lebih spesifik untuk event
            images: [
                {
                    url: `${baseUrl}/endamawan-ultimate.avif`,
                    width: 1200,
                    height: 630,
                    alt: `Poster Wedding ${weddingNames}`,
                },
            ],
        },

        // Twitter (X) Card
        twitter: {
            card: "summary_large_image",
            title: `${weddingNames} Wedding Invitation`,
            description: `Wedding Invitations ${weddingNames} - ${weddingDate}`,
            images: [`${baseUrl}/endamawan-ultimate.avif`],
        },

        // Tambahan SEO khusus Google
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
    };
}

// export const metadata: Metadata = {
//     title: "The Wedding of Enda dan Mawan - Dellfoks Invitations",
//     description: "Wedding Invitations Enda - Mawan, 19 April 2026",
//     openGraph: {
//         title: "Undangan Pernikahan Enda & Mawan",
//         description: "Wedding Invitations Enda - Mawan 19 April 2026",
//         url: "https://denintan.vercel.app",
//         type: "website",
//         images: [
//             {
//                 url: "https://denintan.vercel.app/endamawan-ultimate.avif", // HARUS FULL URL dan TERPUBLISH
//                 width: 1200,
//                 height: 630,
//                 alt: "Undangan Pernikahan Enda & Mawan",
//             },
//         ],
//     },
//     twitter: {
//         card: "summary_large_image",
//         title: "Undangan Pernikahan Deni & Intan",
//         description: "Wedding Invitations Deni - Intan 22 Juni 2025",
//         images: ["https://denintan.vercel.app/endamawan-ultimate.avif"],
//     },
// };

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
                </div>
            </body>
        </html>
    );
}
