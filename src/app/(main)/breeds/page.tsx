"use client";

import Image from "next/image";
import NavBtn from "@/components/nav-btn/Nav-btn";
import Select from "@/components/select/Select";
import styles from "./page.module.sass";

export default function Page() {
    const breeds = [
        { id: 0, name: "All breeds" },
        { id: 1, name: "Kek" },
        { id: 2, name: "Shel" },
    ];

    const limits = [
        { id: 0, name: "Limit: 5" },
        { id: 1, name: "Limit: 10" },
        { id: 2, name: "Limit: 15" },
        { id: 3, name: "Limit: 20" },
    ];

    return (
        <section className={styles.wrapper}>
            <NavBtn text={"breeds"} />
            <div className={styles.selects}>
                <div className={styles.breedSelect}>
                    <Select primary id={'breeds'} data={breeds} />
                </div>
                <div className={styles.limitSelect}>
                    <Select primary id={'limit'} data={limits} />
                </div>
                <div>
                    <button>
                        <Image src='/images/ascend.png' height={40} width={40} alt='logo' />
                    </button>
                </div>
                <div>
                    <button>
                        <Image src='/images/descend.png' height={40} width={40} alt='logo' />
                    </button>
                </div>
            </div>
        </section>
    );
}
