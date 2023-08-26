"use client";

import Image from "next/image";
import NavBtn from "@/components/nav-btn/Nav-btn";
import { useParams, useSearchParams } from "next/navigation";
import styles from "./page.module.sass";
import Carousel from "@/components/carousel/Carousel";
import { useEffect } from "react";
import { fetchOneCatBreed } from "@/services/http-service";
import { useState } from "react";

export default function Page() {
    const params = useParams();
    const id: any = params.selected;
    const [data, setData] = useState<any>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (id) {
    //             const data = await fetchCatOnName(id);
    //             console.log(data);
    //             setData(data);
    //         }
    //     };
    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchOneCatBreed({ breed: id, limit: "25" });
                console.log(data);
                setData(data);
            }
        };
        fetchData();
    }, [id]);

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.btnWrapper}>
                    <NavBtn text={"breeds"} secondary />
                    <button className={styles.btnId}>{data.length > 0 && data[0].id}</button>
                </div>
                <Carousel data={data} />
            </div>
        </section>
    );
}
