import { FC } from "react";
import styles from "./message.module.sass";
import Image from "next/image";

interface MessageProps {
    text?: string;
    successText?: string;
    errorText?: string;
    like?: boolean;
    dislike?: boolean;
    favourite?: boolean;
    id?: string;
    time?: string;
}

const Message: FC<MessageProps> = ({ text, successText, errorText, like, dislike, favourite, id, time }) => {
    return (
        <div className={`${styles.listItem} ${(successText || errorText) && styles.secondary}`}>
            {text && <p className={styles.textItem}>{text}</p>}
            {(successText || errorText) && (
                <>
                    <Image src={`${successText ? '/images/tick.svg' : '/images/error.svg'}`} height={20} width={20} alt='icon' />
                    <p className={styles.textItem}>{successText || errorText}</p>
                </>
            )}
            {like && (
                <>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeItem}>{time}</div>
                        <div className={styles.textItem}>
                            Image ID: <span>{id}</span> was added to Likes
                        </div>
                    </div>
                    <div className={styles.iconItem}>
                        <Image src='/images/likes-green.svg' height={20} width={20} alt='icon' />
                    </div>
                </>
            )}
            {dislike && (
                <>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeItem}>{time}</div>
                        <div className={styles.textItem}>
                            Image ID: <span>{id}</span> was added to Dislikes
                        </div>
                    </div>
                    <div className={styles.iconItem}>
                        <Image src='/images/dislike-default.svg' height={20} width={20} alt='icon' />
                    </div>
                </>
            )}
            {favourite && (
                <>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeItem}>{time}</div>
                        <div className={styles.textItem}>
                            Image ID: <span>{id}</span> was added to Favourites
                        </div>
                    </div>
                    <div className={styles.iconItem}>
                        <Image src='/images/favs-default.svg' height={20} width={20} alt='icon' />
                    </div>
                </>
            )}
        </div>
    );
};

export default Message;
