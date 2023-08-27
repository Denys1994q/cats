"use client";

import { useState, FC, useEffect } from "react";
import Image from "next/image";
import styles from "./voting-panel.module.sass";
import Message from "../message/Message";
import { addVote, fetchOneCat, deleteFavCat } from "../../services/http-service";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { v4 as uuidv4 } from "uuid";

const VotingPanel: FC = () => {
    const [img, setImg] = useState<any>(null);
    const [logs, setLogs] = useState<any>([]);
    const [favId, setFavId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const response: any = await fetchOneCat();
        setLoading(false);
        if (response !== "error") {
            setError(false);
            setImg(response);
        } else {
            setError(true);
        }
    };

    const vote = async (result: string, imageId: string) => {
        setLoading(true);
        const { hours, minutes } = getCurrentTime();

        if (favId && result === "fav") {
            removeFromFavs(favId, imageId);
        } else {
            const voteResult = await addVote({ vote: result, imageId: imageId });
            setLoading(false);
            if (voteResult !== "error") {
                setError(false);
                if (result === "fav") {
                    // стилізуємо іконку
                    setFavId(voteResult);
                } else {
                    // показуємо наступного кота
                    const data: any = await fetchOneCat();
                    setImg(data);
                }
                // записуємо в логи
                setLogs((logs: any) => [...logs, { time: `${hours}:${minutes}`, id: imageId, vote: result }]);
            } else {
                setError(true);
            }
        }
    };

    const removeFromFavs = async (favId: string, imageId: string) => {
        const { hours, minutes } = getCurrentTime();
        const delResult = await deleteFavCat(favId);
        setLoading(false);
        if (delResult !== "error") {
            setError(false);
            setLogs((logs: any) => [...logs, { time: `${hours}:${minutes}`, id: imageId, vote: "delFav" }]);
        } else {
            setError(true);
        }
        setFavId(null);
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return { hours, minutes };
    };

    return (
        <div className={styles.panel}>
            {img && (
                <div className={styles.panel__imgWrapper}>
                    <Image src={img[0].url} width={640} height={360} className={styles.panel__img} alt='cat' />
                    <div className={styles.panel__tools}>
                        <button
                            className={`${styles.panel__btn} ${styles.panel__btnLike}`}
                            onClick={() => vote("like", img[0].id)}
                        ></button>
                        <button
                            className={`${styles.panel__btn} ${styles.panel__btnFav} ${
                                favId && styles.panel__btnFav_active
                            }`}
                            onClick={() => vote("fav", img[0].id)}
                        ></button>
                        <button
                            className={`${styles.panel__btn} ${styles.panel__btnDis}`}
                            onClick={() => vote("dislike", img[0].id)}
                        ></button>
                    </div>
                </div>
            )}
            {error && !loading ? <Error /> : null}
            {loading && (
                <div>
                    <Spinner secondary />
                </div>
            )}
            <ul className={styles.panel__list}>
                {logs.map((log: any) => {
                    if (log.vote === "like") {
                        return (
                            <li key={uuidv4()}>
                                <Message like time={log.time} id={log.id} />
                            </li>
                        );
                    } else if (log.vote === "dislike") {
                        return (
                            <li key={uuidv4()}>
                                <Message dislike time={log.time} id={log.id} />
                            </li>
                        );
                    } else if (log.vote === "fav") {
                        return (
                            <li key={uuidv4()}>
                                <Message favourite time={log.time} id={log.id} />
                            </li>
                        );
                    } else if (log.vote === "delFav") {
                        return (
                            <li key={uuidv4()}>
                                <Message delFavourite time={log.time} id={log.id} />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default VotingPanel;
