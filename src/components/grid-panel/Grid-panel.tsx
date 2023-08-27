import { FC } from "react";
import styles from "./grid-panel.module.sass";
import Link from "next/link";
import Image from "next/image";

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
    const generateGrid = (startIndex: number, endIndex: number) => {
        return (
            <div className={`${styles.grid} ${startIndex >= 5 ? styles.grid__reverseColumns : ""}`}>
                {imgs && imgs.length > 0 ? (
                    <>
                        {" "}
                        {imgs.slice(startIndex, endIndex).map((item, i) => (
                            <div key={i} className={`${favs || breeds ? styles.gridItem_favs : ""} ${styles.gridItem}`}>
                                <Image src={item.url} fill={true} className={styles.image} alt='cat-image' />
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
                    </>
                ) : null}
            </div>
        );
    };

    return (
        <>
            {generateGrid(0, 5)}
            {generateGrid(5, 10)}
            {generateGrid(10, 15)}
            {generateGrid(15, imgs.length)}
        </>
    );
};

export default GridPanel;
