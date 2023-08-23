"use client";

import React, { FC, useState } from "react";
import styles from "./select.module.sass";

interface Select {
    name: string;
}

interface SelectProps {
    data: Select[];
    primary?: boolean;
    secondary?: boolean;
    label?: string;
    id?: string
}

const Select: FC<SelectProps> = ({ data, primary, secondary, label, id }) => {
    const [selectedBreed, setSelectedBreed] = useState("all breeds");

    const getSelectedBreed = (e: any) => {
        setSelectedBreed(e.target.value);
    };

    return (
        <>
            {primary && (
                <>
                    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
                    <select id={id} value={selectedBreed} className={styles.select} onChange={e => getSelectedBreed(e)}>
                        {data.map((option, idx) => (
                            <option key={idx} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {secondary && (
                <>
                    {label && <label htmlFor={id} className={styles.label}>{label}</label>}
                    <select
                        id={id}
                        value={selectedBreed}
                        className={`${styles.select} ${styles.secondary}`}
                        onChange={e => getSelectedBreed(e)}
                    >
                        {data.map((option, idx) => (
                            <option key={idx} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </>
    );
};

export default Select;
