type SheetRow = {
    c: Array<{
        v: string | null;
    } | null>;
};

export async function GET() {
    const res = await fetch(
        "https://docs.google.com/spreadsheets/d/1jwJmJUFYmvoZdd2ap7jOn2iIJz79NP9nN9ICHQIj4gs/gviz/tq?tqx=out:json",
        { cache: "no-store" }
    );
    const text = await res.text();

    const json = JSON.parse(text.substr(47).slice(0, -2)); // remove weird prefix/suffix
    const rows = (json.table.rows as SheetRow[]).map((row) => ({
        timestamp: row.c[0]?.v || "",
        name: row.c[1]?.v || "",
        message: row.c[2]?.v || "",
        attendance: row.c[3]?.v || "",
    }));

    return Response.json(rows);
}
