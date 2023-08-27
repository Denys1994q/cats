"use client";

import React, { FC, useState, useEffect } from "react";
import NavBtn from "@/components/nav-btn/Nav-btn";
import Select from "@/components/select/Select";
import GridPanel from "../grid-panel/Grid-panel";
import styles from "./breeds-panel.module.sass";
import { fetchAllCatBreeds, fetchOneCatBreed } from "@/services/http-service";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const BreedsPanel: FC<any> = ({ initialData, breedNames }) => {
    const [breed, setBreed] = useState("all");
    const [limit, setLimit] = useState("5");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [imgs, setImgs] = useState(initialData);
    const [afterfirstLoad, setAfterFirstLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // список селектів лімітів
    const limits = [
        { id: "5", name: "Limit: 5" },
        { id: "10", name: "Limit: 10" },
        { id: "15", name: "Limit: 15" },
        { id: "20", name: "Limit: 20" },
    ];

    useEffect(() => {
        setAfterFirstLoad(true);
    }, []);

    useEffect(() => {
        if (afterfirstLoad) {
            setLoading(true);
            const fetchData = async () => {
                if (breed === "all") {
                    const response: any = await fetchAllCatBreeds({ limit, order, page });
                    if (response !== "error") {
                        setLoading(false);
                        setImgs(response);
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                } else {
                    const response = await fetchOneCatBreed({ limit, breed, order, page });
                    if (response !== "error") {
                        setLoading(false);
                        setImgs(response);
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                }
            };
            fetchData();
        }
    }, [breed, limit, order, page]);

    useEffect(() => {
        setPage(0)
    }, [breed, limit, order])

    const onSelect = (id: string, value: any) => {
        if (id === "limit") {
            setLimit(value);
        } else if (id === "breeds") {
            setBreed(value);
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <NavBtn text={"breeds"} />
                <div className={styles.selects}>
                    <div className={styles.breedSelect}>
                        <Select primary id={"breeds"} data={breedNames} onSelect={onSelect} />
                    </div>
                    <div className={styles.limitSelect}>
                        <Select primary id={"limit"} data={limits} onSelect={onSelect} />
                    </div>
                    <div>
                        <button
                            className={`${styles.btn} ${styles.ascendBtn}`}
                            onClick={() => setOrder("asc")}
                        ></button>
                    </div>
                    <div>
                        <button
                            className={`${styles.btn} ${styles.descendBtn}`}
                            onClick={() => setOrder("desc")}
                        ></button>
                    </div>
                </div>
            </div>
            <div>
                {loading && <Spinner secondary />}
                {(error || initialData === "error") && !loading ? <Error /> : null}
                {initialData !== "error" && !error && !loading ? (
                    <>
                        <GridPanel imgs={imgs} breeds />
                        <div className={styles.btnsWrapper}>
                            <button className={styles.prevBtn} disabled={page === 0} onClick={() => setPage(prev => prev - 1)}></button>
                            <button className={styles.nextBtn} disabled={imgs.length < limit} onClick={() => setPage(prev => prev + 1)}></button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default BreedsPanel;
