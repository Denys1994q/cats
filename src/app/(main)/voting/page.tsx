import NavBtn from "@/components/nav-btn/Nav-btn";
import VotingPanel from "@/components/voting-panel/Voting-panel";
import styles from "./page.module.sass";

export default async function Page() {
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"voting"} />
            </div>
            <VotingPanel />
        </section>
    );
}
