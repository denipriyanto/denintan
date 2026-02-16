import { prisma } from "../lib/prisma";
import { addGuest } from "./actions";
import GuestList from "../components/GuestList";

export default async function GuestPage() {
    const guests = await prisma.guest.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 text-slate-200">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Guest <span className="text-amber-400">Manager</span>
                    </h1>
                    <p className="text-slate-400 mt-2 font-light">
                        Enda & Mawan Wedding Invitation
                    </p>
                </div>

                {/* Form Input */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl mb-8">
                    <form action={addGuest} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                                    Nama Tamu
                                </label>
                                <input
                                    name="name"
                                    placeholder="Contoh: Bpk. Junaedi"
                                    required
                                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none text-white placeholder:text-slate-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                                    Nomor WhatsApp
                                </label>
                                <input
                                    name="phone"
                                    placeholder="0812xxx atau 62812xxx"
                                    required
                                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-amber-500 focus:outline-none text-white placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                        >
                            Simpan & Generate Link
                        </button>
                    </form>
                </div>

                {/* GuestList menangani fitur Search dan List Tamu */}
                <GuestList initialGuests={guests} />
            </div>
        </main>
    );
}
