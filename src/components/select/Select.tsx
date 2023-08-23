import React, { FC, useState } from "react";

const Select: FC<any> = () => {
    const [selectedBreed, setSelectedBreed] = useState("all breeds");

    const breeds = [
        { id: 1, name: "Kek" },
        { id: 2, name: "Shel" },
    ];

    const breedContentOptions = breeds.map(item => {
        return (
            <option key={item.id} value={item.name}>
                {item.name}
            </option>
        );
    });

    const getSelectedBreed = (e: any) => {
        setSelectedBreed(e.target.value);
    };

    return (
        <select value={selectedBreed} className='breeds-select' onChange={e => getSelectedBreed(e)}>
            <option key={"all breeds"} value='all breeds'>
                All breeds
            </option>
            {breedContentOptions}
        </select>
    );
};

export default Select;
