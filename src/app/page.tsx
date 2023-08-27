"use client";

import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.sass";
import { useEffect } from "react";

export default function Home() {
    // коли юзер перший раз заходить в додаток, він отримує унікальний ключ, який використовується для фільтрування в апі. Щоб юзер міг бачити лише свої лайкнуті чи дізлайкнуті коти, а не всі, які прикріплені до апі-ключа розробника 
    useEffect(() => {
        if (typeof window !== "undefined") {
            let uniqueKey = localStorage.getItem("userKey");
            if (!uniqueKey) {
                uniqueKey = uuidv4();
                localStorage.setItem("userKey", uniqueKey);
            }
        }
    }, []);

    return <div className={styles.banner}></div>;
}
