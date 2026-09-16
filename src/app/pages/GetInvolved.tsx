import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Truck, ShoppingBag, Megaphone, Calendar, CheckCircle2 } from "lucide-react";

const VALID_TABS = ["opportunities", "senior-program", "events"];

export default function GetInvolved() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(requestedTab ?? "") ? requestedTab! : "opportunities";

  const volunteerRoles = [
    {
      icon: Heart,
      title: "Foster a Cat or Dog",
      description:
        "Provide temporary in-home care for animals awaiting adoption. Ideal for families and students. We provide supplies and vet care.",
    },
    {
      icon: Truck,
      title: "Cat Caretaker & Animal Transportation",
      description:
        "Provide basic care and socialization at headquarters. Transport animals to vet appointments and between shelters/homes.",
    },
    {
      icon: ShoppingBag,
      title: "Thrift Shop Sales",
      description:
        "Staff the West End boutique, price merchandise, and welcome customers. Provides our largest single revenue source.",
    },
    {
      icon: Megaphone,
      title: "Fundraising & Outreach",
      description:
        "Plan and staff fundraisers, community outreach events, and advocacy programs to support animal welfare.",
    },
  ];

  const upcomingEvents = [
    {
      title: "Spring Adoption Event",
      date: "May 15, 2026",
      time: "11:00 AM - 3:00 PM",
      location: "PetSmart Waterworks",
      description: "Meet adoptable cats and dogs, learn about our rescue, and support Pittsburgh's animal welfare.",
    },
    {
      title: "Thrift Shop Sale",
      date: "May 22, 2026",
      time: "12:00 PM - 5:00 PM",
      location: "35 Wabash Street",
      description: "Special sale with 25% off all items. All proceeds benefit rescued animals.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Get Involved with Animal Rescue in Pittsburgh</h1>
          <p className="text-xl text-white/90">
            At the heart of Animal Advocates is our dedicated team of volunteers. With no compensated staff, the
            collective efforts of our volunteers is invaluable to saving the lives of animals in need across the
            Pittsburgh region.
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
                <h2 className="text-3xl font-bold mb-8">Volunteer Opportunities in Pittsburgh</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {volunteerRoles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{role.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{role.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold mb-3">Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    Must be 18+ or accompanied by parent/guardian
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    Complete online application and interview
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    Sign volunteer agreement and liability waiver
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    Attend orientation training at Animal Advocates headquarters
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://new.shelterluv.com/form/volunteer/AAPA/126137-volunteer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white">
                      Apply to Volunteer Now
                    </Button>
                  </a>
                </div>
              </div>

              <Card className="bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Can't Commit to a Scheduled Position?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supporters who want to help but cannot commit to a scheduled position can host supply drives,
                    donation drives, or community events.
                  </p>
                  <a href="mailto:animaladvocatespgh294@gmail.com">
                    <Button variant="outline">Contact Us to Learn More</Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Senior to Senior Foster Program */}
          <TabsContent value="senior-program">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Senior to Senior Foster Program — Pittsburgh</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our Senior to Senior Foster Program pairs senior pets with senior community
                members for fostering, helping both humans and animals thrive in their golden years. Animal Advocates
                covers vet care and supplies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits to Seniors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Companionship from a loving, calm pet",
                        "Lower-energy pets perfect for seniors",
                        "All supplies and vet care provided",
                        "No long-term commitment required",
                        "Support from our volunteer team",
                      ].map((benefit, index) => (
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
                    <CardTitle>Eligibility & How to Apply</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The program is open to Pittsburgh-area seniors who can provide a safe, loving home for a
                      senior pet. No prior pet ownership required.
                    </p>
                    <a href="mailto:animaladvocatespgh294@gmail.com">
                      <Button className="w-full">Contact Us to Apply</Button>
                    </a>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-secondary/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Cool Story: Connie & Chester</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="w-full h-48 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <span className="text-7xl">🐱</span>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground italic mb-4">
                        "Chester has brought so much joy to my life. As a senior myself, having a calm, loving
                        companion makes every day brighter. The Senior to Senior program is truly special."
                      </p>
                      <p className="text-sm font-medium">— Connie, Pittsburgh Senior Foster</p>
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
                  {upcomingEvents.map((event, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-32 h-32 bg-secondary/20 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                            <Calendar className="h-8 w-8 text-primary mb-2" />
                            <div className="text-center">
                              <div className="font-bold text-sm">{event.date.split(" ")[0]}</div>
                              <div className="text-xs text-muted-foreground">{event.date.split(" ")[1]}</div>
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
                          <div className="flex items-center">
                            <Button variant="outline">Learn More</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
