"use client";

import { FC } from "react";
import styles from "./grid-panel.module.sass";
import Link from "next/link";
// import

interface Img {
    url: string;
    name: string;
    id: string;
    isFav?: boolean;
}

interface GridPanelProps {
    imgs: Img[];
    breeds?: boolean;
    favs?: boolean;
    handleClick?: any;
}

const GridPanel: FC<GridPanelProps> = ({ imgs, breeds, favs, handleClick }) => {
    return (
        <>
            <div className={styles.grid}>
                {imgs.slice(0, 5).map((item, i) => (
                    <div key={i} className={`${favs || breeds ? styles.gridItem_favs : ""} ${styles.gridItem}`}>
                        <img src={item.url} className={styles.image} alt='cat-image' />
                        {breeds ? (
                            <Link href={`/breeds/${item.id.toLowerCase()}`}>
                                <div className={styles.imageText}>{item.name}</div>
                            </Link>
                        ) : (
                            <>
                                {favs && (
                                    <button
                                        className={`${styles.imageText} ${styles.imageText_centred} ${
                                            item.isFav && styles.imageText_fav
                                        }`}
                                        onClick={() => handleClick(item.id)}
                                    ></button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {imgs.length > 5 && (
                <>
                    <div className={`${styles.grid} ${styles.grid__reverseColumns}`}>
                        {imgs.slice(5, 10).map((item, i) => (
                            <div key={i} className={`${favs || breeds ? styles.gridItem_favs : ""} ${styles.gridItem}`}>
                                <img src={item.url} className={styles.image} alt='cat-image' />
                                {breeds ? (
                                    <Link href={`/breeds/${item.id.toLowerCase()}`}>
                                        <div className={styles.imageText}>{item.name}</div>
                                    </Link>
                                ) : (
                                    <>
                                        {favs && (
                                            <button
                                                className={`${styles.imageText} ${styles.imageText_centred} ${
                                                    item.isFav && styles.imageText_fav
                                                }`}
                                                onClick={() => handleClick(item.id)}
                                            ></button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.grid}>
                        {imgs.slice(10, 15).map((item, i) => (
                            <div key={i} className={`${favs || breeds ? styles.gridItem_favs : ""} ${styles.gridItem}`}>
                                <img src={item.url} className={styles.image} alt='cat-image' />
                                {breeds ? (
                                    <Link href={`/breeds/${item.id.toLowerCase()}`}>
                                        <div className={styles.imageText}>{item.name}</div>
                                    </Link>
                                ) : (
                                    <>
                                        {favs && (
                                            <button
                                                className={`${styles.imageText} ${styles.imageText_centred} ${
                                                    item.isFav && styles.imageText_fav
                                                }`}
                                                onClick={() => handleClick(item.id)}
                                            ></button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.grid} ${styles.grid__reverseColumns}`}>
                        {imgs.slice(15).map((item, i) => (
                            <div key={i} className={`${favs || breeds ? styles.gridItem_favs : ""} ${styles.gridItem}`}>
                                <img src={item.url} className={styles.image} alt='cat-image' />
                                {breeds ? (
                                    <Link href={`/breeds/${item.id.toLowerCase()}`}>
                                        <div className={styles.imageText}>{item.name}</div>
                                    </Link>
                                ) : (
                                    <>
                                        {favs && (
                                            <button
                                                className={`${styles.imageText} ${styles.imageText_centred} ${
                                                    item.isFav && styles.imageText_fav
                                                }`}
                                                onClick={() => handleClick(item.id)}
                                            ></button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default GridPanel;
