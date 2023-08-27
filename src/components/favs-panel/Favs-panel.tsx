"use client";

import { FC, useEffect, useState } from "react";
import GridPanel from "../grid-panel/Grid-panel";
import Message from "../message/Message";
import { deleteFavCat, fetchVotedCats } from "../../services/http-service";
import Error from "../error/Error";

const FavsPanel: FC = () => {
    const [imgs, setImgs] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response: any = await fetchVotedCats({ vote: "fav" });
            if (response !== "error") {
                setImgs(response);
            } else {
                setError(true);
            }
        };
        fetchData();
    }, []);

    const removeImg = async (id: string) => {
        const delResult = await deleteFavCat(id);
        if (delResult !== "error") {
            setImgs(imgs => imgs.filter((img: any) => img.id !== id));
        } else {
            setError(true);
        }
    };

    return (
        <>
            {error ? <Error /> : <GridPanel imgs={imgs} favs handleClick={removeImg} />}
            {imgs.length === 0 && <Message text='No item found' />}
        </>
    );
};

export default FavsPanel;
