"use client";

import React, { FC, useState, useEffect } from "react";
// import styles from "./select.module.sass";
import Image from "next/image";
import NavBtn from "@/components/nav-btn/Nav-btn";
import Select from "@/components/select/Select";
import GridPanel from "../grid-panel/Grid-panel";
import styles from "./breeds-panel.module.sass";
import { fetchAllCatBreeds, fetchOneCatBreed, fetchBreedNames } from "@/services/http-service";

const BreedsPanel: FC<any> = ({ data }) => {
    const [breed, setBreed] = useState("");
    const [limit, setLimit] = useState("5");
    const [order, setOrder] = useState("asc");
    const [imgs, setImgs] = useState(data);
    const [afterfirstLoad, setAfterFirstLoad] = useState(false);
    const [breedNames, setBreedNames] = useState([]);

    // список селектів лімітів
    const limits = [
        { id: "5", name: "Limit: 5" },
        { id: "10", name: "Limit: 10" },
        { id: "15", name: "Limit: 15" },
        { id: "20", name: "Limit: 20" },
    ];

    useEffect(() => {
        setAfterFirstLoad(true);
        const fetchData = async () => {
            const data = await fetchBreedNames();
            data.unshift({ id: "all", name: "All breeds" });
            setBreedNames(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (afterfirstLoad) {
            const fetchData = async () => {
                if (breed === "all") {
                    const imgs: any = await fetchAllCatBreeds({ limit, order });
                    setImgs(imgs);
                } else {
                    const imgs = await fetchOneCatBreed({ limit, breed, order });
                    setImgs(imgs);
                }
            };
            fetchData();
        }
    }, [breed, limit, order]);

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
                <GridPanel imgs={imgs} />
            </div>
        </>
    );
};

export default BreedsPanel;
