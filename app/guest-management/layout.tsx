export default function GuestManagementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="min-h-screen bg-slate-950">{children}</section>;
}
