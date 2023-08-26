"use client";

import { FC } from "react";
import styles from "./gallery.module.sass";
import Select from "@/components/select/Select";
import {  useState } from "react";
import NavBtn from "@/components/nav-btn/Nav-btn";
import Image from "next/image";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Modal from "@/components/upload-modal/Upload-modal";
import { fetchCatImgs } from "@/services/http-service";
import Message from "@/components/message/Message";

interface GalleryProps {
    initialData: any;
    breedNames: any
}

const Gallery: FC<GalleryProps> = ({initialData, breedNames}) => {
    const [showModal, setShowModal] = useState(false);
    const [breed, setBreed] = useState("");
    const [limit, setLimit] = useState("5");
    const [type, setType] = useState("");
    const [order, setOrder] = useState("");
    const [imgs, setImgs] = useState(initialData);

    const closeModal = () => {
        setShowModal(false);
    };

    const refreshData = async () => {
        const data = await fetchCatImgs({ limit, order, type, breed });
        setImgs(data);
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

    return (
        <>
            {showModal ? (
                <div className={styles.modalWrapper}>
                    <Modal isOpen={true} closeModal={closeModal} />
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
                            <button className={styles.refreshBtn} onClick={refreshData}></button>
                        </div>
                    </div>
                    <div>
                        <GridPanel imgs={imgs} />
                        {imgs.length === 0 && <Message text='No item found' />}
                    </div>
                </section>
            )}
        </>
    );
};

export default Gallery;
