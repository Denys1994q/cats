"use client";

import React, { FC } from "react";
import styles from "./select.module.sass";

interface Select {
    name: string;
    id: string;
}

interface SelectProps {
    data: Select[];
    primary?: boolean;
    secondary?: boolean;
    label?: string;
    id: string;
    onSelect: (id: string, e: any) => void;
}

const Select: FC<SelectProps> = ({ data, primary, secondary, label, id, onSelect }) => {

    const selectHandler = (id: string, value: any) => {
        onSelect(id, value);
    };

    return (
        <>
            {primary && (
                <>
                    {label && (
                        <label htmlFor={id} className={styles.label}>
                            {label}
                        </label>
                    )}
                    <select
                        id={id}
                        className={styles.select}
                        onChange={e => selectHandler(id, e.target.value)}
                    >
                        {data.map((option, idx) => (
                            <option key={idx} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {secondary && (
                <>
                    {label && (
                        <label htmlFor={id} className={styles.label}>
                            {label}
                        </label>
                    )}
                    <select
                        id={id}
                        className={`${styles.select} ${styles.secondary}`}
                        onChange={e => selectHandler(id, e.target.value)}
                    >
                        {data.map((option, idx) => (
                            <option key={idx} value={option.id}>
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
