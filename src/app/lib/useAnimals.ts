import { useEffect, useState } from "react";
import { fetchAvailableAnimals, type Animal } from "./shelterluv";

interface UseAnimalsResult {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}

/** Load currently-available ShelterLuv animals of a given species. */
export function useAnimals(type: "Cat" | "Dog"): UseAnimalsResult {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchAvailableAnimals(type, controller.signal)
      .then((data) => setAnimals(data))
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setError(
          "We couldn't load our available animals right now. Please try again shortly."
        );
        console.error("Failed to load ShelterLuv animals:", err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [type]);

  return { animals, loading, error };
}
