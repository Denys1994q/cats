"use client";

import { FC, useEffect } from "react";
import styles from "./gallery.module.sass";
import Select from "../../components/select/Select";
import { useState } from "react";
import NavBtn from "../../components/nav-btn/Nav-btn";
import GridPanel from "../../components/grid-panel/Grid-panel";
import Modal from "../../components/upload-modal/Upload-modal";
import { fetchCatImgs } from "@/services/http-service";
import Message from "../../components/message/Message";
import { addVote, deleteFavCat } from "@/services/http-service";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

interface GalleryProps {
    breedNames: any;
}

const Gallery: FC<GalleryProps> = ({ breedNames }) => {
    const [showModal, setShowModal] = useState(false);
    const [breed, setBreed] = useState("");
    const [limit, setLimit] = useState("5");
    const [type, setType] = useState("gif,jpg,png");
    const [order, setOrder] = useState("random");
    const [imgs, setImgs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const response: any = await fetchCatImgs({ limit, order, type, breed });
        setLoading(false);
        if (response !== "error") {
            setError(false);
            setImgs(response);
        } else {
            setError(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const onSelect = (id: string, value: any) => {
        if (id === "limit") {
            setLimit(value);
        } else if (id === "order") {
            setOrder(value);
        } else if (id === "type") {
            setType(value);
        } else if (id === "breed") {
            setBreed(value);
        }
    };

    const onGalleryImgClick = async (id: string) => {
        const foundedCat: any = imgs.find((cat: any) => cat.id === id);
        if (foundedCat && foundedCat.isFav) {
            const delResult = await deleteFavCat(foundedCat.favId);
            if (delResult !== "error") {
                setImgs((prevImgs: any) => {
                    return prevImgs.map((img: any) => (img.id === id ? { ...img, isFav: false } : img));
                });
            }
        } else {
            const voteResult = await addVote({ vote: "fav", imageId: id });
            if (voteResult !== "error") {
                setImgs((prevImgs: any) => {
                    return prevImgs.map((img: any) =>
                        img.id === id ? { ...img, isFav: true, favId: voteResult } : img
                    );
                });
            }
        }
    };

    return (
        <>
            {showModal ? (
                <div className={styles.modalWrapper}>
                    <Modal closeModal={closeModal} />
                </div>
            ) : (
                <section>
                    <div className={styles.btnWrapper}>
                        <NavBtn text={"gallery"} />
                        <button className={styles.uploadBtn} onClick={() => setShowModal(true)}></button>
                    </div>
                    <div className={styles.selects}>
                        <div className={styles.selectItem}>
                            <Select
                                secondary
                                id={"order"}
                                label={"Order"}
                                data={[
                                    { id: "random", name: "Random" },
                                    { id: "desc", name: "Desc" },
                                    { id: "asc", name: "Asc" },
                                ]}
                                onSelect={onSelect}
                            />
                        </div>
                        <div className={styles.selectItem}>
                            <Select
                                secondary
                                id={"type"}
                                label={"Type"}
                                data={[
                                    { id: "gif,jpg,png", name: "All" },
                                    { id: "jpg,png", name: "Static" },
                                    { id: "gif", name: "Animated" },
                                ]}
                                onSelect={onSelect}
                            />
                        </div>
                        <div className={styles.selectItem}>
                            <Select secondary id={"breed"} label={"breed"} data={breedNames} onSelect={onSelect} />
                        </div>
                        <div className={`${styles.selectItem} ${styles.limitWrapper}`}>
                            <div className={`${styles.limit}`}>
                                <Select
                                    secondary
                                    id={"limit"}
                                    label={"limit"}
                                    data={[
                                        { id: "5", name: "5 items per page" },
                                        { id: "10", name: "10 items per page" },
                                        { id: "15", name: "15 items per page" },
                                        { id: "20", name: "20 items per page" },
                                    ]}
                                    onSelect={onSelect}
                                />
                            </div>
                            <button className={styles.refreshBtn} onClick={fetchData}></button>
                        </div>
                    </div>
                    <div>
                        {loading && <Spinner secondary />}
                        {error && !loading ? <Error /> : null}
                        {!error && !loading ? <GridPanel imgs={imgs} favs handleClick={onGalleryImgClick} /> : null}
                        {!error && !loading && imgs.length === 0 ? <Message text='No item found' /> : null}
                    </div>
                </section>
            )}
        </>
    );
};

export default Gallery;
