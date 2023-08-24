import { useState, FC } from "react";
import styles from "./search-panel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";
import Link from "next/link";

export interface BtnLink {
    title: string;
    img: string;
    hoverImg: string;
    activeImg: string;
}

interface SearchPanelProps {
    links: BtnLink[];
    pageHref: string
}

const SearchPanel: FC<SearchPanelProps> = ({ links, pageHref }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.panel__inputWrapper}>
                <input className={styles.panel__input} type='text' placeholder='Search for breeds by name' />
                <Link href={pageHref}>
                    <button className={styles.panel__filter}></button>
                </Link>
            </div>
            <div>
                <NavBtns links={links} />
            </div>
        </div>
    );
};

export default SearchPanel;
