import styles from "./page.module.sass";
import NavBtn from "../../../components/nav-btn/Nav-btn";
import FavsPanel from "../../../components/favs-panel/Favs-panel";

export default function Page() {
    return (
        <section>
            <div className={styles.btnWrapper}>
                <NavBtn text={"favourites"} />
            </div>
            <FavsPanel />
        </section>
    );
}
