import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import FloatingDonateButton from "./FloatingDonateButton";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
}
