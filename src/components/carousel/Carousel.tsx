import { useState, FC } from "react";
import styles from "./carousel.module.sass";
import NavBtns from "../nav-btns/Nav-btns";
import Image from "next/image";
// import Link from "next/link";

export interface Slide {
    src: string;
}

interface CarouselProps {
    data: Slide[];
}

const Carousel: FC<CarouselProps> = ({ data }) => {
    const [activeSlideIdx, setActiveSlideIdx] = useState(0);

    return (
        <div>
            <div className={styles.panel__imgWrapper}>
                {data.map((item, idx) => (
                    <Image
                        src={item.src}
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
            <div className={styles.info}>
                <h2 className={styles.title}>Basenji</h2>
                <h3 className={styles.subtitle}>Family companion cat</h3>
                <div className={styles.about}>
                    <div>
                        <span className={styles.textItemTitle}>Temperament:</span>
                        <p className={styles.textItemSubtitle}>Active, Energetic, Independent, Intelligent, Gentle</p>
                    </div>
                    <div>
                        <div className={styles.itemWrapper}>
                            <span className={styles.textItemTitle}>Origin: </span>
                            <span className={styles.textItemSubtitle}>United States</span>
                        </div>
                        <div className={styles.itemWrapper}>
                            <span className={styles.textItemTitle}>Weight: </span>
                            <span className={styles.textItemSubtitle}>3-5 kg</span>
                        </div>
                        <div className={styles.itemWrapper}>
                            <span className={styles.textItemTitle}>Life span: </span>
                            <span className={styles.textItemSubtitle}>14-15 years</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
