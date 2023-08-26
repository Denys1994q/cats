"use client";

import NavBtn from "@/components/nav-btn/Nav-btn";
import styles from "./page.module.sass";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCatOnName } from "@/services/http-service";

export default function Page() {
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const searchName = searchParams.get("name");

    useEffect(() => {
        const fetchData = async () => {
            if (searchName) {
                const data = await fetchCatOnName(searchName);
                setData(data);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"search"} />
            </div>
            <div>
                <p className={styles.text}>
                    search results for: <span>{searchName}</span>{" "}
                </p>
                {data && data.length > 0 ? <GridPanel imgs={data} /> : <Message text='No item found' />}
            </div>
        </section>
    );
}
