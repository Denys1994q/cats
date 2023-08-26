import styles from "./upload-modal.module.sass";
import Message from "../message/Message";

const UploadModal = ({ isOpen, closeModal }: any) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modal}>
                <button className={styles.closeBtnIcon} onClick={() => closeModal()}></button>
                <h2 className={styles.title}>Upload a .jpg or .png Cat Image</h2>
                <h3 className={styles.subTitle}>
                    Any uploads must comply with the&nbsp;
                    <span>
                        <a target='_blank' href='https://thecatapi.com/privacy'>
                            upload guidelines
                        </a>
                    </span>
                    &nbsp;or face deletion.
                </h3>
                <div className={styles.banner}>
                    <h3 className={styles.sign}>
                        <span>Drag here</span> your file or <span>Click here</span> to upload
                    </h3>
                </div>
                <p className={styles.result}>No file selected</p>
                <p className={styles.result}>Image File Name: cat-puppy-on-garden--1586966191.jpg</p>
                <button className={styles.uploadBtn}></button>
                <Message successText="Thanks for the Upload - Cat found!" />
                <Message errorText="No Cat found - try a different one" />
            </div>
            <div className={styles.overlay} onClick={() => closeModal()}></div>
        </>
    );
};

export default UploadModal;