import { FC } from "react";
import styles from "./grid-panel.module.sass";

interface Img {
    src: string;
}

interface GridPanelProps {
    imgs: Img[];
}

const GridPanel: FC<GridPanelProps> = ({ imgs }) => {
    return (
        <>
            <div className={styles.grid}>
                {imgs.slice(0, 5).map((item, i) => (
                    <div key={i} className={styles.gridItem}>
                        <img src={item.src} className={styles.image} alt='cat-image' />
                    </div>
                ))}
            </div>
            {imgs.length > 5 && (
                <>
                    <div className={`${styles.grid} ${styles.grid__reverseColumns}`}>
                        {imgs.slice(5, 10).map((item, i) => (
                            <div key={i} className={styles.gridItem}>
                                <img src={item.src} className={styles.image} alt='cat-image' />
                            </div>
                        ))}
                    </div>
                    <div className={styles.grid}>
                        {imgs.slice(10, 15).map((item, i) => (
                            <div key={i} className={styles.gridItem}>
                                <img src={item.src} className={styles.image} alt='cat-image' />
                            </div>
                        ))}
                    </div>
                    <div className={`${styles.grid} ${styles.grid__reverseColumns}`}>
                        {imgs.slice(15).map((item, i) => (
                            <div key={i} className={styles.gridItem}>
                                <img src={item.src} className={styles.image} alt='cat-image' />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default GridPanel;
