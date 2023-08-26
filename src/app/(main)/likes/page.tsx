import styles from "./page.module.sass";
import NavBtn from "@/components/nav-btn/Nav-btn";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";

export default function Page() {
    // тут можна без клаэнта 
    
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"likes"} />
            </div>
            {/* <GridPanel /> */}
            <Message text='No item found' />
        </section>
    );
}
