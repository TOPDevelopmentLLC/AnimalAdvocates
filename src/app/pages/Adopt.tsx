import { Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";

export default function Adopt() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">What Are You Looking For?</h1>
          <p className="text-xl text-white/90">
            Choose the type of companion you'd like to adopt from Animal Advocates
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cats */}
          <Link to="/adopt/cats">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <div className="w-full h-64 bg-secondary/20 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-9xl">🐱</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Cats</h2>
                <p className="text-muted-foreground mb-4">
                  Browse our available cats and kittens ready for their forever homes
                </p>
                <div className="text-primary font-medium">View Cats →</div>
              </CardContent>
            </Card>
          </Link>

          {/* Dogs */}
          <Link to="/adopt/dogs">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <div className="w-full h-64 bg-secondary/20 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-9xl">🐕</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Dogs</h2>
                <p className="text-muted-foreground mb-4">
                  Browse our available dogs and puppies ready for their forever homes
                </p>
                <div className="text-primary font-medium">View Dogs →</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
