import Gallery from "@/components/gallery/Gallery";
import { fetchBreedNames } from "@/services/http-service";

export default async function Page() {
    const breedNames = await fetchBreedNames();
    breedNames.unshift({ id: "", name: "None" });

    return (
        <section>
            <Gallery breedNames={breedNames} />
        </section>
    );
}
