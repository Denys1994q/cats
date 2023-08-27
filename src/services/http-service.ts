
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
export async function fetchOneCat(options?: { cache?: boolean }): Promise<Cat[]> {
    if (options && options.cache === false) {
        const res = await fetch("https://api.thecatapi.com/v1/images/search", {
            cache: "no-store",
        });
        const data: Cat[] = await res.json();
        return data;
    } else {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data: Cat[] = await res.json();
        return data;
    }
}

// зображення котів однієї породи
export const fetchOneCatBreed = async ({ limit, breed, order }: BreedOption) => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`
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
    const res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${limit}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`);
    const data = await res.json();

    const imagePromises = data.map(async (breed: any) => {
        const imageRes = await fetch(`https://api.thecatapi.com/v1/images/${breed.reference_image_id}`);
        const imageData = await imageRes.json();
        return imageData;
    });
    const imgs = await Promise.all(imagePromises);
    const imgsMod = imgs.map((item: any) => {
        return {
            url: item.url,
            name: item.breeds[0].name,
            id: item.breeds[0].id
        }
    })
    return imgsMod;
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
export const fetchCatImgs = async ({ limit = '5', breed = '', order = 'random', type = 'static', cache = true }: BreedOption) => {
    if (cache) {
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=${type}&breed_ids=${breed}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`
        );
        const data = await res.json();
        return data;
    } else {
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=${type}&breed_ids=${breed}&order=${order}&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`, {
                cache: "no-store",
            }
        );
        const data = await res.json();
        return data;
    }
};

// пошук котів за назвою породи
export const fetchCatOnName = async (name: string) => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/breeds/search?q=${name}`
    );
    const data = await res.json();
    if (data && data.length > 0 && data[0].id) {
        const imageRes = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${data[0].id}&limit=25&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`);
        const imageData = await imageRes.json();
        
        const imgsMod = imageData.map((item: any) => {
            return {
                url: item.url,
                name: item.breeds[0].name,
                id: item.breeds[0].id,
                breeds: item.breeds[0]
            }
        })
        return imgsMod;
    }
};

// завантажити зображення кота
export const uploadCat = async (file: any) => {
    let formdata = new FormData();
    formdata.append("file", file);
    const options = {
        method: 'POST',
        body: formdata,
        headers: {'x-api-key': '3c71318c-32fa-4b4a-a5bf-f888e6bf7e60'},
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
            'x-api-key': '3c71318c-32fa-4b4a-a5bf-f888e6bf7e60',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/${vote === 'fav' ? 'favourites' : 'votes'}`, options);
        if (response.ok) {
            if (vote === 'fav') {
                const responseData = await response.json();
                const id = responseData.id; // Отримуємо значення "id" потрібне для видалення 
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

// отримати зображення котів, за яких було проголосовано (лайки, дізлайки, улюблені)
export async function fetchVotedCats(options: {vote: string}) {   
    const imageRes = await fetch(`http://api.thecatapi.com/v1/${options.vote === 'fav' ? 'favourites' : 'votes'}?sub_id=denys_rybachok&api_key=3c71318c-32fa-4b4a-a5bf-f888e6bf7e60`, {
        cache: "no-store",
    });
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
                id: item.image_id, 
            }
        })
        return imgsMod
    }
};

// видалити з улюблених
export async function deleteFavCat(imageId: string = '232391055') {
    const options = {
        method: 'DELETE',
        headers: {
            'x-api-key': '3c71318c-32fa-4b4a-a5bf-f888e6bf7e60',
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/favourites/${imageId}`, options);
        if (response.ok) {
            return 'ok'
        }
    } catch {
        return 'error'
    }

}
