import styles from "./page.module.sass";
import NavBtn from "@/components/nav-btn/Nav-btn";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";

export default function Page() {
    const data = []
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"favourites"} />
            </div>
            {/* <GridPanel /> */}
            {data.length === 0 && <Message text='No item found' />}
        </section>
    );
}
