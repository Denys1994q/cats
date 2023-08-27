
type Cat = {
    id: string;
    url: string;
};


type BreedOption = {
    limit?: string;
    breed?: string;
    order?: string;
    type?: string;
    cache?: boolean
}

// зображення одного кота
export async function fetchOneCat() {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    return data;
}

// зображення котів однієї породи
export const fetchOneCatBreed = async ({ limit, breed, order }: BreedOption) => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&order=${order}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const imgs = await res.json();
    const imgsMod = imgs.map((item: any) => {
        return {
            url: item.url,
            name: item.breeds[0].name,
            id: item.breeds[0].id,
            breeds: item.breeds[0],
            temperament: item.breeds[0].temperament,
            origin: item.breeds[0].origin,
            weight: item.breeds[0].weight.imperial,
            life_span: item.breeds[0].life_span,
            description: item.breeds[0].description,
        }
    })
    return imgsMod;
};

// зображення котів всіх порід
export const fetchAllCatBreeds = async ({ limit = '5', order = 'asc' }: BreedOption) => {
    try {
        const res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${limit}&order=${order}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!res.ok) {
            return 'error'
        }
        const data = await res.json();
    
        const imagePromises = data.map(async (breed: any) => {
            try {
                const imageRes = await fetch(`https://api.thecatapi.com/v1/images/${breed.reference_image_id}`);
                if (!imageRes.ok) {
                    return 'error'
                }
                const imageData = await imageRes.json();
                return imageData;
            } catch (error) {
                return 'error'
            }
        });
    
        const imgs = await Promise.all(imagePromises);
    
        const imgsMod = imgs
            .filter((item: any) => item !== null)
            .map((item: any) => ({
                url: item.url,
                name: item.breeds[0].name,
                id: item.breeds[0].id,
            }));
    
        return imgsMod;
    } catch (error) {
        return 'error'
    }
};

// всі наявні породи
export const fetchBreedNames = async () => {
    const res = await fetch(
        'https://api.thecatapi.com/v1/breeds'
    );
    const data = await res.json();
    return data;
};

// зображення різних котів
export const fetchCatImgs = async ({ limit = '5', breed = '', order = 'random', type = 'gif,jpg,png', cache = true }: BreedOption) => {
    if (cache) {
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=${type}&breed_ids=${breed}&order=${order}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await res.json();
        return data;
    } else {
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=${type}&breed_ids=${breed}&order=${order}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                cache: "no-store",
            }
        );
        const data = await res.json();
        return data;
    }
};

export const fetchCatOnName = async (name: string) => {
    try {
        const res = await fetch(
            `https://api.thecatapi.com/v1/breeds/search?q=${name}`
        );
        if (!res.ok) {
            return 'error';
        } else if (Array.isArray(res) && res.length === 0) {
            return []
        }
        const data = await res.json();
        if (data && data.length > 0 && data[0].id) {
            const imageRes = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data[0].id}&limit=25&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (!imageRes.ok) {
                return 'error';
            }
            const imageData = await imageRes.json();
            
            const imgsMod = imageData.map((item: any) => {
                return {
                    url: item.url,
                    name: item.breeds[0].name,
                    id: item.breeds[0].id,
                    breeds: item.breeds[0]
                };
            });
            return imgsMod;
        } else {
            return [];
        }
    } catch (error) {
        return 'error';
    }
};



// завантажити зображення кота
export const uploadCat = async (file: any) => {
    let formdata = new FormData();
    formdata.append("file", file);
    const options = {
        method: 'POST',
        body: formdata,
        headers: {'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`},
    };
    const {status} = await fetch('https://api.thecatapi.com/v1/images/upload', options);
    let result;
    if (status === 201) {result = 'success'} 
    if (status === 400) {result = 'failed'}  
    return result
}

// проголосувати за зображення кота
export const addVote = async ({ vote, imageId }: any) => {
    let body: any = {
        image_id: imageId,
        sub_id: "denys_rybachok",
    };

    if (vote === 'like' || vote === 'dislike') {
        body.value = vote === 'like' ? 1 : -1;
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/${vote === 'fav' ? 'favourites' : 'votes'}`, options);
        if (response.ok) {
            if (vote === 'fav') {
                const responseData = await response.json();
                const id = responseData.id;  
                return id
            } else {
                return 'ok';
            }
    
        } else {
            return 'error';
        }
    } catch (error) {
        return 'error';
    }
};

export async function fetchVotedCats(options: {vote: string}) {
    try {
        const imageRes = await fetch(`http://api.thecatapi.com/v1/${options.vote === 'fav' ? 'favourites' : 'votes'}?sub_id=denys_rybachok&api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            cache: "no-store",
        });

        if (!imageRes.ok) {
            throw new Error("Failed to fetch voted cats");
        }

        const imageData = await imageRes.json();

        if (options.vote === 'like') {
            const imgsMod = imageData.filter((item: any) => item.value === 1).map((item: any) => {
                return {
                    url: item.image.url,
                    name: item.image_id,
                    id: item.image_id,
                }
            })
            return imgsMod;
        } else if (options.vote === 'dislike') {
            const imgsMod = imageData.filter((item: any) => item.value === -1).map((item: any) => {
                return {
                    url: item.image.url,
                    name: item.image_id,
                    id: item.image_id,
                }
            })
            return imgsMod;
        } else if (options.vote === 'fav') {
            const imgsMod = imageData.map((item: any) => {
                return {
                    url: item.image.url,
                    name: item.image_id,
                    id: item.id,
                    isFav: true
                }
            })
            return imgsMod
        }
    } catch (error) {
        return 'error';
    }
};



// видалити з улюблених
export async function deleteFavCat(imageId: string) {
    const options = {
        method: 'DELETE',
        headers: {
            'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/favourites/${imageId}`, options);
        if (response.ok) {
            return 'ok'
        } else {
            return 'error'
        }
    } catch {
        return 'error'
    }
}
