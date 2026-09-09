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

export default function CatAdoption() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { animals: cats, loading, error } = useAnimals("Cat");

  const filters = [
    "Kitten",
    "Adult",
    "Senior",
    "Special Needs",
    "Litter Box Trained",
    "Good with Kids",
    "Good with Cats",
    "Good with Dogs",
  ];

  const filteredCats =
    selectedFilters.length === 0
      ? cats
      : cats.filter((cat) => selectedFilters.some((filter) => cat.tags.includes(filter)));

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const faqs = [
    {
      question: "How long does the cat adoption process take?",
      answer:
        "The adoption process typically takes 3-7 days. After submitting your application, we'll review it and schedule an interview. If approved, we'll arrange a meet-and-greet with your chosen cat.",
    },
    {
      question: "Can I adopt a cat if I rent my home?",
      answer:
        "Yes! We require rental tenants to provide landlord authorization in their lease and landlord contact information during the application process.",
    },
    {
      question: "Do you adopt outside of the Pittsburgh area?",
      answer:
        "We primarily serve the Pittsburgh community and surrounding areas. Adoptions outside this area are considered on a case-by-case basis.",
    },
    {
      question: "What if my new cat doesn't get along with my current pet?",
      answer:
        "We provide lifetime support and will work with you to address any behavioral issues. In rare cases where it's not a good fit, we'll help facilitate a return or rehoming.",
    },
    {
      question: "Are your cats indoor-only?",
      answer:
        "Yes, all adopted cats must be kept as indoor companions for their safety and wellbeing.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Adopt a Cat in Pittsburgh</h1>
          <p className="text-xl text-white/90">
            Thank you for considering a rescue cat from Animal Advocates! We've been matching Pittsburgh families with
            loving, vetted cats and kittens since 1984. Our volunteers get to know each cat's personality and needs very
            well, striving to make the best possible match for both animals and adopters in the Pittsburgh region.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <a
            href="https://new.shelterluv.com/matchme/adopt/AAPA/Cat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Submit Cat Adoption Application
            </Button>
          </a>
          <Link to="/adopt/dogs">
            <Button size="lg" variant="outline">
              Looking for a dog instead? →
            </Button>
          </Link>
        </div>

        {/* Available Cats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cats and Kittens Available for Adoption in Pittsburgh</h2>

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

          {/* Cat Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCats.map((cat) => (
                <Card key={cat.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center">
                      {cat.coverPhoto ? (
                        <ImageWithFallback
                          src={cat.coverPhoto}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl">🐱</span>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-bold text-primary hover:underline cursor-pointer mb-1">
                        {cat.name}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {cat.age}<br />
                        {cat.sex}<br />
                        {cat.breed}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && filteredCats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {cats.length === 0
                  ? "We don't have any cats available for adoption right now. Please check back soon!"
                  : "No cats match your selected filters. Try adjusting your criteria."}
              </p>
            </div>
          )}
        </div>

        {/* Why Adopt From Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pittsburgh's Trusted No-Kill Cat Rescue Since 1984
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Foster-Home Raised</h3>
              <p className="text-sm text-muted-foreground">
                Our cats are socialized in real homes, not cages, so they're ready for family life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fully Vetted</h3>
              <p className="text-sm text-muted-foreground">
                All cats are vaccinated, spayed/neutered, microchipped, FIV/FeLV tested, and treated for fleas and worms.
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
          <h2 className="text-3xl font-bold mb-6">Cat Adoption Guidelines</h2>
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
                  "Adopted cats must be kept as indoor companions",
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
          <h2 className="text-3xl font-bold mb-6">Cat Adoption Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <table className="w-full">
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 font-medium">Kitten (1 year or younger)</td>
                      <td className="py-3 text-right font-bold text-primary">$125</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Adult Cat (1 year or older)</td>
                      <td className="py-3 text-right font-bold text-primary">$100</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Senior Cat (10 years+)</td>
                      <td className="py-3 text-right font-bold text-primary">$60</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Bonded Pair Discount</td>
                      <td className="py-3 text-right font-bold text-primary">½ off 2nd cat</td>
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
                    "FIV/FeLV tested",
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

        {/* Senior Cat Callout */}
        <Card className="mb-16 bg-secondary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Senior Cat Adoption in Pittsburgh</h2>
            <p className="text-muted-foreground mb-4">
              Senior cats make wonderful companions! They're calm, affectionate, and grateful for a second chance at a
              loving home. Many are perfectly healthy and have years of love to give. Consider giving a senior cat their
              golden years in comfort.
            </p>
            <p className="text-sm text-muted-foreground">
              Older adopters interested in fostering rather than adopting can learn more about our{" "}
              <Link to="/get-involved" className="text-primary hover:underline font-medium">
                Senior to Senior Foster Program
              </Link>
              .
            </p>
          </CardContent>
        </Card>

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
