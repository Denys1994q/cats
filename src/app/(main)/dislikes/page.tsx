import styles from "./page.module.sass";
import NavBtn from "../../../components/nav-btn/Nav-btn";
import VoteResultsPanel from "../../../components/vote-results-panel/Vote-results-panel";

export default async function Page() {
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"dislikes"} />
            </div>
            <VoteResultsPanel dislikes />
        </section>
    );
}
