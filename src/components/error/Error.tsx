import { FC } from "react";
import styles from './error.module.sass'

const Error: FC = () => {
    return (
        <>
            <h4 className={styles.error}>Sorry, something goes wrong...</h4>
        </>
    );
};

export default Error;
