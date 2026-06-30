import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AnimalsProvider } from "./lib/AnimalsContext";

export default function App() {
  return (
    <AnimalsProvider>
      <RouterProvider router={router} />
    </AnimalsProvider>
  );
}