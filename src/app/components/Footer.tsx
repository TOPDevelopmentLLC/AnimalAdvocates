import { Link } from "react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "../../imports/animal_advocates_logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <ImageWithFallback
              src={logo}
              alt="Animal Advocates Logo"
              className="h-24 w-48 object-contain"
            />
            <p className="text-sm text-white/80">
              Pittsburgh's volunteer-run, no-kill cat and dog rescue serving the Pittsburgh community and surrounding areas for over 40 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/adopt/cats" className="text-white/80 hover:text-white transition-colors">
                  Adopt a Cat
                </Link>
              </li>
              <li>
                <Link to="/adopt/dogs" className="text-white/80 hover:text-white transition-colors">
                  Adopt a Dog
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-white/80 hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-white/80 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/thrift-shop" className="text-white/80 hover:text-white transition-colors">
                  Thrift Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rehoming" className="text-white/80 hover:text-white transition-colors">
                  Rehoming a Pet
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/80 hover:text-white transition-colors">
                  Pet Resources
                </Link>
              </li>
              {/* <li>
                <Link to="/news" className="text-white/80 hover:text-white transition-colors">
                  News & Stories
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  35 Wabash Street<br />
                  Pittsburgh, PA 15220
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:412-928-9777" className="text-white/80 hover:text-white transition-colors">
                  412-928-9777
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:animaladvocatespgh294@gmail.com"
                  className="text-white/80 hover:text-white transition-colors break-all"
                >
                  animaladvocatespgh294@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com/animaladvocatespgh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/weareanimaladvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-sm text-white/80 text-center">
          <p>
            Animal Advocates is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Animal Advocates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
