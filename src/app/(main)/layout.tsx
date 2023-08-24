import SearchPanel from "@/components/search-panel/Search-panel";
import styles from "./layout.module.sass";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const links = [
        {
            title: "likes",
            img: "/images/likes-default.svg",
            hoverImg: "/images/likes-default.svg",
            activeImg: "/images/likes-active.svg",
        },
        {
            title: "favourites",
            img: "/images/favs-default.svg",
            hoverImg: "/images/favs-default.svg",
            activeImg: "/images/favs-active.svg",
        },
        {
            title: "dislikes",
            img: "/images/dislike-default.svg",
            hoverImg: "/images/dislike-default.svg",
            activeImg: "/images/dislike-active.svg",
        },
    ];

    return (
        <section>
            <SearchPanel links={links} pageHref="search" />
            <div className={styles.contentWrapper}>{children}</div>
        </section>
    );
}
