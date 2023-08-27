import styles from "./page.module.sass";
import NavBtn from "../../../components/nav-btn/Nav-btn";
import { fetchVotedCats } from "../../../services/http-service";
import VoteResultsPanel from "../../../components/vote-results-panel/Vote-results-panel";

export default async function Page() {
    const imgs: any = await fetchVotedCats({ vote: "like" });

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"likes"} />
            </div>
            <VoteResultsPanel initialData={imgs} />
        </section>
    );
}
