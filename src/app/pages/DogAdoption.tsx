import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAnimals } from "../lib/useAnimals";
import { CheckCircle2, Home as HomeIcon, Heart, Shield } from "lucide-react";

export default function DogAdoption() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { animals: dogs, loading, error } = useAnimals("Dog");

  const filters = [
    "Puppy",
    "Adult",
    "Senior",
    "Special Needs",
    "House Trained",
    "Good with Kids",
    "Good with Dogs",
    "Good with Cats",
  ];

  const filteredDogs =
    selectedFilters.length === 0
      ? dogs
      : dogs.filter((dog) => selectedFilters.some((filter) => dog.tags.includes(filter)));

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const faqs = [
    {
      question: "How long does the dog adoption process take?",
      answer:
        "The adoption process typically takes 3-7 days. After submitting your application, we'll review it and schedule an interview. If approved, we'll arrange a meet-and-greet with your chosen dog.",
    },
    {
      question: "Can I adopt a dog if I rent my home?",
      answer:
        "Yes! We require rental tenants to provide landlord authorization in their lease and landlord contact information during the application process.",
    },
    {
      question: "Do you adopt outside of the Pittsburgh area?",
      answer:
        "We primarily serve the greater Pittsburgh region and Allegheny County. Adoptions outside this area are considered on a case-by-case basis.",
    },
    {
      question: "What if my new dog doesn't get along with my current pet?",
      answer:
        "We provide lifetime support and will work with you to address any behavioral issues. In rare cases where it's not a good fit, we'll help facilitate a return or rehoming.",
    },
    {
      question: "Do you have puppies available?",
      answer:
        "Occasionally! Puppy availability varies. Check our available dogs regularly or submit an application to be notified when puppies become available.",
    },
    {
      question: "Are your dogs good in apartments?",
      answer:
        "Many of our dogs are apartment-friendly, especially smaller breeds and lower-energy adults. Filter by 'Apartment-Friendly' to see suitable options.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Adopt a Dog in Pittsburgh</h1>
          <p className="text-xl text-white/90">
            Thank you for considering a rescue dog from Animal Advocates! Our volunteer foster families get to know each dog's personality
            and needs very well, striving to make the best possible match for both animals and adopters in the Pittsburgh
            region.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <a
            href="https://new.shelterluv.com/matchme/adopt/AAPA/Dog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Submit Dog Adoption Application
            </Button>
          </a>
          <Link to="/adopt/cats">
            <Button size="lg" variant="outline">
              Looking for a cat instead? →
            </Button>
          </Link>
        </div>

        {/* Available Dogs Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Available for Adoption at Animal Advocates </h2>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Badge
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="mt-3"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
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

          {/* Dog Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDogs.map((dog) => (
                <Card key={dog.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center">
                      {dog.coverPhoto ? (
                        <ImageWithFallback
                          src={dog.coverPhoto}
                          alt={dog.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl">🐕</span>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-bold text-primary hover:underline cursor-pointer mb-1">
                        {dog.name}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {dog.age}<br />
                        {dog.sex}<br />
                        {dog.breed}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && filteredDogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {dogs.length === 0
                  ? "We don't have any dogs available for adoption right now. Please check back soon!"
                  : "No dogs match your selected filters. Try adjusting your criteria."}
              </p>
            </div>
          )}
        </div>

        {/* Why Adopt From Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pittsburgh's Trusted No-Kill Dog Rescue Since 1984
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Foster-Home Raised</h3>
              <p className="text-sm text-muted-foreground">
                Our dogs are socialized in real homes with families, not kennels, so they're ready for family life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fully Vetted</h3>
              <p className="text-sm text-muted-foreground">
                All dogs are vaccinated, spayed/neutered, microchipped, heartworm tested, and treated for fleas and worms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Lifetime Support</h3>
              <p className="text-sm text-muted-foreground">
                Our volunteers are here to help long after adoption day with any questions or concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Adoption Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Dog Adoption Guidelines</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  "Must complete application and interview before meet-and-greet",
                  "Meet-and-greets and adoptions are by appointment only",
                  "Must be 21 or older",
                  "All current household animals must be up-to-date on vaccinations and spayed/neutered",
                  "Rental tenants need landlord authorization in lease + landlord contact info",
                  "We do not place animals as gifts",
                  "Adopted dogs must be kept as indoor companions",
                  "We reserve the right to perform a home visit",
                ].map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Adoption Fees */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Dog Adoption Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 font-medium">Puppy (6 months or younger)</td>
                      <td className="py-3 text-right font-bold text-primary">$300</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Adult Dog (6 months or older)</td>
                      <td className="py-3 text-right font-bold text-primary">$180</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Senior Dog (8 years+)</td>
                      <td className="py-3 text-right font-bold text-primary">$90</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Bonded Pair Discount</td>
                      <td className="py-3 text-right font-bold text-primary">½ off 2nd dog</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {[
                    "Vet-checked and healthy",
                    "Fully vaccinated",
                    "Spayed/neutered",
                    "Microchipped",
                    "Heartworm tested",
                    "Treated for fleas and worms",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Senior Dog & Apartment Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="bg-secondary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Senior Dog Adoption in Pittsburgh</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Senior dogs make wonderful companions! They're calm, house-trained, and grateful for a second chance. Many
                are perfectly healthy and have years of love to give.
              </p>
              <p className="text-xs text-muted-foreground">
                Learn more about our{" "}
                <Link to="/get-involved" className="text-primary hover:underline font-medium">
                  Senior to Senior Foster Program
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">Apartment-Friendly Dogs in Pittsburgh</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Many of our dogs are perfect for apartment living! Look for smaller breeds and lower-energy adults. Use
                the "Apartment-Friendly" filter above to find your match.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Adopt-a-Pet Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border-2 border-yellow-400 rounded-lg px-6 py-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <span className="font-bold">Adopt-a-Pet Gold Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
