'use client'

import styles from "./page.module.sass";
import Select from "@/components/select/Select";
import { useState } from "react";
import NavBtn from "@/components/nav-btn/Nav-btn";
import Image from "next/image";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Modal from "@/components/upload-modal/Upload-modal";

export default function Page() {
    const [showModal, setShowModal] = useState(false)

    const cats = [
        { src: "/images/grid1.png" },
        { src: "/images/grid2.png" },
        { src: "/images/grid2.png" },
        { src: "/images/cat.png" },
        { src: "/images/cat.png" },
    ];

    const closeModal = () => {
        setShowModal(false)
    }

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
                            <Select secondary id={"order"} label={"Order"} data={[{ name: "11" }, { name: "ddfs" }]} />
                        </div>
                        <div className={styles.selectItem}>
                            <Select secondary id={"type"} label={"Type"} data={[{ name: "11" }, { name: "ddfs" }]} />
                        </div>
                        <div className={styles.selectItem}>
                            <Select secondary id={"breed"} label={"breed"} data={[{ name: "11" }, { name: "ddfs" }]} />
                        </div>
                        <div className={`${styles.selectItem} ${styles.limitWrapper}`}>
                            <div className={`${styles.limit}`}>
                                <Select
                                    secondary
                                    id={"limit"}
                                    label={"limit"}
                                    data={[{ name: "11" }, { name: "ddfs" }]}
                                />
                            </div>
                            <button className={styles.refreshBtn}></button>
                        </div>
                    </div>
                    <div>
                        <GridPanel imgs={cats} />
                    </div>
                </section>
            )}
        </>
    );
}
