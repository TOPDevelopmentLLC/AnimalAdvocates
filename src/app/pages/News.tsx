import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Rescue Story", "Volunteer Spotlight", "Event Recap", "Foster Update", "Organization News"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = [
    {
      title: "Animal Advocates Furry Forty | 1984–2024",
      category: "Organization News",
      date: "March 2024",
      excerpt:
        "Join us in celebrating 40 years of no-kill animal rescue in Pittsburgh. From humble beginnings to thousands of lives saved, we reflect on four decades of compassion.",
      image: "🎉",
    },
    {
      title: "Super Seniors: Connie & Chester",
      category: "Foster Update",
      date: "February 2024",
      excerpt:
        "Meet Connie and Chester, a heartwarming story of our Senior to Senior Foster Program in action. How one senior cat brought joy to a Pittsburgh senior's golden years.",
      image: "🐱",
    },
    {
      title: "Hangin' on the Catio",
      category: "Rescue Story",
      date: "January 2024",
      excerpt:
        "Get to know our long-term resident cats who call the Animal Advocates headquarters catio home. These special cats are still looking for their forever families.",
      image: "😺",
    },
    {
      title: "Spring Adoption Event Success",
      category: "Event Recap",
      date: "December 2025",
      excerpt:
        "Our Spring Adoption Event at PetSmart Waterworks was a huge success! 12 cats and dogs found their forever homes, and we connected with dozens of new volunteers.",
      image: "🏠",
    },
    {
      title: "Volunteer Spotlight: Sarah Mitchell",
      category: "Volunteer Spotlight",
      date: "November 2025",
      excerpt:
        "Meet Sarah, one of our dedicated foster volunteers who has opened her home to over 30 cats in the past two years. Her compassion makes all the difference.",
      image: "⭐",
    },
    {
      title: "Max's Emergency Surgery Success",
      category: "Rescue Story",
      date: "October 2025",
      excerpt:
        "Thanks to donor support, Max received life-saving emergency surgery after being found injured. Today, he's thriving in his forever home and running in Point State Park.",
      image: "🐕",
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Animal Advocates News & Rescue Stories</h1>
          <p className="text-xl text-white/90">
            Stories from the front lines of Pittsburgh animal rescue — adoption successes, volunteer spotlights, foster
            updates, and news from the Animal Advocates community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <Card className="mb-12 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80 bg-secondary/20 rounded-l-lg flex items-center justify-center">
                  <span className="text-9xl">{filteredArticles[0].image}</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3">
                    {filteredArticles[0].category}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-3">{filteredArticles[0].title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{filteredArticles[0].date}</p>
                  <p className="text-muted-foreground mb-6">{filteredArticles[0].excerpt}</p>
                  <Button variant="outline" className="w-fit">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredArticles.slice(1).map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="w-full h-48 bg-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-7xl">{article.image}</span>
                    </div>
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {article.category}
                    </Badge>
                    <p className="text-xs text-muted-foreground mb-2">{article.date}</p>
                    <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read more →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles match your search or filter criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Don't Miss a Rescue Story</h2>
            <p className="mb-6 text-white/90">
              Join our mailing list to receive the latest adoption success stories, volunteer spotlights, and news from
              Animal Advocates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="bg-white text-foreground flex-1" />
              <Button className="bg-accent hover:bg-accent/90 text-white">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
