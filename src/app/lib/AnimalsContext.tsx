import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchAvailableAnimals, type Animal } from "./shelterluv";

interface AnimalsContextValue {
  cats: Animal[];
  dogs: Animal[];
  /** All animals, cats first then dogs. */
  all: Animal[];
  loading: boolean;
  error: string | null;
}

const AnimalsContext = createContext<AnimalsContextValue | undefined>(undefined);

/**
 * Fetches ShelterLuv cats and dogs once when the app loads and shares them
 * with every page. This avoids each adoption page issuing its own request.
 */
export function AnimalsProvider({ children }: { children: ReactNode }) {
  const [cats, setCats] = useState<Animal[]>([]);
  const [dogs, setDogs] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    Promise.all([
      fetchAvailableAnimals("Cat", controller.signal),
      fetchAvailableAnimals("Dog", controller.signal),
    ])
      .then(([catData, dogData]) => {
        setCats(catData);
        setDogs(dogData);
      })
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
  }, []);

  const value: AnimalsContextValue = {
    cats,
    dogs,
    all: [...cats, ...dogs],
    loading,
    error,
  };

  return <AnimalsContext.Provider value={value}>{children}</AnimalsContext.Provider>;
}

/** Access the shared, already-loaded animals. Must be used inside AnimalsProvider. */
export function useAnimalsContext(): AnimalsContextValue {
  const ctx = useContext(AnimalsContext);
  if (!ctx) {
    throw new Error("useAnimalsContext must be used within an AnimalsProvider");
  }
  return ctx;
}
