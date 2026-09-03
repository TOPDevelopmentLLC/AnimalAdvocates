import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "../../imports/animal_advocates_logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/adopt", label: "Adopt" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/thrift-shop", label: "Thrift Shop" },
    { href: "/rehoming", label: "Rehoming" },
    { href: "/resources", label: "Resources" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ImageWithFallback
              src={logo}
              alt="Animal Advocates Logo"
              className="h-24 w-24 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors hover:text-white/80 ${
                  isActive(link.href) ? "text-white font-medium" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Donate Button */}
          <div className="hidden lg:block">
            <Link to="/donate">
              <Button className="bg-white hover:bg-white/90 text-primary">Donate</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-primary z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mb-4 bg-white hover:bg-white/90 text-primary">
                Donate Now
              </Button>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
