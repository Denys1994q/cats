import { useState, FC } from "react";
import styles from "./carousel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";
import Image from "next/image";

export interface Slide {
    url: string;
    temperament: string;
    weight: string;
    life_span: string;
    origin: string;
    description: string;
    name: string;
}

interface CarouselProps {
    data: Slide[];
}

const Carousel: FC<CarouselProps> = ({ data }) => {
    const [activeSlideIdx, setActiveSlideIdx] = useState(0);

    return (
        <div>
            <div className={styles.panel__imgWrapper}>
                <div className={styles.imgPanel}>
                    {data.map((item, idx) => (
                        <Image
                            src={item.url}
                            width={640}
                            height={360}
                            className={`${styles.panel__img} ${idx === activeSlideIdx && styles.active}`}
                            alt='slide-image'
                        />
                    ))}
                    <ul className={styles.panel__tools}>
                        {data.map((item, idx) => (
                            <li
                                className={`${styles.dot} ${idx === activeSlideIdx && styles.dotActive}`}
                                onClick={() => setActiveSlideIdx(idx)}
                            ></li>
                        ))}
                    </ul>
                </div>
                {data.length > 0 && (
                    <div className={styles.info}>
                        <h2 className={styles.title}>{data[0].name}</h2>
                        <h3 className={styles.subtitle}>{data[0].description}</h3>
                        <div className={styles.about}>
                            <div>
                                <span className={styles.textItemTitle}>Temperament:</span>
                                <p className={styles.textItemSubtitle}>{data[0].temperament}</p>
                            </div>
                            <div>
                                <div className={styles.itemWrapper}>
                                    <span className={styles.textItemTitle}>Origin: </span>
                                    <span className={styles.textItemSubtitle}>{data[0].origin}</span>
                                </div>
                                <div className={styles.itemWrapper}>
                                    <span className={styles.textItemTitle}>Weight: </span>
                                    <span className={styles.textItemSubtitle}>{data[0].weight}</span>
                                </div>
                                <div className={styles.itemWrapper}>
                                    <span className={styles.textItemTitle}>Life span: </span>
                                    <span className={styles.textItemSubtitle}>{data[0].life_span}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carousel;
