import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const to = resolvedSearchParams?.to;
    const guestName = typeof to === "string" ? `untuk ${to}` : "";

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

export default function Home() {
    return (
        <div className="">
            <HomeClient />
        </div>
    );
}
