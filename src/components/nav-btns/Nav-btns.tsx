"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./nav-btns.module.sass";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BtnLink } from "../search-panel/Search-panel";

interface NavBtnsProps {
    links: BtnLink[];
}

const NavBtns: FC<NavBtnsProps> = ({links}) => {
    const pathname = usePathname();
    const [hoveredBtnIndex, setHoveredBtnIndex] = useState<number | null>(null);

    return (
        <div className={styles.btns}>
            {links.map((btn, index) => {
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
