import NavBtn from "@/components/nav-btn/Nav-btn";
import VotingPanel from "@/components/voting-panel/Voting-panel";
import styles from "./page.module.sass";
import { fetchOneCat } from "@/services/http-service";

export default async function Page() {
    const data = await fetchOneCat("https://api.thecatapi.com/v1/images/search", true);

    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"voting"} />
            </div>
            <VotingPanel image={data[0].url} />
        </section>
    );
}
