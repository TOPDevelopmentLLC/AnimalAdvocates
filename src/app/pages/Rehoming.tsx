import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

export default function Rehoming() {

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Assistance Rehoming an Animal</h1>
          <p className="text-xl text-white/90">
            Animal Advocates is committed to helping animals in need while maintaining our no-kill tradition. Learn
            about our rehoming assistance and courtesy posting services.
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
                  <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                  <p className="text-muted-foreground mb-4">
                    It is our goal to admit and place as many animals as possible while staying true to our no-kill
                    tradition. No animal is euthanized unless it suffers from end-stage terminal illness. All of our
                    admissions must be scheduled in advance.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    If an animal adopted from Animal Advocates needs rehoming assistance, please contact us at{" "}
                    <a
                      href="mailto:animaladvocatespgh294@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      animaladvocatespgh294@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Animal Advocates receives far more intake requests than can be accepted. If space is available, or
                      we are able to assist with a courtesy posting or other resources, a volunteer will respond to you
                      by email or phone. Please be patient. Animal Advocates is an all volunteer organization and all
                      aspects of the rescue are managed by individuals who donate their time.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      While not required for admission, donations are welcomed to help us meet the needs of all the
                      animals entrusted in the care of Animal Advocates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courtesy Post Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Courtesy Post Information</h2>
          <Card className="mb-6">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6">
                In order to help as many animals as possible, Animal Advocates provides courtesy postings for adoptable
                cats and dogs. Courtesy posts include animals that are not directly associated with or surrendered to
                Animal Advocates, but are still in need of new homes. For these animals, we offer advertisement on our
                website for greater exposure.
              </p>

              <div className="bg-accent/10 p-6 rounded-lg">
                <h3 className="font-bold mb-4">
                  For any animal identified as a "Courtesy Post," read the following information:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Unless specifically indicated, Animal Advocates will not handle any part of the adoption process or
                      collect an adoption contract or fee for the animal.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      Animal Advocates assumes no liability, financial, or legal responsibility for said animals.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      The owner will screen all applicants. Contact information will be shared with the private individual
                      in order to facilitate direct communication between potential adopters and the current owner of the
                      animal.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Request a Courtesy Post
            </Button>
          </Link>
        </div>

        {/* Other Resources */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Other Resources</h2>
          <p className="text-muted-foreground mb-6">
            Please use the links below for other resources and support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Rehome by Adopt-a-Pet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Free service to help you safely rehome your pet directly to a new adopter.
                </p>
                <a
                  href="https://rehome.adoptapet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Visit Rehome
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Petfinder Shelter Search</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find animal shelters and rescues in your area for additional rehoming resources.
                </p>
                <a
                  href="https://www.petfinder.com/animal-shelters-and-rescues/search/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Search Shelters
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
