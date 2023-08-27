"use client"

import { FC, useState, useEffect } from "react";
import GridPanel from "../grid-panel/Grid-panel";
import Message from "../message/Message";
import { fetchVotedCats } from "@/services/http-service";
import Error from "../error/Error";

interface VoteResultsPanelProps {
    initialData: any;
    dislikes?: boolean
}

const VoteResultsPanel: FC<VoteResultsPanelProps> = ({ initialData, dislikes }) => {
    const [imgs, setImgs] = useState(initialData);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response: any = await fetchVotedCats({ vote: dislikes ? "dislike" : "like" });
            if (response !== "error") {
                setImgs(response);
            } else {
                setError(true);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {error ? <Error /> : <GridPanel imgs={imgs} />}
            {imgs.length === 0 && <Message text='No item found' />}
        </>
    );
};

export default VoteResultsPanel;
