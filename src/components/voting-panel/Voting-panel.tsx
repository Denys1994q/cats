"use client";

import { useState, FC } from "react";
import Image from "next/image";
import styles from "./voting-panel.module.sass";
import Message from "../message/Message";
import { addVote } from "@/services/http-service";
import { fetchOneCat } from "@/services/http-service";

interface VotingPanelProps {
    image: string;
    id: string;
}

const VotingPanel: FC<VotingPanelProps> = ({ image, id }) => {
    const [img, setImg] = useState(image);
    const [logs, setLogs] = useState<any>([]);

    const vote = async (result: number, imageId: string) => {
        const { hours, minutes } = getCurrentTime();
        addVote({ vote: result, imageId: imageId });
        setLogs((logs: any) => [
            ...logs,
            { time: `${hours}:${minutes}`, id: imageId, vote: result === 1 ? "like" : "dislike" },
        ]);

        const data: any = await fetchOneCat();
        setImg(data[0].url);
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
                <Image src={img} width={640} height={360} className={styles.panel__img} alt='cat' />
                <div className={styles.panel__tools}>
                    <button
                        className={`${styles.panel__btn} ${styles.panel__btnStart}`}
                        onClick={() => vote(1, id)}
                    ></button>
                    <button className={`${styles.panel__btn} ${styles.panel__btnMiddle}`}></button>
                    <button
                        className={`${styles.panel__btn} ${styles.panel__btnEnd}`}
                        onClick={() => vote(-1, id)}
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
                    }
                })}

                {/* <li>
                    <Message favourite time='10:22' id='fQSunHvl8' />
                </li>  */}
            </ul>
        </div>
    );
};

export default VotingPanel;
