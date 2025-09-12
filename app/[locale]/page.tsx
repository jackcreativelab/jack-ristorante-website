"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, ChefHat, Wine, Utensils, Menu, Filter, X } from "lucide-react"
import { useState, useEffect } from "react"

const allergens = [
  { id: "gluten", name: "Gluten", icon: "🌾" },
  { id: "dairy", name: "Produits laitiers", icon: "🥛" },
  { id: "nuts", name: "Fruits à coque", icon: "🥜" },
  { id: "seafood", name: "Fruits de mer", icon: "🦐" },
  { id: "eggs", name: "Œufs", icon: "🥚" },
  { id: "soy", name: "Soja", icon: "🫘" },
]

const menuData = {
  antipasti: [
    {
      name: "Antipasto della Casa",
      description: "Sélection de charcuteries italiennes, fromages affinés, olives et légumes marinés",
      price: "18€",
      allergens: ["dairy"],
      image: "italian antipasto platter with cured meats and cheeses",
    },
    {
      name: "Burrata di Puglia",
      description: "Burrata crémeuse servie avec tomates cerises, roquette et huile d'olive extra vierge",
      price: "16€",
      allergens: ["dairy"],
      image: "fresh burrata with cherry tomatoes and arugula",
    },
    {
      name: "Carpaccio di Manzo",
      description: "Fines tranches de bœuf cru, copeaux de parmesan, roquette et citron",
      price: "22€",
      allergens: ["dairy"],
      image: "beef carpaccio with parmesan shavings and arugula",
    },
    {
      name: "Vitello Tonnato",
      description: "Veau froid tranché finement, sauce au thon et câpres",
      price: "20€",
      allergens: ["eggs", "seafood"],
      image: "vitello tonnato with tuna sauce and capers",
    },
  ],
  primi: [
    {
      name: "Spaghetti alle Vongole",
      description: "Spaghetti aux palourdes fraîches, ail, persil et vin blanc",
      price: "24€",
      allergens: ["gluten", "seafood"],
      image: "spaghetti with fresh clams in white wine sauce",
    },
    {
      name: "Risotto ai Porcini",
      description: "Risotto crémeux aux cèpes, parmesan vieilli et truffe noire",
      price: "28€",
      allergens: ["dairy"],
      image: "creamy porcini mushroom risotto with truffle",
    },
    {
      name: "Pappardelle al Cinghiale",
      description: "Pâtes fraîches à la sauce de sanglier braisé et herbes de Toscane",
      price: "26€",
      allergens: ["gluten", "eggs"],
      image: "fresh pappardelle pasta with wild boar sauce",
    },
    {
      name: "Gnocchi alla Sorrentina",
      description: "Gnocchi de pommes de terre, sauce tomate, mozzarella et basilic",
      price: "22€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "potato gnocchi with tomato sauce and mozzarella",
    },
  ],
  secondi: [
    {
      name: "Osso Buco alla Milanese",
      description: "Jarret de veau braisé, risotto au safran et gremolata",
      price: "42€",
      allergens: ["dairy"],
      image: "osso buco with saffron risotto and gremolata",
    },
    {
      name: "Branzino in Crosta di Sale",
      description: "Bar en croûte de sel, légumes de saison et huile aux herbes",
      price: "38€",
      allergens: ["seafood"],
      image: "sea bass in salt crust with seasonal vegetables",
    },
    {
      name: "Bistecca alla Fiorentina",
      description: "Côte de bœuf grillée (pour 2 personnes), roquette et tomates cerises",
      price: "85€",
      allergens: [],
      image: "grilled florentine steak with arugula and cherry tomatoes",
    },
    {
      name: "Scaloppine al Limone",
      description: "Escalopes de veau au citron, épinards sautés à l'ail",
      price: "32€",
      allergens: ["dairy"],
      image: "veal scaloppine with lemon sauce and sautéed spinach",
    },
  ],
  dolci: [
    {
      name: "Tiramisu della Casa",
      description: "Notre tiramisu signature aux biscuits imbibés d'espresso et mascarpone",
      price: "14€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "classic tiramisu with cocoa powder dusting",
    },
    {
      name: "Panna Cotta ai Frutti di Bosco",
      description: "Panna cotta vanille, coulis de fruits rouges et biscotti",
      price: "12€",
      allergens: ["dairy", "gluten"],
      image: "vanilla panna cotta with berry coulis and biscotti",
    },
    {
      name: "Cannoli Siciliani",
      description: "Cannoli croustillants fourrés à la ricotta et pépites de chocolat",
      price: "13€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "sicilian cannoli with ricotta and chocolate chips",
    },
    {
      name: "Gelato Artigianale",
      description: "Sélection de glaces artisanales (vanille, pistache, stracciatella)",
      price: "10€",
      allergens: ["dairy", "nuts"],
      image: "artisanal gelato scoops in elegant bowl",
    },
  ],
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filterDishes = (dishes: any[]) => {
    if (selectedAllergens.length === 0) return dishes
    return dishes.filter((dish) => !dish.allergens.some((allergen: string) => selectedAllergens.includes(allergen)))
  }

  const toggleAllergen = (allergenId: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId) ? prev.filter((id) => id !== allergenId) : [...prev, allergenId],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-primary tracking-wide">JACK RISTORANTE</div>
              <div className="hidden md:flex space-x-8">
                <a href="#menu" className="text-foreground hover:text-primary transition-colors">
                  CARTE
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">
                  À PROPOS
                </a>
                <a href="#chef" className="text-foreground hover:text-primary transition-colors">
                  CHEF
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                  CONTACT
                </a>
              </div>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">RÉSERVATION</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with parallax effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <img
          src="/elegant-italian-restaurant-interior-with-warm-ligh.jpg"
          alt="Jack Ristorante Interior"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div
          className="relative z-20 text-center max-w-4xl mx-auto px-4 transition-all duration-1000"
          style={{
            opacity: Math.max(0, 1 - scrollY / 500),
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/30 backdrop-blur-sm rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-balance text-white">
            {"Bienvenue chez"}
            <br />
            <span className="font-bold text-primary">Jack Ristorante</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-pretty max-w-2xl mx-auto text-white">
            Cuisine italienne authentique préparée avec passion, servie dans une atmosphère d'élégance raffinée
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              VOIR LA CARTE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 bg-transparent"
            >
              RÉSERVER
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section with allergen filter */}
      <section id="menu" className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Notre Carte</Badge>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-balance">
              Saveurs <span className="font-bold text-primary">Authentiques</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Découvrez notre sélection de plats italiens traditionnels, préparés avec les meilleurs ingrédients
            </p>

            <div className="flex justify-center mb-8">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtrer par allergènes
                {selectedAllergens.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedAllergens.length}
                  </Badge>
                )}
              </Button>
            </div>

            {showFilters && (
              <div className="bg-card rounded-lg p-6 mb-8 border">
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  {allergens.map((allergen) => (
                    <Button
                      key={allergen.id}
                      onClick={() => toggleAllergen(allergen.id)}
                      variant={selectedAllergens.includes(allergen.id) ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <span>{allergen.icon}</span>
                      {allergen.name}
                      {selectedAllergens.includes(allergen.id) && <X className="w-3 h-3" />}
                    </Button>
                  ))}
                </div>
                {selectedAllergens.length > 0 && (
                  <Button onClick={() => setSelectedAllergens([])} variant="ghost" size="sm">
                    Effacer tous les filtres
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Antipasti */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center justify-center lg:justify-start">
                  <Wine className="w-6 h-6 mr-2" />
                  ANTIPASTI
                </h3>
              </div>
              <div className="space-y-6">
                {filterDishes(menuData.antipasti).map((dish, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                    <div className="flex gap-4 p-4">
                      <img
                        src={`/abstract-geometric-shapes.png?key=ydpca&height=100&width=100&query=${dish.image}`}
                        alt={dish.name}
                        className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{dish.name}</h4>
                          <span className="font-bold text-primary ml-4">{dish.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{dish.description}</p>
                        <div className="flex gap-1">
                          {dish.allergens.map((allergenId: string) => {
                            const allergen = allergens.find((a) => a.id === allergenId)
                            return allergen ? (
                              <span
                                key={allergenId}
                                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                              >
                                {allergen.icon} {allergen.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Primi Piatti */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center justify-center lg:justify-start">
                  <Utensils className="w-6 h-6 mr-2" />
                  PRIMI PIATTI
                </h3>
              </div>
              <div className="space-y-6">
                {filterDishes(menuData.primi).map((dish, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                    <div className="flex gap-4 p-4">
                      <img
                        src={`/abstract-geometric-shapes.png?key=4x24m&height=100&width=100&query=${dish.image}`}
                        alt={dish.name}
                        className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{dish.name}</h4>
                          <span className="font-bold text-primary ml-4">{dish.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{dish.description}</p>
                        <div className="flex gap-1">
                          {dish.allergens.map((allergenId: string) => {
                            const allergen = allergens.find((a) => a.id === allergenId)
                            return allergen ? (
                              <span
                                key={allergenId}
                                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                              >
                                {allergen.icon} {allergen.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Secondi Piatti */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center justify-center lg:justify-start">
                  <ChefHat className="w-6 h-6 mr-2" />
                  SECONDI PIATTI
                </h3>
              </div>
              <div className="space-y-6">
                {filterDishes(menuData.secondi).map((dish, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                    <div className="flex gap-4 p-4">
                      <img
                        src={`/abstract-geometric-shapes.png?key=n6625&height=100&width=100&query=${dish.image}`}
                        alt={dish.name}
                        className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{dish.name}</h4>
                          <span className="font-bold text-primary ml-4">{dish.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{dish.description}</p>
                        <div className="flex gap-1">
                          {dish.allergens.map((allergenId: string) => {
                            const allergen = allergens.find((a) => a.id === allergenId)
                            return allergen ? (
                              <span
                                key={allergenId}
                                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                              >
                                {allergen.icon} {allergen.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dolci */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center justify-center lg:justify-start">
                  <Star className="w-6 h-6 mr-2" />
                  DOLCI
                </h3>
              </div>
              <div className="space-y-6">
                {filterDishes(menuData.dolci).map((dish, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                    <div className="flex gap-4 p-4">
                      <img
                        src={`/abstract-geometric-shapes.png?key=4ucw3&height=100&width=100&query=${dish.image}`}
                        alt={dish.name}
                        className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{dish.name}</h4>
                          <span className="font-bold text-primary ml-4">{dish.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{dish.description}</p>
                        <div className="flex gap-1">
                          {dish.allergens.map((allergenId: string) => {
                            const allergen = allergens.find((a) => a.id === allergenId)
                            return allergen ? (
                              <span
                                key={allergenId}
                                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                              >
                                {allergen.icon} {allergen.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              <Menu className="w-4 h-4 mr-2" />
              Télécharger la Carte Complète
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground border-0">Depuis 2018</Badge>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-balance">
                Un Voyage Culinaire à Travers <span className="font-bold text-primary">l'Italie</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Jack Ristorante incarne les mêmes valeurs de créativité, d'inspiration et d'inclusivité que les plus
                beaux établissements italiens. Notre engagement envers les saveurs authentiques et un service
                exceptionnel crée une expérience culinaire inoubliable.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Des pâtes faites maison aux vins soigneusement sélectionnés, chaque détail reflète notre passion pour
                les traditions culinaires italiennes, réinventées pour le palais moderne.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <span className="font-semibold">Recommandé Michelin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wine className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Cave Primée</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/elegant-italian-chef-preparing-fresh-pasta-in-mode.jpg"
                alt="Chef preparing pasta"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Années d'Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Plats Signature</Badge>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-balance">
              Créés avec <span className="font-bold text-primary">Passion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque plat raconte une histoire de tradition italienne, préparé avec les meilleurs ingrédients et
              présenté avec un flair artistique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Risotto ai Porcini",
                description: "Riz Arborio crémeux aux cèpes sauvages et Parmigiano-Reggiano vieilli",
                price: "28€",
                image: "elegant plated risotto with porcini mushrooms and parmesan",
              },
              {
                name: "Osso Buco alla Milanese",
                description: "Jarret de veau braisé lentement avec risotto au safran et gremolata",
                price: "42€",
                image: "traditional osso buco with saffron risotto on elegant white plate",
              },
              {
                name: "Tiramisu della Casa",
                description: "Notre tiramisu signature aux biscuits imbibés d'espresso et mascarpone",
                price: "14€",
                image: "elegant tiramisu dessert with cocoa powder dusting",
              },
            ].map((dish, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`/abstract-geometric-shapes.png?key=d8jgc&height=300&width=400&query=${dish.image}`}
                    alt={dish.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                    {dish.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{dish.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{dish.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Nous Rendre Visite</Badge>
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-balance">
                Découvrez <span className="font-bold text-primary">Jack Ristorante</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      Via del Corso 123
                      <br />
                      50122 Florence, Italie
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Réservations</h3>
                    <p className="text-muted-foreground">+39 055 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horaires</h3>
                    <p className="text-muted-foreground">
                      Mardi - Dimanche : 12h00 - 15h00, 19h00 - 23h00
                      <br />
                      Lundi : Fermé
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Utensils className="w-4 h-4 mr-2" />
                  Réserver une Table
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/elegant-italian-restaurant-exterior-with-stone-fac.jpg"
                alt="Jack Ristorante Exterior"
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4 text-primary">JACK RISTORANTE</div>
            <p className="text-background/80 mb-6">Cuisine italienne authentique au cœur de Florence</p>
            <div className="flex justify-center space-x-8 text-sm">
              <span>© 2024 Jack Ristorante</span>
              <span>•</span>
              <span>Politique de Confidentialité</span>
              <span>•</span>
              <span>Conditions d'Utilisation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
