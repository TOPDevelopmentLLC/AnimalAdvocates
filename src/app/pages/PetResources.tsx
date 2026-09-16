import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ShoppingBag, Dog, UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react";

export default function PetResources() {
  const petSupplies = [
    {
      name: "Pet Supplies Plus – Bethel Park",
      address: "5229 Library Road, Bethel Park, PA 15102",
      phone: "412-831-8986",
    },
    {
      name: "Pet People by Hollywood Feed - Greentree",
      address: "1948 Greentree Road, Pittsburgh, PA 15220",
      phone: "412-207-7580",
    },
  ];

  const trainingServices = [
    {
      name: "Parkway Pet Lodge and Training",
      address: "66 Economy Grade Road, Coraopolis, PA 15108",
      phone: "724-457-0942",
    },
    {
      name: "Animal Elegance",
      address: "2212 Noblestown Rd #106, Pittsburgh, PA 15205",
      phone: "412-361-1177"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Pittsburgh Pet Owner Resources</h1>
          <p className="text-xl text-white/90">
            Animal Advocates provides trusted local resources for Pittsburgh pet owners — pet supplies, training and
            grooming services, and our Pet Food Pantry program for those in need.
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
            <h2 className="text-3xl font-bold">Pet Supplies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {petSupplies.map((store, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{store.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="text-primary hover:underline">
                        {store.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Training, Daycare and Grooming */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Dog className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Training, Daycare and Grooming Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingServices.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{service.name}</h3>
                  <div className="space-y-2">
                    {service.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{service.address}</span>
                      </div>
                    )}
                    {/* {service.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                        <a href={`mailto:${service.email}`} className="text-primary hover:underline">
                          {service.email}
                        </a>
                      </div>
                    )} */}
                    {
                      service.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                          <a href={`tel:${service.phone}`} className="text-primary hover:underline">
                            {service.phone}
                          </a>
                        </div>
                      )
                    }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pet Food Pantry */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Pet Food Pantry</h2>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6">
                Through generous donations from Pet Supplies Plus in Bethel Park, Animal Advocates partners with the
                Coraopolis Community Development Corporation's Food Pantry and the West Hills Food Pantry to provide
                pet supplies to those in need.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold mb-3">Coraopolis Community Food Pantry</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Regular pantry dates: 1st and 3rd Sunday of each month
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                      <a href="mailto:info@corycdc.org" className="text-primary hover:underline">
                        info@corycdc.org
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a href="tel:412-329-8247" className="text-primary hover:underline">
                        412-329-8247
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold mb-3">West Hills Food Pantry</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Regular pantry dates: 1st and 3rd Tuesday of each month
                  </p>
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a href="tel:412-262-4930" className="text-primary hover:underline">
                        412-262-4930
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-3">How to Contribute</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  There are many ways you can contribute to the Pet Food Pantry and help local animals in need,
                  including donating supplies or providing monetary support. Items can be purchased to donate from Pet
                  Supplies Plus and deposited at the Bethel Park store.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you have questions, would like to learn how you can get involved or need assistance for your
                  animal, please contact us at{" "}
                  <a href="tel:412-928-9777" className="text-primary hover:underline">
                    412-928-9777
                  </a>{" "}
                  or{" "}
                  <a href="mailto:animaladvocatespgh294@gmail.com" className="text-primary hover:underline">
                    animaladvocatespgh294@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
