export async function POST(request: Request) {
    try {
        const { name, message } = await request.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwpHyxna30PcedQoNkKd7TegW_Lyt4Le7g-xMHS44iSr-c3iLiiQzCPpO-C0tuQu-dX/exec",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            }
        );

        const result = await response.json();

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Gagal mengirim data", err }),
            {
                status: 500,
            }
        );
    }
}
