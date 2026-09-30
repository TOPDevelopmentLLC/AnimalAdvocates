import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../components/ui/carousel";
import { useAnimalsContext } from "../lib/AnimalsContext";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function PetProfile() {
  const { id } = useParams<{ id: string }>();
  const { all, loading, error } = useAnimalsContext();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pet = all.find((a) => a.id === id);

  const applyUrl =
    pet?.type === "Dog"
      ? "https://new.shelterluv.com/matchme/adopt/AAPA/Dog"
      : "https://new.shelterluv.com/matchme/adopt/AAPA/Cat";

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
    setSelectedIndex(index);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="w-full aspect-square rounded-lg mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-8">{error}</p>
          <Link to="/adopt">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Back to Adoptable Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-9xl mb-6">🐾</div>
          <h1 className="text-4xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            This pet may have already found their forever home, or the link may be out of date.
          </p>
          <Link to="/adopt">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Browse Adoptable Pets
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const photos = pet.photos.length > 0 ? pet.photos : [pet.coverPhoto].filter(Boolean);
  const backTo = `/adopt/${pet.type.toLowerCase()}s`;

  return (
    <div className="flex flex-col">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header: back button pinned left, name/tags centered */}
        <div className="relative flex flex-col items-center text-center mb-8">
          <Link
            to={backTo}
            className="absolute left-0 top-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {pet.type === "Dog" ? "Dogs" : "Cats"}
          </Link>

          <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
          <p className="text-muted-foreground mb-4">
            {pet.breed} · {pet.age} · {pet.sex}
          </p>

          {pet.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {pet.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Photo gallery */}
        <div className="mb-8">
          {photos.length > 0 ? (
            <>
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {photos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="w-full aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={photo}
                          alt={`${pet.name} photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {photos.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>

              {photos.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedIndex === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`${pet.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full aspect-square bg-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-8xl">{pet.type === "Dog" ? "🐕" : "🐱"}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {pet.description && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {pet.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Apply CTA */}
        <a href={applyUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
            Apply to Adopt {pet.name}
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  );
}
