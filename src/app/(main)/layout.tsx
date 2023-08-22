import SearchPanel from "@/components/search-panel/Search-panel";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <SearchPanel />
            {children}
        </section>
    );
}
