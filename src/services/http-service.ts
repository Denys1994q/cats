
type Cat = {
    url: string;
};

export async function fetchOneCat(url: string, cache: boolean = false): Promise<Cat[]> {
    if (cache) {
        const res = await fetch(url, {
            cache: "default",
        });
        const data: Cat[] = await res.json();
        return data;
    } else {
        const res = await fetch(url);
        const data: Cat[] = await res.json();
        return data;
    }
}
