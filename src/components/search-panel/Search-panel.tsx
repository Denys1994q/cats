"use client";

import { useState, FC } from "react";
import styles from "./search-panel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface BtnLink {
    title: string;
    img: string;
    hoverImg: string;
    activeImg: string;
}

interface SearchPanelProps {
    links: BtnLink[];
    pageHref: string;
}

const SearchPanel: FC<SearchPanelProps> = ({ links, pageHref }) => {
    const [inpValue, setInpValue] = useState('')
    const router = useRouter();
    const search = () => {
        router.push(`/search?name=${inpValue}`);
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panel__inputWrapper}>
                <input className={styles.panel__input} type='text' placeholder='Search for breeds by name' onChange={(e) => setInpValue(e.target.value)} />
                <button className={styles.panel__filter} onClick={search}></button>
            </div>
            <div>
                <NavBtns links={links} />
            </div>
        </div>
    );
};

export default SearchPanel;
