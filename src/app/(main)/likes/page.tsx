import styles from "./page.module.sass";
import NavBtn from "@/components/nav-btn/Nav-btn";
import GridPanel from "@/components/grid-panel/Grid-panel";
import Message from "@/components/message/Message";
import { fetchVotedCats } from "@/services/http-service";

export default async function Page() {
    const data: any = await fetchVotedCats({vote: 'like'})

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"likes"} />
            </div>
            <GridPanel imgs={data} />
            {data.length === 0 && <Message text='No item found' />}
        </section>
    );
}
