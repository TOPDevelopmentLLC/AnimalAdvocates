import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ExternalLink, Send } from "lucide-react";

// Proxies to https://api.thatoneprogrammer.dev/api/v1/email/send, injecting
// the required X-API-KEY server-side so the browser never sees it.
const EMAIL_ENDPOINT = "https://kw5f3ncvonsdcfuupoclag5itu0hbgjv.lambda-url.us-east-1.on.aws/";

const SUBJECT_LABELS: Record<string, string> = {
  adoption: "Adoption Inquiry",
  volunteer: "Volunteer Inquiry",
  donation: "Donation Inquiry",
  rehoming: "Rehoming Inquiry",
  thrift: "Thrift Shop Inquiry",
  general: "General Inquiry",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationName: "AnimalAdvocates",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: SUBJECT_LABELS[formData.subject] ?? formData.subject,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error(`Email request failed (${res.status})`);
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Contact Animal Advocates Pittsburgh</h1>
          <p className="text-xl text-white/90">
            Have questions about adoption, volunteering, or our rescue? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <Card className="mb-6">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      35 Wabash Street<br />
                      PO Box 8480<br />
                      Pittsburgh, PA 15220
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href="tel:412-928-9777" className="text-sm text-primary hover:underline">
                      412-928-9777
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a
                      href="mailto:animaladvocatespgh294@gmail.com"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      animaladvocatespgh294@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Newsletter</h3>
                    <a
                      href="https://animaladvocates.us3.list-manage.com/subscribe?u=96c7d0868cf5fd024c6055a3d&id=4c3cbf2206"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Sign up for our newsletter
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Thrift Shop Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 12:00 PM - 3:00 PM<br />
                      Sat: 12:00 PM - 4:00 PM<br />
                      Sun: Closed
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Adoptions by appointment only
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-bold mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com/animaladvocatespgh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Facebook className="h-4 w-4" />
                      @animaladvocatespgh
                    </a>
                    <a
                      href="https://instagram.com/weareanimaladvocates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Instagram className="h-4 w-4" />
                      @weareanimaladvocates
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <div>
              <iframe
                title="Map to Animal Advocates"
                src="https://maps.google.com/maps?q=35%20Wabash%20Street%2C%20Pittsburgh%2C%20PA%2015220&z=15&output=embed"
                className="w-full h-64 rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href="https://maps.google.com/maps?q=35%20Wabash%20Street%2C%20Pittsburgh%2C%20PA%2015220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
              >
                Get directions
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="border border-border mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="border border-border mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(412) 555-1234"
                      className="border border-border mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="border border-border mt-2">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adoption">Adoption Inquiry</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="donation">Donation</SelectItem>
                        <SelectItem value="rehoming">Rehoming</SelectItem>
                        <SelectItem value="thrift">Thrift Shop</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="border border-border mt-2"
                    />
                  </div>

                  {status === "success" && (
                    <p className="text-sm text-primary">
                      Thanks for reaching out! We'll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-destructive">
                      Something went wrong sending your message. Please try again, or email us directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
