import styles from "./page.module.sass";
import NavBtn from "../../../components/nav-btn/Nav-btn";
import { fetchVotedCats } from "../../../services/http-service";
import FavsPanel from "../../../components/favs-panel/Favs-panel";

export default async function Page() {
    // const imgs: any = await fetchVotedCats({ vote: "fav" });
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"favourites"} />
            </div>
            <FavsPanel initialData={[]} />
        </section>
    );
}
