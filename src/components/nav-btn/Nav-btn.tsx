"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./nav-btn.module.sass";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBtnProps {
    text: string
}

const NavBtn: FC<NavBtnProps> = ({text}) => {
    return (
        <div className={styles.btnWrapper}>
            <button className={styles.btn}></button>
            <button className={styles.btnText}>{text}</button>
        </ div>
    );
};

export default NavBtn;
