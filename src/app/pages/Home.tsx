import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Heart, Users, Home as HomeIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { useAnimalsContext } from "../lib/AnimalsContext";

// Background slideshow images for the hero. Files live in /public.
const heroImages = [
  "/logo-with-kitten.webp",
  "/Alfredo.webp",
  "/sleepy-kitty.webp",
  "/keyboard-sleepy-kitty.webp",
];

export default function Home() {
  const { cats, dogs, loading, error } = useAnimalsContext();
  // Interleave cats and dogs so the featured row isn't all one species, then
  // take the first 4 available animals from the API.
  const featuredPets: typeof cats = [];
  for (let i = 0; featuredPets.length < 4 && (i < cats.length || i < dogs.length); i++) {
    if (cats[i]) featuredPets.push(cats[i]);
    if (featuredPets.length < 4 && dogs[i]) featuredPets.push(dogs[i]);
  }

  // Hidden for now along with the Latest News section below, revisit later.
  // const newsItems = [
  //   {
  //     title: "Animal Advocates Celebrates 40 Years",
  //     excerpt: "Join us in celebrating the Furry Forty milestone - four decades of no-kill rescue in Pittsburgh.",
  //     date: "March 2024",
  //   },
  //   {
  //     title: "Super Seniors Foster Program Success",
  //     excerpt: "Meet Connie and Chester - a heartwarming story of our Senior to Senior Foster Program in action.",
  //     date: "February 2024",
  //   },
  //   {
  //     title: "Hangin' on the Catio",
  //     excerpt: "Get to know our long-term resident cats enjoying life at the headquarters catio.",
  //     date: "January 2024",
  //   },
  // ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-white min-h-[60vh] py-16 flex items-center">
        <HeroSlideshow images={heroImages} />
        {/* Dark gradient overlay keeps the white text readable over photos. */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Pittsburgh's Cat & Dog Rescue Since 1984
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Compassion in action — rescuing, fostering, and rehoming companion animals across the Pittsburgh region for over 40 years
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/adopt">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                Meet Adoptable Pets
              </Button>
            </Link>
            <Link to="/donate">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white hover:bg-white/90 text-primary hover:text-primary border-white">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary">40+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Serving Pittsburgh</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Volunteer-Run</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary">No-Kill</div>
              <div className="text-sm text-muted-foreground mt-1">Since 1984</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary">501(c)(3)</div>
              <div className="text-sm text-muted-foreground mt-1">Nonprofit</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            About Pittsburgh's Volunteer Animal Rescue
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 text-foreground/80">
              Animal Advocates is a nonprofit, all-volunteer, Pittsburgh-based animal welfare organization involved in the rescue, care, and placement of companion cats and dogs. Serving the Pittsburgh area since 1984, we have adhered to a no-kill policy and engaged in community-based advocacy on behalf of animals since our inception.
            </p>
            <p className="text-lg mb-6 text-foreground/80">
              We aim to provide high-quality care for the well-being of rescued cats and dogs until they are placed in forever homes. Except for a limited number of cats fostered at our headquarters in the West End, our adoptable animals are cared for in loving volunteer foster homes.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="/blep.webp"
                    alt="Rescued gray kitten sticking out its tongue"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Adopt a Cat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our adoptable cats and kittens. All are vetted and vaccinated.
                </p>
                <Link to="/adopt/cats" className="text-primary hover:underline text-sm font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="/Daisy.webp"
                    alt="Adoptable dog Daisy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Adopt a Dog</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find your perfect canine companion. All dogs are fully vetted and socialized in foster homes.
                </p>
                <Link to="/adopt/dogs" className="text-primary hover:underline text-sm font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="/foster.webp"
                    alt="Volunteer holding a rescued foster kitten"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Foster Saves Lives</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Become a foster family and help animals thrive in a home environment while awaiting adoption.
                </p>
                <Link to="/get-involved" className="text-primary hover:underline text-sm font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src="/entrance.webp"
                    alt="Animal Advocates Thrift Shoppe storefront entrance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Our Thrift Shop</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Shop vintage, designer items, and housewares. 100% of sales support animal rescue.
                </p>
                <Link to="/thrift-shop" className="text-primary hover:underline text-sm font-medium">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Adoptable Pets */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Adoptable Pets</h2>

          {error && (
            <p className="text-center text-muted-foreground">{error}</p>
          )}

          {loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-4 w-1/2 mx-auto" />
                      <Skeleton className="h-3 w-3/4 mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && featuredPets.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredPets.map((pet) => (
                <Link key={`${pet.type}-${pet.id}`} to={`/adopt/pet/${pet.id}`}>
                  <Card className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center">
                        {pet.coverPhoto ? (
                          <ImageWithFallback
                            src={pet.coverPhoto}
                            alt={pet.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-6xl">{pet.type === "Cat" ? "🐱" : "🐕"}</span>
                        )}
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-bold text-primary hover:underline mb-1">
                          {pet.name}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {pet.age}<br />
                          {pet.type}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && featuredPets.length === 0 && (
            <p className="text-center text-muted-foreground">
              Check back soon for pets available for adoption!
            </p>
          )}

          <div className="text-center mt-10">
            <Link to="/adopt">
              <Button size="lg" variant="outline">View All Adoptable Pets</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ways to Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Donate</h3>
              <p className="text-muted-foreground mb-4">
                Your gift provides vet care, food, and shelter for rescued animals. 100% volunteer-run means every dollar goes directly to animals.
              </p>
              <Link to="/donate">
                <Button className="bg-accent hover:bg-accent/90">Donate Now</Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-muted-foreground mb-4">
                Join our dedicated team of volunteers. Help with foster care, transportation, thrift shop, or fundraising.
              </p>
              <Link to="/get-involved">
                <Button variant="outline">Get Involved</Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Foster</h3>
              <p className="text-muted-foreground mb-4">
                Open your home temporarily to a cat or dog. We provide supplies and vet care - you provide love and care.
              </p>
              <Link to="/get-involved">
                <Button variant="outline">Learn About Fostering</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News — hidden for now, revisit later.
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4" />
                  <div className="text-xs text-muted-foreground mb-2">{item.date}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.excerpt}</p>
                  <Link to="/news" className="text-primary hover:underline text-sm font-medium">
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Newsletter Signup / "Stay Connected" — hidden for now, revisit later.
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg mb-8 text-white/90">
            Join our mailing list for adoptable pets, events, and Pittsburgh rescue stories
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white text-foreground flex-1"
            />
            <Button className="bg-accent hover:bg-accent/90 text-white">Subscribe</Button>
          </form>
        </div>
      </section>
      */}
    </div>
  );
}
