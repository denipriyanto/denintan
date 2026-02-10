export async function POST(request: Request) {
    try {
        const { name, message, attendance } = await request.json();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwpHyxna30PcedQoNkKd7TegW_Lyt4Le7g-xMHS44iSr-c3iLiiQzCPpO-C0tuQu-dX/exec",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message, attendance }),
                redirect: "follow",
            }
        );

        // const result = await response.json();

        // return new Response(JSON.stringify(result), {
        //     status: 200,
        //     headers: { "Content-Type": "application/json" },
        // });
        if (response.ok || response.status === 302) {
            return new Response(JSON.stringify({ result: "success" }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            // Jika memang gagal total (misal link salah)
            return new Response(
                JSON.stringify({ error: "Gagal mengirim Data" }),
                {
                    status: 500,
                }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Gagal mengirim data", err }),
            {
                status: 500,
            }
        );
    }
}
