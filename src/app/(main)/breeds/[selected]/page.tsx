"use client";

import NavBtn from "../../../../components/nav-btn/Nav-btn";
import { useParams } from "next/navigation";
import styles from "./page.module.sass";
import Carousel from "../../../../components/carousel/Carousel";
import { useEffect } from "react";
import { fetchOneCatBreed } from "@/services/http-service";
import { useState } from "react";
import Error from "../../../../components/error/Error";

export default function Page() {
    const params = useParams();
    const id: any = params.selected;
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchOneCatBreed({ breed: id, limit: "25" });
                if (data !== "error") {
                    setData(data);
                } else {
                    setError(true);
                }
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
                {error ? <Error /> : <Carousel data={data} />}
            </div>
        </section>
    );
}
