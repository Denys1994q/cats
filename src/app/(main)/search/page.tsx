"use client";

import NavBtn from "../../../components/nav-btn/Nav-btn";
import styles from "./page.module.sass";
import GridPanel from "../../../components/grid-panel/Grid-panel";
import Message from "../../../components/message/Message";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCatOnName } from "../../../services/http-service";
import Error from "../../../components/error/Error";
import Spinner from "../../../components/spinner/Spinner";

export default function Page() {
    const searchParams = useSearchParams();
    const searchName = searchParams.get("name");
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (searchName) {
                const response = await fetchCatOnName(searchName);
                setLoading(false);
                if (response !== "error") {
                    setData(response);
                    setError(false);
                } else {
                    setError(true);
                }
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"search"} />
            </div>
            {loading && <Spinner secondary />}
            {error && !loading ? <Error /> : null}
            {!loading && !error ? (
                <div>
                    <>
                        <p className={styles.text}>
                            search results for: <span>{data && data.length > 0 ? data[0].name : searchName}</span>
                        </p>
                        {data && data.length > 0 ? <GridPanel imgs={data} /> : <Message text='No item found' />}
                    </>
                </div>
            ) : null}
        </section>
    );
}
