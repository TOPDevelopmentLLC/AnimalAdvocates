import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Truck, ShoppingBag, Megaphone, Calendar, CheckCircle2 } from "lucide-react";
import { CtaLink } from "../components/TopLinks";
import { useTopContent, type BodyTextData, type HeroData, type TitleTextData } from "../lib/topContent";
import getInvolvedContent from "../../../top-content/get-involved.json";

const VALID_TABS = ["opportunities", "senior-program", "events"];

const volunteerRoles = [
  { id: "role-foster", icon: Heart },
  { id: "role-caretaker", icon: Truck },
  { id: "role-thrift", icon: ShoppingBag },
  { id: "role-fundraising", icon: Megaphone },
];

export default function GetInvolved() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(requestedTab ?? "") ? requestedTab! : "opportunities";

  const { section } = useTopContent("get-involved", getInvolvedContent);
  const hero = section<HeroData>("hero");
  const opportunities = section<BodyTextData>("opportunities");
  const requirements = section<BodyTextData>("requirements");
  const cantCommit = section<TitleTextData>("cant-commit");
  const seniorProgram = section<BodyTextData>("senior-program");
  const seniorBenefits = section<BodyTextData>("senior-benefits");
  const seniorEligibility = section<TitleTextData>("senior-eligibility");
  const seniorStory = section<BodyTextData>("senior-story");
  const [storyQuote, storyAttribution] = seniorStory.paragraphs ?? [];

  // Events tab copy stays here until events come from the TOP Events service.
  const upcomingEvents = [
    {
      title: "Hauntingly Handmade: Black Cat Silhouette Workshop",
      date: "October 18, 2026",
      time: "2:00 PM - 3:30 PM",
      location: "35 Wabash Street, Pittsburgh, PA 15220",
      description:
        "Feeling creative? Want to embrace the spooky season? Swing by to make your own spooky cat decor with us! Register by scanning the QR code on our event flyer.",
    },
    {
      title: "Cat Open House",
      date: "October 31, 2026",
      time: "12:00 PM - 4:00 PM",
      location: "35 Wabash Street, Pittsburgh, PA 15220",
      description:
        "Come visit with our adorable, adoptable cats! A flight of stairs is required to reach the cats, and any children under 18 must be accompanied by an adult. We will also have a sale, so save some time to browse our thrift shop!",
    },
    {
      title: "Super Sale & Cat Open House",
      date: "November 28, 2026",
      time: "12:00 PM - 4:00 PM",
      location: "35 Wabash Street, Pittsburgh, PA 15220",
      description:
        "Come visit with our cats and enjoy our Super Sale, with items half off for Small Business Saturday!",
    },
    {
      title: "Handmade for the Holidays: A Cat-Themed Wrapping Paper Workshop",
      date: "December 12, 2026",
      time: "6:00 PM - 7:30 PM",
      location: "35 Wabash Street, Pittsburgh, PA 15220",
      description: "Hand craft some gift wrap with cute cat themes for the holidays! Tickets are $10.",
    },
  ];

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
        <Tabs
          value={activeTab}
          onValueChange={(value) => setSearchParams(value === "opportunities" ? {} : { tab: value })}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-1 lg:grid-cols-[repeat(3,minmax(0,1fr))] gap-1.5 h-auto mb-12 border-2 border-border bg-muted p-1.5 [&_[data-state=active]]:bg-primary [&_[data-state=active]]:text-white [&>*]:w-full">
            <TabsTrigger value="opportunities">Volunteer Opportunities</TabsTrigger>
            <TabsTrigger value="senior-program">Senior to Senior</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Tab 1: Volunteer Opportunities */}
          <TabsContent value="opportunities">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">{opportunities.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {volunteerRoles.map(({ id, icon: Icon }) => {
                  const role = section<TitleTextData>(id);
                  return (
                    <Card key={id}>
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{role.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{role.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold mb-3">{requirements.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {requirements.items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {requirements.ctas?.map((cta) => (
                    <CtaLink key={cta.href} href={cta.href}>
                      <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white">
                        {cta.label}
                      </Button>
                    </CtaLink>
                  ))}
                </div>
              </div>

              <Card className="bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">{cantCommit.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {cantCommit.text}
                  </p>
                  {cantCommit.ctas?.map((cta) => (
                    <CtaLink key={cta.href} href={cta.href}>
                      <Button variant="outline">{cta.label}</Button>
                    </CtaLink>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Senior to Senior Foster Program */}
          <TabsContent value="senior-program">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{seniorProgram.title}</h2>
              {seniorProgram.paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-8">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{seniorBenefits.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {seniorBenefits.items?.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{seniorEligibility.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {seniorEligibility.text}
                    </p>
                    {seniorEligibility.ctas?.map((cta) => (
                      <CtaLink key={cta.href} href={cta.href}>
                        <Button className="w-full">{cta.label}</Button>
                      </CtaLink>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-secondary/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">{seniorStory.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="w-full h-48 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <span className="text-7xl">🐱</span>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground italic mb-4">
                        {storyQuote}
                      </p>
                      <p className="text-sm font-medium">{storyAttribution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3: Events */}
          <TabsContent value="events">
            <div>
              <h2 className="text-3xl font-bold mb-6">Upcoming Events for Animal Advocates</h2>

              {upcomingEvents.length > 0 ? (
                <div className="space-y-6 mb-12">
                  {upcomingEvents.map((event, index) => {
                    const [month, dayWithComma] = event.date.split(" ");
                    const day = dayWithComma.replace(",", "");
                    return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-32 h-32 bg-secondary/20 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                            <Calendar className="h-8 w-8 text-primary mb-2" />
                            <div className="text-center">
                              <div className="font-bold text-2xl leading-none">{day}</div>
                              <div className="text-xs text-muted-foreground mt-1">{month}</div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <div className="text-sm text-muted-foreground mb-2">
                              <strong>Time:</strong> {event.time}
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                              <strong>Location:</strong> {event.location}
                            </div>
                            <p className="text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="mb-12">
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">No Upcoming Events</h3>
                    <p className="text-muted-foreground mb-6">
                      Check back soon for upcoming Pittsburgh adoption events and fundraisers, or follow us on social
                      media for the latest updates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://facebook.com/animaladvocatespgh"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline">Follow on Facebook</Button>
                      </a>
                      <a
                        href="https://instagram.com/weareanimaladvocates"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline">Follow on Instagram</Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Join our mailing list to receive event notifications, adoption updates, and rescue stories from
                  Animal Advocates.
                </p>
                <Button className="bg-accent hover:bg-accent/90">Join Mailing List</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
