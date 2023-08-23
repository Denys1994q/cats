import styles from "./page.module.sass";
import Select from "@/components/select/Select";
import NavBtn from "@/components/nav-btn/Nav-btn";

export default function Page() {
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"gallery"} />
            </div>
            <div className={styles.selects}>
                <div className={styles.selectItem}>
                    <Select secondary id={"order"} label={"Order"} data={[{ name: "11" }, { name: "ddfs" }]} />
                </div>
                <div className={styles.selectItem}>
                    <Select secondary id={"type"} label={"Type"} data={[{ name: "11" }, { name: "ddfs" }]} />
                </div>
                <div className={styles.selectItem}>
                    <Select secondary id={"breed"} label={"breed"} data={[{ name: "11" }, { name: "ddfs" }]} />
                </div>
                <div className={`${styles.selectItem} ${styles.limitWrapper}`}>
                    <div className={`${styles.limit}`}>
                        <Select secondary id={"limit"} label={"limit"} data={[{ name: "11" }, { name: "ddfs" }]} />
                    </div>
                    <button className={styles.refreshBtn}></button>
                </div>
            </div>
        </section>
    );
}
