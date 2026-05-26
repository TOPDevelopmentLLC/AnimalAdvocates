import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export default function FloatingDonateButton() {
  return (
    <Link to="/donate" className="lg:hidden">
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white shadow-lg rounded-full h-14 w-14 p-0"
      >
        <Heart className="h-6 w-6" />
      </Button>
    </Link>
  );
}
