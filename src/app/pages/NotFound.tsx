import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-6">🐾</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! This page seems to have wandered off. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Go Home
            </Button>
          </Link>
          <Link to="/adopt/cats">
            <Button size="lg" variant="outline">
              Browse Adoptable Pets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
