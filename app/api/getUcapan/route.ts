export async function GET() {
    const res = await fetch(
        "https://docs.google.com/spreadsheets/d/1jwJmJUFYmvoZdd2ap7jOn2iIJz79NP9nN9ICHQIj4gs/gviz/tq?tqx=out:json"
    );
    const text = await res.text();

    const json = JSON.parse(text.substr(47).slice(0, -2)); // remove weird prefix/suffix
    const rows = json.table.rows.map((row: any) => ({
        timestamp: row.c[0]?.v || "",
        name: row.c[1]?.v || "",
        message: row.c[2]?.v || "",
    }));

    return Response.json(rows);
}
