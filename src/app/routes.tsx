import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import GetInvolved from "./pages/GetInvolved";
import Adopt from "./pages/Adopt";
import CatAdoption from "./pages/CatAdoption";
import DogAdoption from "./pages/DogAdoption";
import ThriftStore from "./pages/ThriftStore";
import Rehoming from "./pages/Rehoming";
import PetResources from "./pages/PetResources";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "donate", Component: Donations },
      { path: "get-involved", Component: GetInvolved },
      { path: "adopt", Component: Adopt },
      { path: "adopt/cats", Component: CatAdoption },
      { path: "adopt/dogs", Component: DogAdoption },
      { path: "thrift-shop", Component: ThriftStore },
      { path: "rehoming", Component: Rehoming },
      { path: "resources", Component: PetResources },
      { path: "contact", Component: Contact },
      { path: "news", Component: News },
      { path: "*", Component: NotFound },
    ],
  },
]);
