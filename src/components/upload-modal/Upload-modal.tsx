import styles from "./upload-modal.module.sass";
import Image from "next/image";
import Message from "../message/Message";
import { useState } from "react";
import { uploadCat } from "@/services/http-service";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const UploadModal = ({ isOpen, closeModal }: any) => {
    if (!isOpen) return null;
    const [file, setFile] = useState<any>(null);
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [result, setResult] = useState<any>("");
    const [isDragOver, setIsDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [typeError, setTypeError] = useState(false);

    const getFile = (e: any) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(e.type)) {
            setTypeError(false);
            setResult("");
            setFile(e);
            setFileUrl(URL.createObjectURL(e));
        } else {
            setTypeError(true);
            return;
        }
    };

    const uploadFile = async () => {
        setLoading(true);
        const data = await uploadCat(file);
        setLoading(false);
        if (data !== "error") {
            setError(false);
            setResult(data);
            if (data === "success") {
                setFile(null);
            }
        } else {
            setError(true);
        }
    };

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
                {typeError && <h3 className={styles.typeError}>File must be .jpg or .png format</h3>}
                <label
                    className={`${styles.banner} ${isDragOver && styles.banner_dragOver}`}
                    onDragEnter={e => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragOver={e => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={e => {
                        e.preventDefault();
                        setIsDragOver(false);
                    }}
                    onDrop={e => {
                        e.preventDefault();
                        setIsDragOver(false);
                        getFile(e.dataTransfer.files[0]);
                    }}
                >
                    <input
                        type='file'
                        accept='image/jpeg, image/png'
                        onChange={(e: any) => getFile(e.target.files[0])}
                    />
                    <h3 className={`${styles.sign} ${fileUrl && styles.hidden}`}>
                        <span>Drag here</span> your file or <span>Click here</span> to upload
                    </h3>
                    {file && (
                        <div className={`${styles.bannerImg} ${result === "failed" && styles.bannerImg_error}`}>
                            <Image src={fileUrl} height={20} width={20} alt='banner' />
                        </div>
                    )}
                </label>
                {file && !typeError ? (
                    <>
                        <p className={styles.result}>Image File Name: {file.name}</p>
                        {!result && (
                            <button className={styles.uploadBtn} onClick={uploadFile}>
                                {loading ? (
                                    <span className={styles.spinnerWrapper}>
                                        <Spinner />
                                        Uploading
                                    </span>
                                ) : (
                                    "Upload Photo"
                                )}
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <p className={styles.result}>No file selected</p>
                    </>
                )}
                {error && !loading ? <Error /> : null}
                {result && result === "success" ? <Message successText='Thanks for the Upload - Cat found!' /> : null}
                {result && result === "failed" ? <Message errorText='No Cat found - try a different one' /> : null}
            </div>
            <div className={styles.overlay} onClick={() => closeModal()}></div>
        </>
    );
};

export default UploadModal;
