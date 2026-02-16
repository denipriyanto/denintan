"use server"; // Wajib ada di baris pertama

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

function formatPhoneNumber(phone: string) {
    // 1. Hapus semua karakter non-angka (spasi, strip, plus, dll)
    let cleaned = phone.replace(/\D/g, "");

    // 2. Jika diawali '0', ganti dengan '62'
    if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.substring(1);
    }

    // 3. Jika diawali '8' (langsung nomor tanpa kode), tambahkan '62'
    if (cleaned.startsWith("8")) {
        cleaned = "62" + cleaned;
    }

    return cleaned;
}

export async function addGuest(formData: FormData) {
    const name = formData.get("name") as string;
    const rawPhone = formData.get("phone") as string;

    if (!name || !rawPhone) return;

    const formattedPhone = formatPhoneNumber(rawPhone);

    try {
        await prisma.guest.create({
            data: {
                name: name,
                phone: formattedPhone,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Gagal menambah tamu:", error);
    }
}
