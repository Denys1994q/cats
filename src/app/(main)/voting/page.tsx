import NavBtn from "@/components/nav-btn/Nav-btn";
import VotingPanel from "@/components/voting-panel/Voting-panel";

export default function Page() {
    return (
        <section>
            <NavBtn text={'voting'}/> 
            <VotingPanel />
        </section>
    );
}
