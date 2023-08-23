import { useState, FC } from "react";
import styles from "./search-panel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";

export interface BtnLink {
    title: string;
    img: string;
    hoverImg: string;
    activeImg: string;
}

interface SearchPanelProps {
    links: BtnLink[];
}

const SearchPanel: FC<SearchPanelProps> = ({links}) => {
    return (
        <div className={styles.panel}>
            <div className={styles.panel__inputWrapper}>
                <input className={styles.panel__input} type='text' placeholder='Search for breeds by name' />
            </div>
            <div>
                <NavBtns links={links}  />
            </div>
        </div>
    );
};

export default SearchPanel;
