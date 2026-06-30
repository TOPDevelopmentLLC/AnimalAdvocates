import { useAnimalsContext } from "./AnimalsContext";
import { type Animal } from "./shelterluv";

interface UseAnimalsResult {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}

/**
 * Get currently-available ShelterLuv animals of a given species from the
 * shared AnimalsProvider. Data is fetched once on app load, not per page.
 */
export function useAnimals(type: "Cat" | "Dog"): UseAnimalsResult {
  const { cats, dogs, loading, error } = useAnimalsContext();
  return { animals: type === "Cat" ? cats : dogs, loading, error };
}
