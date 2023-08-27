import styles from "./page.module.sass";
import NavBtn from "../../../components/nav-btn/Nav-btn";
import VoteResultsPanel from "../../../components/vote-results-panel/Vote-results-panel";

export default function Page() {

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"likes"} />
            </div>
            <VoteResultsPanel  />
        </section>
    );
}
