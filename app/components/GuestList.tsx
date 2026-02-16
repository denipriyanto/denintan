"use client";

import { useState } from "react";

interface Guest {
    id: number;
    name: string;
    phone: string;
}

export default function GuestList({
    initialGuests,
}: {
    initialGuests: Guest[];
}) {
    const [search, setSearch] = useState("");

    // Fungsi sensor nomor
    const maskPhone = (phone: string) => {
        return phone.length > 3 ? phone.slice(0, -3) + "***" : phone;
    };

    // Filter pencarian instan
    const filteredGuests = initialGuests.filter((guest) =>
        guest.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* Fitur Pencarian */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari nama tamu..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 pl-10 rounded-xl bg-slate-900 border border-slate-800 focus:border-slate-600 focus:outline-none text-slate-200"
                    />
                    <div className="absolute left-3 top-3.5 text-slate-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Daftar Tamu */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        {search
                            ? `Hasil pencarian: "${search}"`
                            : "Daftar Tamu"}
                    </h2>
                    <span className="text-xs bg-slate-800 text-amber-400 px-3 py-1 rounded-full border border-slate-700">
                        {filteredGuests.length} Orang
                    </span>
                </div>

                {filteredGuests.map((guest) => {
                    const urlEncodedName = encodeURIComponent(
                        guest.name
                    ).replace(/%20/g, "+");
                    const invitationLink = `https://endamawan-mantenan.vercel.app/?to=${urlEncodedName}`;

                    const message = `*Assalamu'alaikum Warahmatullahi Wabarakatuh*\n\nTanpa mengurangi rasa hormat, di hari yang penuh berkah ini, kami ingin membagikan kabar bahagia serta memohon doa restu dari Bapak/Ibu/Saudara/i *${guest.name}*.\n\nKami mengundang Bapak/Ibu/Saudara/i untuk hadir di momen sakral pernikahan kami melalui tautan undangan digital berikut:\n\n✨ *Buka Undangan:*\n${invitationLink}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu secara langsung.\n\nTerima kasih atas perhatian dan doa tulusnya.\n\n*Salam hangat,*\n*Enda & Mawan*`;

                    const waLink = `https://api.whatsapp.com/send?phone=${
                        guest.phone
                    }&text=${encodeURIComponent(message)}`;

                    return (
                        <div
                            key={guest.id}
                            className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group shadow-sm"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-slate-100 text-lg group-hover:text-amber-400 transition-colors">
                                        {guest.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-mono">
                                        {maskPhone(guest.phone)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <a
                                        href={invitationLink}
                                        target="_blank"
                                        className="text-xs font-medium text-slate-500 hover:text-white transition-colors"
                                    >
                                        Preview Link
                                    </a>

                                    <a
                                        href={waLink}
                                        target="_blank"
                                        className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-lg"
                                    >
                                        Kirim WA
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredGuests.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl mt-6">
                    <p className="text-slate-600">Tamu tidak ditemukan...</p>
                </div>
            )}
        </>
    );
}
