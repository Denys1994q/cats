import BreedsPanel from "@/components/breeds-panel/Breeds-panel";
import { fetchAllCatBreeds } from "@/services/http-service";

export default async function Page() {
    const imgs = await fetchAllCatBreeds({limit: '5', order: 'asc'});

    return (
        <section>
            <BreedsPanel data={imgs} />
        </section>
    );
}
