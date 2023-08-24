import NavBtn from "@/components/nav-btn/Nav-btn";
import styles from "./page.module.sass";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";

export default function Page() {
    // вводить слово юзер, натискає фільтр, перехід йде на нову сторінку
    // в юрл сторінки записуєть те, що ввів юзер. Типу /search&breed=cymric
    // на цій сторінці витягується слово з парамс юрл і відбувається запит до catAPI

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"search"} />
            </div>
            <div>
                <p className={styles.text}>Search results for: <span>Cymric</span> </p>
                <Message text='No item found' />
                {/* <GridPanel /> */}
            </div>
        </section>
    );
}
