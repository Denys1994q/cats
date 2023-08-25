
type Cat = {
    id: string;
    url: string;
};

type Breeds = {
    weight: {
        imperial: string;
        metric: string;
    };
    id: string;
    name: string;
    cfa_url: string;
    vetstreet_url: string;
    vcahospitals_url: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    lap: number;
    alt_names: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url: string;
    hypoallergenic: number;
    reference_image_id: string;
};


type BreedOption = {
    limit?: string;
    breed?: string;
    order?: string;
    type?: string
}


export async function fetchOneCat(options: { cache: boolean }): Promise<Cat[]> {
    if (options.cache) {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data: Cat[] = await res.json();
        return data;
    } else {
        const res = await fetch("https://api.thecatapi.com/v1/images/search", {
            cache: "no-store",
        });
        const data: Cat[] = await res.json();
        return data;
    }
}

export const fetchOneCatBreed = async ({ limit, breed, order }: BreedOption) => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`
    );
    const data = await res.json();
    return data;
};

export const fetchAllCatBreeds = async ({ limit, order }: BreedOption) => {
    const res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${limit}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`);
    const data = await res.json();

    const imagePromises = data.map(async (breed: any) => {
        const imageRes = await fetch(`https://api.thecatapi.com/v1/images/${breed.reference_image_id}`);
        const imageData = await imageRes.json();
        return imageData;
    });

    const imgs = await Promise.all(imagePromises);
    return imgs;
};

export const fetchBreedNames = async () => {
    const res = await fetch(
        'https://api.thecatapi.com/v1/breeds'
    );
    const data = await res.json();
    return data;
};

export const fetchCatImgs = async ({ limit, breed, order, type }: BreedOption) => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=${type}&breed_ids=${breed}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`
    );
    const data = await res.json();
    return data;
};