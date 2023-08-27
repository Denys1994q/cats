import BreedsPanel from "../../../components/breeds-panel/Breeds-panel";
import { fetchAllCatBreeds, fetchBreedNames } from "@/services/http-service";

export default async function Page() {
    const imgs = await fetchAllCatBreeds({});
    const breedNames = await fetchBreedNames();
    breedNames.unshift({ id: "all", name: "All breeds" });

    return (
        <section>
            <BreedsPanel initialData={imgs} breedNames={breedNames} />
        </section>
    );
}
