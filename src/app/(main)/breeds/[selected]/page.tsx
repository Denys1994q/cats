"use client";

import Image from "next/image";
import NavBtn from "@/components/nav-btn/Nav-btn";
import styles from "./page.module.sass";
import Carousel from "@/components/carousel/Carousel";

export default function Page() {

    const cats = [
        {src: '/images/cat.png'},
        {src: '/images/grid1.png'},
        {src: '/images/grid2.png'}
    ]

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.btnWrapper}>
                    <NavBtn text={"breeds"} secondary />
                    <button className={styles.btnId}>28</button>
                </div>
                <Carousel data={cats} />
            </div>
        </section>
    );
}
