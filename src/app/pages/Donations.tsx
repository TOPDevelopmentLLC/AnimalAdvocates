import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Package, DollarSign, Gift } from "lucide-react";

export default function Donations() {
  const donationTiers = [
    { amount: 25, impact: "" },
    { amount: 50, impact: "" },
    { amount: 100, impact: "" },
    { amount: 250, impact: "" },
  ];

  const wishlistItems = [
    "Dry cat food (Cat: Purina Tender Selects or Purina One Chicken)",
    "Canned cat food (Fancy Feast or Friskies)",
    "Adult cat litter (clumping, unscented brands of clay litter)",
    "Paper towels and cleaning supplies (Rescue Brand Disinfectant, unscented dish soap and unscented laundry detergent)",
    "Pet toys and treats",
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Donate to Pittsburgh's Cat & Dog Rescue</h1>
          <p className="text-xl text-white/90">
            Every dollar goes directly to caring for rescued cats and dogs in the Pittsburgh region. As an all-volunteer organization, we have no salaries — your gift becomes vet care, vaccines, food, and forever homes.
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
              <CardTitle>Monetary Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Your financial gift directly supports veterinary care, food, shelter, and the rescue of animals in need. All donations are tax-deductible.
              </p>

              <div className="space-y-3 mb-6">
                <h3 className="font-bold">Suggested Amounts</h3>
                {donationTiers.map((tier) => (
                  <div key={tier.amount} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-bold">${tier.amount}</div>
                      <div className="text-sm text-muted-foreground">{tier.impact}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://checkout.shelterluv.com/donate/AAPA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Donate via ShelterLuv
                </Button>
              </a>

              <a
                href="https://www.paypal.com/us/fundraiser/charity/2220895"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3"
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Donate via PayPal
                </Button>
              </a>

              <a
                href="https://venmo.com/animaladvocates412"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3"
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Donate via Venmo
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Donate Supplies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                In-kind donations help us care for animals daily. Drop off supplies at our headquarters during thrift shop hours.
              </p>

              <div className="space-y-3 mb-6">
                <h3 className="font-bold">Current Wishlist</h3>
                <ul className="space-y-2">
                  {wishlistItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">Drop-off Location:</p>
                <p className="text-muted-foreground">
                  35 Wabash Street, Pittsburgh, PA 15220<br />
                  Monday-Friday: 12-3pm<br />
                  Saturday: 12-4pm
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Ways to Give */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Other Ways to Give</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Recurring Donations</h3>
                <p className="text-sm text-muted-foreground">
                  Set up a monthly gift to provide steady support for our rescue operations year-round.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Gift className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Honor & Memorial Gifts</h3>
                <p className="text-sm text-muted-foreground">
                  Make a donation in honor or memory of a loved one or beloved pet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">Amazon Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  Shop our Amazon wishlist to send supplies directly to our rescue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tax Deductible Notice */}
        <Card className="bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-3">501(c)(3) Tax-Deductible</h3>
            <p className="text-muted-foreground">
              Animal Advocates is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law. EIN available upon request.
            </p>
          </CardContent>
        </Card>

        {/* Success Story */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Your Impact</h2>
          <Card className="bg-background">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="w-full h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-9xl">🐕</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Max's Second Chance</h3>
                  <p className="text-muted-foreground mb-4">
                    "Thanks to donor support, we were able to provide Max with the emergency surgery he needed after being found injured. Today, he's thriving in his forever home with a loving family in the South Side."
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    — Animal Advocates Volunteer Team
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
