import { FC } from "react";
import styles from "./spinner.module.sass"; // Ваші стилі для спінера

interface SpinnerProps {
    secondary?: boolean
}

const Spinner: FC<SpinnerProps> = ({secondary}) => {
    return (
        <div className={styles.spinner}>
            <div className={`${styles.bounce1} ${secondary && styles.bounce1_secondary}`}></div>
            <div className={`${styles.bounce1} ${secondary && styles.bounce1_secondary}`}></div>
            <div className={`${styles.bounce1} ${secondary && styles.bounce1_secondary}`}></div>
        </div>
    );
};

export default Spinner;
