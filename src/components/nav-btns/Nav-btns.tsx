"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./nav-btns.module.sass";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBtns: FC<any> = () => {
    const pathname = usePathname();

    const btns = [
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

    const [hoveredBtnIndex, setHoveredBtnIndex] = useState<number | null>(null);

    return (
        <div className={styles.btns}>
            {btns.map((btn, index) => {
                const isActive = pathname === "/" + btn.title.toLowerCase();
                const notActiveBtn = hoveredBtnIndex === index ? btn.hoverImg : btn.img;
                return (
                    <Link href={btn.title.toLowerCase()}>
                        <button
                            className={`${hoveredBtnIndex === index ? styles.btnHovered : ""} ${isActive ? styles.btnActive : ""}  ${styles.btn}`}
                            onMouseEnter={() => setHoveredBtnIndex(index)}
                            onMouseLeave={() => setHoveredBtnIndex(null)}
                        >
                            <Image
                                src={isActive ? btn.activeImg : notActiveBtn}
                                height={30}
                                width={30}
                                alt={`${btn.title + "link-logo"}`}
                            />
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default NavBtns;
