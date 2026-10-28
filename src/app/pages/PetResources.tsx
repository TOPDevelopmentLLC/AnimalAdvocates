import { Card, CardContent } from "../components/ui/card";
import { ShoppingBag, Dog, UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react";
import { CtaLink, LinkedText } from "../components/TopLinks";
import { useTopContent, type BodyTextData, type HeroData, type TitleTextData } from "../lib/topContent";
import resourcesContent from "../../../top-content/resources.json";

const supplyIds = ["supplies-petsuppliesplus", "supplies-petpeople"];
const trainingIds = ["training-parkway", "training-animal-elegance"];
const pantryIds = ["pantry-coraopolis", "pantry-west-hills", "pantry-shim"];

/** A store or service card: name, address, and phone link. */
function PlaceCard({ place }: { place: TitleTextData }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-4">{place.title}</h3>
        <div className="space-y-2">
          {place.text && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{place.text}</span>
            </div>
          )}
          {place.ctas?.map((cta) => (
            <div key={cta.href} className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              <CtaLink href={cta.href} className="text-primary hover:underline">
                {cta.label}
              </CtaLink>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PetResources() {
  const { section } = useTopContent("resources", resourcesContent);
  const hero = section<HeroData>("hero");
  const petSupplies = section<BodyTextData>("pet-supplies");
  const training = section<BodyTextData>("training");
  const foodPantry = section<BodyTextData>("food-pantry");
  const howToContribute = section<BodyTextData>("how-to-contribute");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl text-white/90">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Pet Supplies */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{petSupplies.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplyIds.map((id) => (
              <PlaceCard key={id} place={section<TitleTextData>(id)} />
            ))}
          </div>
        </div>

        {/* Training, Daycare and Grooming */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Dog className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{training.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingIds.map((id) => (
              <PlaceCard key={id} place={section<TitleTextData>(id)} />
            ))}
          </div>
        </div>

        {/* Pet Food Pantry */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{foodPantry.title}</h2>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              {foodPantry.paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {pantryIds.map((id) => {
                  const pantry = section<TitleTextData>(id);
                  const links = pantry.ctas ?? [];
                  return (
                    <div key={id} className="bg-white p-4 rounded-lg">
                      <h3 className="font-bold mb-3">{pantry.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {pantry.text}
                      </p>
                      <div className={links.length > 1 ? "space-y-1 text-sm" : "text-sm"}>
                        {links.map((cta) => {
                          const Icon = cta.href.startsWith("mailto:") ? Mail : Phone;
                          return (
                            <div key={cta.href} className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                              <CtaLink href={cta.href} className="text-primary hover:underline">
                                {cta.label}
                              </CtaLink>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-3">{howToContribute.title}</h3>
                {howToContribute.paragraphs?.map((paragraph, index, all) => (
                  <p
                    key={index}
                    className={index < all.length - 1 ? "text-sm text-muted-foreground mb-4" : "text-sm text-muted-foreground"}
                  >
                    <LinkedText
                      text={paragraph}
                      links={howToContribute.ctas}
                      linkClassName="text-primary hover:underline"
                    />
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
