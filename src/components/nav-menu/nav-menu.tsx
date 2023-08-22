'use client'

import React, { FC } from "react";
import Image from "next/image";
import styles from "./nav-menu.module.sass";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface NavMenuLink {
    title: string;
    img: string;
}

interface NavMenuProps {
    heading: string;
    links: NavMenuLink[];
}

const NavMenu: FC<NavMenuProps> = ({ links, heading }) => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div className={styles.navMenu}>
            <h3 className={styles.navMenu__title}>{heading}</h3>
            <ul className={styles.navMenu__list}>
                {links.map(link => {
                     const isActive = pathname === '/' + link.title.toLowerCase()
                     return (
                        <Link href={link.title.toLowerCase()}>
                            <li className={styles.navMenu__item}>
                                <Image
                                    src={link.img}
                                    width={138}
                                    height={198}
                                    className={styles.navMenu__image}
                                    alt='voting-logo'
                                />
                                <h2 className={`${isActive ? styles.activeLink : ''} ${styles.navMenu__itemTitle}`}>{link.title}</h2>
                            </li>
                        </Link>
                    )
                } )}
            </ul>
        </div>
    );
};

export default NavMenu;
