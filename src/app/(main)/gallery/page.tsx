import Gallery from "@/components/gallery/Gallery";
import { fetchCatImgs, fetchBreedNames } from "@/services/http-service";

export default async function Page() {
    const imgs = await fetchCatImgs({ cache: false });
    const breedNames = await fetchBreedNames();
    breedNames.unshift({ id: "", name: "None" });

    return (
        <section>
            <Gallery initialData={imgs} breedNames={breedNames} />
        </section>
    );
}
