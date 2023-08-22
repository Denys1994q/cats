import React, { FC } from "react";
import Image from "next/image";
import styles from "./nav-menu.module.sass";
import Link from "next/link";

interface NavMenuLink {
    title: string;
    img: string;
}

interface NavMenuProps {
    heading: string;
    links: NavMenuLink[];
}

const NavMenu: FC<NavMenuProps> = ({ links, heading }) => {
    return (
        <div className={styles.navMenu}>
            <h3 className={styles.navMenu__title}>{heading}</h3>
            <ul className={styles.navMenu__list}>
                {links.map(item => (
                    <Link href={item.title.toLowerCase()}>
                        <li className={styles.navMenu__item}>
                            <Image
                                src={item.img}
                                width={138}
                                height={198}
                                className={styles.navMenu__image}
                                alt='voting-logo'
                            />
                            <h2 className={styles.navMenu__itemTitle}>{item.title}</h2>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default NavMenu;
