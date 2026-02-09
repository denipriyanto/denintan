"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DisplayName() {
    const searchParams = useSearchParams();
    const [displayName, setDisplayName] = useState("Tamu");

    useEffect(() => {
        const nameParam = searchParams.get("to");
        if (nameParam && nameParam.trim() !== "") {
            setDisplayName(decodeURIComponent(nameParam));
        } else {
            setDisplayName("Tamu");
        }
    }, [searchParams]);

    return <span>{displayName}</span>;
}
