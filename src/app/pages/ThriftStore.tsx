import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Clock, ShoppingBag, ExternalLink } from "lucide-react";
import { CtaLink, LinkedText } from "../components/TopLinks";
import { useTopContent, type BodyTextData, type HeroData } from "../lib/topContent";
import thriftContent from "../../../top-content/thrift-shop.json";

/** Splits "Monday: 12:00 PM - 3:00 PM" into its day and hours. */
function splitHours(line: string) {
  const at = line.indexOf(": ");
  return at === -1 ? { day: line, hours: "" } : { day: line.slice(0, at), hours: line.slice(at + 2) };
}

/** Bolds a leading "Note:" the way the page always has. */
function NoteText({ text }: { text: string }) {
  if (!text.startsWith("Note:")) return <>{text}</>;
  return (
    <>
      <strong>Note:</strong>
      {text.slice("Note:".length)}
    </>
  );
}

export default function ThriftStore() {
  const { section } = useTopContent("thrift-shop", thriftContent);
  const hero = section<HeroData>("hero");
  const hours = section<BodyTextData>("hours");
  const location = section<BodyTextData>("location");
  const donateItems = section<BodyTextData>("donate-items");
  const accepted = section<BodyTextData>("accepted");
  const notAccepted = section<BodyTextData>("not-accepted");
  const donationInfo = section<BodyTextData>("donation-info");
  const [shopName, ...addressLines] = location.items ?? [];
  const neighborhood = addressLines.pop();

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
        {/* Hours and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{hours.title}</h2>
              <div className="space-y-2">
                {(hours.items ?? []).map(splitHours).map((item) => (
                  <div key={item.day} className="flex justify-between py-2 border-b last:border-0">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>
              {hours.paragraphs?.map((paragraph, index) => (
                <div key={index} className="mt-4 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <NoteText text={paragraph} />
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{location.title}</h2>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="font-medium text-lg">{shopName}</p>
                  {addressLines.map((line, index) => (
                    <p key={index} className="text-muted-foreground">{line}</p>
                  ))}
                  {neighborhood && <p className="text-muted-foreground mt-2">{neighborhood}</p>}
                </div>
              </div>
              <iframe
                title="Map to Animal Advocates Thrift Shop"
                src="https://maps.google.com/maps?q=35%20Wabash%20Street%2C%20Pittsburgh%2C%20PA%2015220&z=15&output=embed"
                className="w-full h-48 rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {location.ctas?.map((cta) => (
                <CtaLink
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                >
                  {cta.label}
                  <ExternalLink className="h-4 w-4" />
                </CtaLink>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Shop Online */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Shop Online</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our volunteers run two specialty online shops featuring vintage and designer clothing, accessories,
            collectibles, and specialty items. 100% of proceeds support Animal Advocates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Shop on Depop</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Browse our curated collection of vintage and designer items on Depop.
                </p>
                <a href="https://www.depop.com/aacatcuddles1/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    Visit Depop Shop
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Shop on Poshmark</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Discover unique finds and fashion items on our Poshmark closet.
                </p>
                <a href="https://poshmark.com/closet/jidscloset" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    Visit Poshmark Shop
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div> */}

        {/* Donation Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{donateItems.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">{accepted.title}</h3>
                <ul className="space-y-2">
                  {accepted.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-red-800">{notAccepted.title}</h3>
                <ul className="space-y-2">
                  {notAccepted.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-accent/10">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">{donationInfo.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {donationInfo.items?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      <LinkedText
                        text={item}
                        links={donationInfo.ctas}
                        linkClassName="text-primary hover:underline font-medium"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Shop Interior & Featured Items — hidden for now, to be brought back in a future epic.
        <div>
          <h2 className="text-3xl font-bold mb-6">Shop Interior & Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-full h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
