export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <h2>Main</h2>
            {children}
        </section>
    );
}
