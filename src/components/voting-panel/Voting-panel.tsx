"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./voting-panel.module.sass";
import Message from "../message/Message";
import { addVote } from "@/services/http-service";
import { fetchOneCat } from "@/services/http-service";

interface VotingPanelProps {
    image: any;
    id: string;
}

const VotingPanel: FC<VotingPanelProps> = ({ image, id }) => {
    const [img, setImg] = useState<any>(image);
    const [logs, setLogs] = useState<any>([]);
    const [isFav, setIsFav] = useState(false)

    const vote = async (result: string, imageId: string) => {
        if (result === 'fav') {setIsFav(true)}
        const { hours, minutes } = getCurrentTime();
        addVote({ vote: result, imageId: imageId });
        setLogs((logs: any) => [
            ...logs,
            { time: `${hours}:${minutes}`, id: imageId, vote: result },
        ]);

        const data: any = await fetchOneCat();
        setImg(data);
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return { hours, minutes };
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panel__imgWrapper}>
                <Image src={img[0].url} width={640} height={360} className={styles.panel__img} alt='cat' />
                <div className={styles.panel__tools}>
                    <button
                        className={`${styles.panel__btn} ${styles.panel__btnLike}`}
                        onClick={() => vote('like', img[0].id)}
                    ></button>
                    <button
                        className={`${styles.panel__btn} ${styles.panel__btnFav} ${isFav && styles.panel__btnFav_active}`} onClick={() => vote('fav', img[0].id)}
                    ></button>
                    <button
                        className={`${styles.panel__btn} ${styles.panel__btnDis}`}
                        onClick={() => vote('dislike', img[0].id)}
                    ></button>
                </div>
            </div>
            <ul className={styles.panel__list}>
                {logs.map((log: any) => {
                    if (log.vote === "like") {
                        return (
                            <li>
                                <Message like time={log.time} id={log.id} />
                            </li>
                        );
                    } else if (log.vote === "dislike") {
                        return (
                            <li>
                                <Message dislike time={log.time} id={log.id} />
                            </li>
                        );
                    } else if (log.vote === "fav") {
                        return (
                            <li>
                                <Message favourite time={log.time} id={log.id} />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default VotingPanel;
