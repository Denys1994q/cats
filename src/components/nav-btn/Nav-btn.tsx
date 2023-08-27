"use client";

import { FC } from "react";
import styles from "./nav-btn.module.sass";
import { useRouter } from "next/navigation";

interface NavBtnProps {
    text: string;
    secondary?: boolean;
}

const NavBtn: FC<NavBtnProps> = ({ text, secondary }) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className={styles.btnWrapper}>
            <button className={styles.btn} onClick={goBack}></button>
            {secondary ? (
                <button className={`${styles.btnText} ${styles.secondary}`}>{text}</button>
            ) : (
                <button className={styles.btnText}>{text}</button>
            )}
        </div>
    );
};

export default NavBtn;
