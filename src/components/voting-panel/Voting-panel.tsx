"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./voting-panel.module.sass";
import Message from "../message/Message";

interface VotingPanelProps {
    image: string
}

const VotingPanel: FC<VotingPanelProps> = ({image}) => {
    return (
        <div className={styles.panel}>
            <div className={styles.panel__imgWrapper}>
                <Image src={image} width={640} height={360} className={styles.panel__img} alt='cat' />
                <div className={styles.panel__tools}>
                    <button className={`${styles.panel__btn} ${styles.panel__btnStart}`}></button>
                    <button className={`${styles.panel__btn} ${styles.panel__btnMiddle}`}></button>
                    <button className={`${styles.panel__btn} ${styles.panel__btnEnd}`}></button>
                </div>
            </div>
            <ul className={styles.panel__list}>
                <li>
                   <Message like time="10:22" id='fQSunHvl8' />
                </li>
                <li>
                   <Message dislike time="10:22" id='fQSunHvl8' />
                </li>
                <li>
                   <Message favourite time="10:22" id='fQSunHvl8' />
                </li>
            </ul>
        </div>
    );
};

export default VotingPanel;
