import { useState, FC } from "react";
import styles from "./search-panel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";

const SearchPanel: FC<any> = () => {
    return (
        <div className={styles.panel}>
            <div className={styles.panel__inputWrapper}>
                <input className={styles.panel__input} type='text' placeholder='Search for breeds by name' />
            </div>
            <div>
                <NavBtns  />
            </div>
        </div>
    );
};

export default SearchPanel;
