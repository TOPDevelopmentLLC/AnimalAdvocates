import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Heart, Users, Home as HomeIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { CtaLink } from "../components/TopLinks";
import { useAnimalsContext } from "../lib/AnimalsContext";
import { useTopContent, type BodyTextData, type HeroData, type TitleTextData } from "../lib/topContent";
import homeContent from "../../../top-content/home.json";

const statIds = ["stat-years", "stat-volunteer", "stat-no-kill", "stat-nonprofit"];

// Feature card section ids, plus any extra image class the card needs.
const featureCards = [
  { id: "feature-cats", imageClass: "object-top" },
  { id: "feature-dogs", imageClass: "" },
  { id: "feature-foster", imageClass: "" },
  { id: "feature-thrift", imageClass: "" },
];

export default function Home() {
  const { cats, dogs, loading, error } = useAnimalsContext();
  const { section } = useTopContent("home", homeContent);
  const hero = section<HeroData>("hero");
  const about = section<BodyTextData>("about");
  const featured = section<TitleTextData>("featured-pets");
  const waysToHelp = section<BodyTextData>("ways-to-help");
  const helpDonate = section<TitleTextData>("help-donate");
  const helpVolunteer = section<TitleTextData>("help-volunteer");
  const helpFoster = section<TitleTextData>("help-foster");
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
        <HeroSlideshow images={hero.images ?? []} />
        {/* Dark gradient overlay keeps the white text readable over photos. */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {hero.title}
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hero.ctas?.map((cta, index) => (
              <CtaLink key={cta.href + index} href={cta.href}>
                {index === 0 ? (
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                    {cta.label}
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white hover:bg-white/90 text-primary hover:text-primary border-white">
                    {cta.label}
                  </Button>
                )}
              </CtaLink>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {statIds.map((id) => {
              const stat = section<TitleTextData>(id);
              return (
                <div key={id}>
                  <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {about.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            {about.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-lg mb-6 text-foreground/80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map(({ id, imageClass }) => {
              const card = section<TitleTextData>(id);
              const cta = card.ctas?.[0];
              return (
                <CtaLink key={id} href={cta?.href ?? "/"}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                        <ImageWithFallback
                          src={card.image?.src}
                          alt={card.image?.alt}
                          className={`w-full h-full object-cover${imageClass ? ` ${imageClass}` : ""}`}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {card.text}
                      </p>
                      <span className="text-primary hover:underline text-sm font-medium">
                        {cta?.label}
                      </span>
                    </CardContent>
                  </Card>
                </CtaLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Adoptable Pets */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{featured.title}</h2>

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
              {featured.text}
            </p>
          )}

          <div className="text-center mt-10">
            {featured.ctas?.map((cta) => (
              <CtaLink key={cta.href} href={cta.href}>
                <Button size="lg" variant="outline">{cta.label}</Button>
              </CtaLink>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{waysToHelp.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">{helpDonate.title}</h3>
              <p className="text-muted-foreground mb-4">
                {helpDonate.text}
              </p>
              {helpDonate.ctas?.map((cta) => (
                <CtaLink key={cta.href} href={cta.href}>
                  <Button className="bg-accent hover:bg-accent/90">{cta.label}</Button>
                </CtaLink>
              ))}
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{helpVolunteer.title}</h3>
              <p className="text-muted-foreground mb-4">
                {helpVolunteer.text}
              </p>
              {helpVolunteer.ctas?.map((cta) => (
                <CtaLink key={cta.href} href={cta.href}>
                  <Button variant="outline">{cta.label}</Button>
                </CtaLink>
              ))}
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{helpFoster.title}</h3>
              <p className="text-muted-foreground mb-4">
                {helpFoster.text}
              </p>
              {helpFoster.ctas?.map((cta) => (
                <CtaLink key={cta.href} href={cta.href}>
                  <Button variant="outline">{cta.label}</Button>
                </CtaLink>
              ))}
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
