import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { CtaLink, LinkedText } from "../components/TopLinks";
import { useTopContent, type BodyTextData, type HeroData, type TitleTextData } from "../lib/topContent";
import rehomingContent from "../../../top-content/rehoming.json";

const resourceIds = ["resource-adoptapet", "resource-petfinder"];

export default function Rehoming() {
  const { section } = useTopContent("rehoming", rehomingContent);
  const hero = section<HeroData>("hero");
  const commitment = section<BodyTextData>("commitment");
  const intakeNotice = section<BodyTextData>("intake-notice");
  const otherResources = section<BodyTextData>("other-resources");
  const [intakeFirst, ...intakeRest] = intakeNotice.paragraphs ?? [];

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
        {/* Main Information */}
        <div className="mb-16">
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">{commitment.title}</h2>
                  {commitment.paragraphs?.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4">
                      <LinkedText
                        text={paragraph}
                        links={commitment.ctas}
                        linkClassName="text-primary hover:underline font-medium"
                      />
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {intakeFirst}
                    </p>
                    {intakeRest.map((paragraph, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Resources */}
        <div>
          <h2 className="text-3xl font-bold mb-6">{otherResources.title}</h2>
          {otherResources.paragraphs?.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground mb-6">
              {paragraph}
            </p>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resourceIds.map((id) => {
              const resource = section<TitleTextData>(id);
              return (
                <Card key={id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.text}
                    </p>
                    {resource.ctas?.map((cta) => (
                      <CtaLink
                        key={cta.href}
                        href={cta.href}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        {cta.label}
                        <ExternalLink className="h-4 w-4" />
                      </CtaLink>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
