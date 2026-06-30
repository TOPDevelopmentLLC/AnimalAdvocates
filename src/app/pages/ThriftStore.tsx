import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Clock, ShoppingBag, ExternalLink } from "lucide-react";

export default function ThriftStore() {
  const acceptedItems = [
    "Gently-used women's clothing",
    "Jewelry and accessories",
    "Pet items and supplies",
    "Collectibles and vintage items",
    "Themed decorations",
    "Small appliances",
    "Kitchenware and housewares",
  ];

  const notAcceptedItems = [
    "Large appliances and furniture",
    "Computers and printers",
    "Books, magazines, DVDs, CDs, cassette tapes",
    "Broken, stained, or torn items",
    "Items missing parts",
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Pittsburgh Animal Rescue Thrift Shop</h1>
          <p className="text-xl text-white/90">
            Whether you're looking for a one-of-a-kind collectible, gently-used clothing, housewares, or pet products,
            support Pittsburgh's animal rescue by shopping our resale boutique. 100% of sales benefit the rescue and care
            of animals in need.
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
              <h2 className="text-2xl font-bold mb-4">Shop Hours</h2>
              <div className="space-y-2">
                {[
                  { day: "Monday", hours: "12:00 PM - 3:00 PM" },
                  { day: "Tuesday", hours: "12:00 PM - 3:00 PM" },
                  { day: "Wednesday", hours: "12:00 PM - 3:00 PM" },
                  { day: "Thursday", hours: "12:00 PM - 3:00 PM" },
                  { day: "Friday", hours: "12:00 PM - 3:00 PM" },
                  { day: "Saturday", hours: "12:00 PM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between py-2 border-b last:border-0">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> These hours are for the Thrift Shop only. All animal meet-and-greets are by
                  appointment. Check Facebook or join our mailing list for sale dates and hours updates.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="font-medium text-lg">Animal Advocates Thrift Shop</p>
                  <p className="text-muted-foreground">35 Wabash Street</p>
                  <p className="text-muted-foreground">Pittsburgh, PA 15220</p>
                  <p className="text-muted-foreground mt-2">West End neighborhood</p>
                </div>
              </div>
              <div className="w-full h-48 bg-secondary/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-primary" />
                <span className="ml-2 text-muted-foreground">Map placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shop Online */}
        <div className="mb-16">
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
                <a href="https://www.depop.com/aacatcuddles/" target="_blank" rel="noopener noreferrer">
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
                <a href="https://poshmark.com/closet/aacatcuddles" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    Visit Poshmark Shop
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Donation Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Donate Items to Our Thrift Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-green-800">✓ Accepted Donations</h3>
                <ul className="space-y-2">
                  {acceptedItems.map((item, index) => (
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
                <h3 className="font-bold text-lg mb-4 text-red-800">✗ Not Accepted</h3>
                <ul className="space-y-2">
                  {notAcceptedItems.map((item, index) => (
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
              <h3 className="font-bold mb-3">Important Donation Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    All larger donations require an appointment. Call{" "}
                    <a href="tel:412-928-9777" className="text-primary hover:underline font-medium">
                      412-928-9777
                    </a>{" "}
                    during open hours.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>All donations are tax-deductible (501(c)(3)).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Drop-off during thrift shop hours at 35 Wabash Street, Pittsburgh, PA 15220.</span>
                </li>
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
