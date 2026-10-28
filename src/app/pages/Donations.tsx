import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Package, DollarSign, Gift } from "lucide-react";
import { CtaLink } from "../components/TopLinks";
import { useTopContent, type BodyTextData, type HeroData, type TitleTextData } from "../lib/topContent";
import donateContent from "../../../top-content/donate.json";

const otherWays = [
  { id: "give-recurring", icon: DollarSign },
  { id: "give-honor", icon: Gift },
  { id: "give-amazon", icon: Package },
];

export default function Donations() {
  const { section } = useTopContent("donate", donateContent);
  const hero = section<HeroData>("hero");
  const monetary = section<BodyTextData>("monetary");
  const amounts = section<BodyTextData>("suggested-amounts");
  const supplies = section<BodyTextData>("supplies");
  const wishlist = section<BodyTextData>("wishlist");
  const dropOff = section<BodyTextData>("drop-off");
  const otherWaysHeading = section<BodyTextData>("other-ways");
  const taxDeductible = section<TitleTextData>("tax-deductible");
  const impact = section<BodyTextData>("impact");
  const story = section<BodyTextData>("impact-story");
  const [storyQuote, storyAttribution] = story.paragraphs ?? [];

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
        {/* Main Donation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>{monetary.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {monetary.paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}

              <div className="space-y-3 mb-6">
                <h3 className="font-bold">{amounts.title}</h3>
                {amounts.items?.map((amount) => (
                  <div key={amount} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-bold">{amount}</div>
                    </div>
                  </div>
                ))}
              </div>

              {monetary.ctas?.map((cta, index) => (
                <CtaLink key={cta.href} href={cta.href} className={index === 0 ? undefined : "block mt-3"}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                    {cta.label}
                  </Button>
                </CtaLink>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{supplies.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {supplies.paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}

              <div className="space-y-3 mb-6">
                <h3 className="font-bold">{wishlist.title}</h3>
                <ul className="space-y-2">
                  {wishlist.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary leading-tight">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {wishlist.ctas?.map((cta) => (
                    <CtaLink key={cta.href} href={cta.href} className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                        {cta.label}
                      </Button>
                    </CtaLink>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">{dropOff.title}</p>
                <p className="text-muted-foreground">
                  {dropOff.items?.map((line, index) => (
                    <span key={index}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Ways to Give */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{otherWaysHeading.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherWays.map(({ id, icon: Icon }) => {
              const way = section<TitleTextData>(id);
              return (
                <Card key={id}>
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold mb-2">{way.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {way.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tax Deductible Notice */}
        <Card className="bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-3">{taxDeductible.title}</h3>
            <p className="text-muted-foreground">
              {taxDeductible.text}
            </p>
          </CardContent>
        </Card>

        {/* Success Story */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{impact.title}</h2>
          <Card className="bg-background">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="w-full h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-9xl">🐕</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {storyQuote}
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    {storyAttribution}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
