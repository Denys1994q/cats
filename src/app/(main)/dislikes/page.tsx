import styles from "./page.module.sass";
import NavBtn from "@/components/nav-btn/Nav-btn";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";

export default function Page() {
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"dislikes"} />
            </div>
            {/* <GridPanel /> */}
            <Message text='No item found' />
        </section>
    );
}
