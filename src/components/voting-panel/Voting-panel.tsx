"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./voting-panel.module.sass";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface VotingPanelProps {
    // text: string
}

const VotingPanel: FC<VotingPanelProps> = () => {


    return (
        <div className={styles.panel}>
            <div className={styles.panel__imgWrapper}>
                <Image src='/images/cat.png' width={640} height={360} className={styles.panel__img} alt='cat' />
                <div className={styles.panel__tools}>
                    <button className={`${styles.panel__btn} ${styles.panel__btnStart}`}></button>
                    <button className={`${styles.panel__btn} ${styles.panel__btnMiddle}`}></button>
                    <button className={`${styles.panel__btn} ${styles.panel__btnEnd}`}></button>
                </div>
            </div>
            <ul className={styles.panel__list}>
                <li className={styles.listItem}>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeItem}>10:55</div>
                        <div className={styles.textItem}>Image ID: <span>fQSunHvl8</span> was added to Favourites</div>
                    </div>
                    <div className={styles.iconItem}>
                    <Image src='/images/favs-default.svg' height={20} width={20} alt='icon' />
                    </div>
                </li>
                <li className={styles.listItem}>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeItem}>10:55</div>
                        <div className={styles.textItem}>Image ID: <span>fQSunHvl8</span> was added to Favourites</div>
                    </div>
                    <div className={styles.iconItem}>
                    <Image src='/images/favs-default.svg' height={20} width={20} alt='icon' />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default VotingPanel;
