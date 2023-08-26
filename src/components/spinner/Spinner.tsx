import React from "react";
import styles from "./spinner.module.sass"; // Ваші стилі для спінера

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.bounce1}></div>
            <div className={styles.bounce2}></div>
            <div className={styles.bounce3}></div>
        </div>
    );
};

export default Spinner;
