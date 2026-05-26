import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function AdoptBoth() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    "Cats",
    "Dogs",
    "Kitten",
    "Puppy",
    "Adult",
    "Senior",
    "Small",
    "Medium",
    "Large",
    "Bonded Pairs",
    "Special Needs",
    "Good with Kids",
    "Good with Other Pets",
    "Apartment-Friendly",
  ];

  const pets = [
    {
      name: "Luna",
      species: "Cat",
      age: "2 years",
      sex: "Female",
      breed: "Domestic Shorthair",
      personality: "Sweet, playful, loves cuddles",
      tags: ["Cats", "Adult", "Good with Kids"],
    },
    {
      name: "Max",
      species: "Dog",
      age: "4 years",
      sex: "Male",
      breed: "Labrador Mix",
      size: "Large",
      personality: "Friendly, loves walks and fetch",
      tags: ["Dogs", "Adult", "Large", "Good with Kids"],
    },
    {
      name: "Oliver",
      species: "Cat",
      age: "6 months",
      sex: "Male",
      breed: "Tabby",
      personality: "Energetic kitten, very social",
      tags: ["Cats", "Kitten", "Good with Other Pets"],
    },
    {
      name: "Bella",
      species: "Dog",
      age: "3 years",
      sex: "Female",
      breed: "Beagle",
      size: "Medium",
      personality: "Sweet, gentle, loves cuddles",
      tags: ["Dogs", "Adult", "Medium", "Apartment-Friendly"],
    },
    {
      name: "Whiskers",
      species: "Cat",
      age: "12 years",
      sex: "Male",
      breed: "Domestic Longhair",
      personality: "Calm, gentle senior cat",
      tags: ["Cats", "Senior", "Adult"],
    },
    {
      name: "Rocky",
      species: "Dog",
      age: "5 months",
      sex: "Male",
      breed: "Shepherd Mix",
      size: "Medium",
      personality: "Playful puppy, very energetic",
      tags: ["Dogs", "Puppy", "Medium"],
    },
  ];

  const filteredPets =
    selectedFilters.length === 0
      ? pets
      : pets.filter((pet) => selectedFilters.some((filter) => pet.tags.includes(filter)));

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Adopt a Cat or Dog in Pittsburgh</h1>
          <p className="text-xl text-white/90">
            Browse all our adoptable cats and dogs. Thank you for considering a rescue pet from Animal Advocates!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <Link to="/adopt/cats">
            <Button variant="outline">View Cats Only</Button>
          </Link>
          <Link to="/adopt/dogs">
            <Button variant="outline">View Dogs Only</Button>
          </Link>
        </div>

        {/* Available Pets Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">All Available Pets for Adoption in Pittsburgh</h2>

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

          {/* Pet Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPets.map((pet, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="w-full aspect-square bg-secondary/20 flex items-center justify-center relative">
                    <span className="text-6xl">{pet.species === "Cat" ? "🐱" : "🐕"}</span>
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                      {pet.species}
                    </Badge>
                  </div>
                  <Link to={`/adopt/${pet.species.toLowerCase()}s`}>
                    <div className="p-3 text-center">
                      <h3 className="font-bold text-primary hover:underline cursor-pointer mb-1">
                        {pet.name}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {pet.age}<br />
                        {pet.sex}<br />
                        {pet.breed}
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No pets match your selected filters. Try adjusting your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Adoption Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Cat Adoption Application</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ready to adopt a cat? Submit your application to get started.
              </p>
              <a
                href="https://new.shelterluv.com/matchme/adopt/AAPA/Cat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Apply for Cat Adoption
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Dog Adoption Application</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ready to adopt a dog? Submit your application to get started.
              </p>
              <a
                href="https://new.shelterluv.com/matchme/adopt/AAPA/Dog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Apply for Dog Adoption
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
