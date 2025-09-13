"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, ChefHat, Wine, Utensils, Menu, Filter, X } from "lucide-react"
import Image from "next/image";
import { useState, useEffect } from "react"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import RestaurantMap from "@/components/restaurant-map";
import { ThemeSwitcher } from "@/components/theme-switcher";

const allergens = [
  { id: "gluten", name: "Gluten", icon: "🌾" },
  { id: "dairy", name: "Produits laitiers", icon: "🥛" },
  { id: "nuts", name: "Fruits à coque", icon: "🥜" },
  { id: "seafood", name: "Fruits de mer", icon: "🦐" },
  { id: "eggs", name: "Œufs", icon: "🥚" },
]

const menuData = {
  antipasti: [
    {
      name: "Antipasto della Casa",
      description: "Sélection de charcuteries italiennes, fromages affinés, olives et légumes marinés",
      price: "18€",
      allergens: ["dairy"],
            image: "/antipasto-catering-platter-with-bacon-jerky-sausage-blue-cheese-grapes-wooden-table-top-view.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Burrata di Puglia",
      description: "Burrata crémeuse servie avec tomates cerises, roquette et huile d'olive extra vierge",
      price: "16€",
      allergens: ["dairy"],
            image: "/top-view-mozzarella-cherry-tomatoes-wooden-table.jpg",
      vegetarian: true,
      vegan: false,
    },
    {
      name: "Carpaccio di Manzo",
      description: "Fines tranches de bœuf cru, copeaux de parmesan, roquette et citron",
      price: "22€",
      allergens: ["dairy"],
            image: "/top-view-basturma-meat-plate-with-arugula-parmesan-cheese.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Vitello Tonnato",
      description: "Veau froid tranché finement, sauce au thon et câpres",
      price: "20€",
      allergens: ["eggs", "seafood"],
            image: "/top-view-chicken-with-cheese-platter-dark-table.jpg",
      vegetarian: false,
      vegan: false,
    },
  ],
  primi: [
    {
      name: "Spaghetti alle Vongole",
      description: "Spaghetti aux palourdes fraîches, ail, persil et vin blanc",
      price: "24€",
      allergens: ["gluten", "seafood"],
            image: "/tasty-appetizing-fresh-homemade-clams-alle-vongole-seafood-pasta-with-garlic-white-wine-plate-closeup.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Risotto ai Porcini",
      description: "Risotto crémeux aux cèpes, parmesan vieilli et truffe noire",
      price: "28€",
      allergens: ["dairy"],
      image: "/buckwheat-porridge-with-mushrooms.jpg",
      vegetarian: true,
      vegan: false,
    },
    {
      name: "Pappardelle al Cinghiale",
      description: "Pâtes fraîches à la sauce de sanglier braisé et herbes de Toscane",
      price: "26€",
      allergens: ["gluten", "eggs"],
      image: "/tasty-fettuccine-pasta-dish-topped-with-grated-cheese-white-plate.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Gnocchi alla Sorrentina",
      description: "Gnocchi de pommes de terre, sauce tomate, mozzarella et basilic",
      price: "22€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "/plate-gnocchi-pasta-tomato-sauce-with-fresh-basil-leaves.jpg",
      vegetarian: true,
      vegan: false,
    },
  ],
  secondi: [
    {
      name: "Osso Buco alla Milanese",
      description: "Jarret de veau braisé, risotto au safran et gremolata",
      price: "42€",
      allergens: ["dairy"],
      image: "/fried-chicken-breast-sauce-with-parmesan.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Branzino in Crosta di Sale",
      description: "Bar en croûte de sel, légumes de saison et huile aux herbes",
      price: "38€",
      allergens: ["seafood"],
      image: "/raw-fish-composition-cooking.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Bistecca alla Fiorentina",
      description: "Côte de bœuf grillée (pour 2 personnes), roquette et tomates cerises",
      price: "85€",
      allergens: [],
      image: "/high-angle-steak-with-cutlery-salad.jpg",
      vegetarian: false,
      vegan: false,
    },
    {
      name: "Scaloppine al Limone",
      description: "Escalopes de veau au citron, épinards sautés à l'ail",
      price: "32€",
      allergens: ["dairy"],
      image: "/seared-tuna-fork-close-up.jpg",
      vegetarian: false,
      vegan: false,
    },
  ],
  dolci: [
    {
      name: "Tiramisu della Casa",
      description: "Notre tiramisu signature aux biscuits imbibés d'espresso et mascarpone",
      price: "14€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "/high-angle-tiramisu-small-jar.jpg",
      vegetarian: true,
      vegan: false,
    },
    {
      name: "Panna Cotta ai Frutti di Bosco",
      description: "Panna cotta vanille, coulis de fruits rouges et biscotti",
      price: "12€",
      allergens: ["dairy", "gluten"],
      image: "/sangria-senorial-V7-dIKURxK4-unsplash.jpg",
      vegetarian: true,
      vegan: false,
    },
    {
      name: "Cannoli Siciliani",
      description: "Cannoli croustillants fourrés à la ricotta et pépites de chocolat",
      price: "13€",
      allergens: ["gluten", "dairy", "eggs"],
      image: "/karly-gomez-lK1Q5RyD6tc-unsplash.jpg",
      vegetarian: true,
      vegan: false,
    },
    {
      name: "Gelato Artigianale",
      description: "Sélection de glaces artisanales (vanille, pistache, stracciatella)",
      price: "10€",
      allergens: ["dairy", "nuts"],
      image: "/rimsha-noor-p6-O0Cc5RAc-unsplash.jpg",
      vegetarian: true,
      vegan: false,
    },
  ],
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    const requestsTextarea = document.getElementById('requests') as HTMLTextAreaElement;
    if (requestsTextarea) {
      requestsTextarea.value = `J'aimerais réserver la table ${tableId}.`;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filterDishes = (dishes: any[]) => {
    return dishes.filter(dish => {
      if (selectedAllergens.length > 0 && dish.allergens.some((allergen: string) => selectedAllergens.includes(allergen))) {
        return false;
      }
      if (isVegan && !dish.vegan) {
        return false;
      }
      if (isVegetarian && !dish.vegetarian) {
        return false;
      }
      return true;
    });
  }

  const toggleAllergen = (allergenId: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId) ? prev.filter((id) => id !== allergenId) : [...prev, allergenId],
    )
  }

  const allDishes = [...menuData.antipasti, ...menuData.primi, ...menuData.secondi, ...menuData.dolci];

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
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                  CONTACT
                </a>
                <a href="#reservation" className="text-foreground hover:text-primary transition-colors">
                  RÉSERVATION
                </a>
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section with parallax effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/pexels-quark-studio-1159039-3201920.jpg`}
          alt="Jack Ristorante Interior"
          fill
          style={{ objectFit: "cover", transform: `translateY(${scrollY * 0.5}px)` }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

        <div
          className="relative z-20 text-center max-w-4xl mx-auto px-4 transition-all duration-1000"
          style={{
            opacity: Math.max(0, 1 - scrollY / 500),
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/30 backdrop-blur-sm rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-balance text-primary-foreground">
            {"Bienvenue chez"}
            <br />
            <span className="font-bold text-primary">Jack Ristorante</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-pretty max-w-2xl mx-auto text-primary-foreground">
            Cuisine italienne authentique préparée avec passion, servie dans une atmosphère d'élégance raffinée
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3" asChild>
              <a href="#menu">VOIR LA CARTE</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-background px-8 py-3 bg-transparent" asChild
            >
              <a href="#reservation">RÉSERVER</a>
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

            <div className="flex flex-wrap gap-3 justify-center mb-4">
              <Button
                onClick={() => setIsVegetarian(!isVegetarian)}
                variant={isVegetarian ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span> Végétarien</span>
              </Button>
              <Button
                onClick={() => setIsVegan(!isVegan)}
                variant={isVegan ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span> Vegan</span>
              </Button>
            </div>
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
                      <div className="relative w-24 h-24">
                        <Image
                          onClick={() => {
                            const dishIndex = allDishes.findIndex(d => d.name === dish.name);
                            setCurrentIndex(dishIndex);
                            setOpen(true);
                          }}
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
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
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
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
                      <div className="relative w-24 h-24">
                        <Image
                          onClick={() => {
                            const dishIndex = allDishes.findIndex(d => d.name === dish.name);
                            setCurrentIndex(dishIndex);
                            setOpen(true);
                          }}
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
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
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
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
                      <div className="relative w-24 h-24">
                        <Image
                          onClick={() => {
                            const dishIndex = allDishes.findIndex(d => d.name === dish.name);
                            setCurrentIndex(dishIndex);
                            setOpen(true);
                          }}
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
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
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
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
                      <div className="relative w-24 h-24">
                        <Image
                          onClick={() => {
                            const dishIndex = allDishes.findIndex(d => d.name === dish.name);
                            setCurrentIndex(dishIndex);
                            setOpen(true);
                          }}
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
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
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
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
              <div className="relative w-full h-[600px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/elegant-italian-chef-preparing-fresh-pasta-in-mode.jpg`}
                  alt="Chef preparing pasta"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg shadow-2xl"
                />
              </div>
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
                image: "/buckwheat-porridge-with-mushrooms.jpg",
              },
              {
                name: "Osso Buco alla Milanese",
                description: "Jarret de veau braisé lentement avec risotto au safran et gremolata",
                price: "42€",
                image: "/fried-chicken-breast-sauce-with-parmesan.jpg",
              },
              {
                name: "Tiramisu della Casa",
                description: "Notre tiramisu signature aux biscuits imbibés d'espresso et mascarpone",
                price: "14€",
                image: "/high-angle-tiramisu-small-jar.jpg",
              },
            ].map((dish, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="relative w-full h-64">
                    <Image
                      onClick={() => {
                        const dishIndex = allDishes.findIndex(d => d.name === dish.name);
                        setCurrentIndex(dishIndex);
                        setOpen(true);
                      }}
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
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

      {/* Reservation Section */}
      <section id="reservation" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Réservation</Badge>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-balance">
              Réservez votre <span className="font-bold text-primary">Table</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous vous recommandons de réserver à l'avance pour vous garantir une table.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <RestaurantMap onTableSelect={handleTableSelect} />
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nom</label>
                <input type="text" id="name" placeholder="Votre nom" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <input type="email" id="email" placeholder="Votre email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Téléphone</label>
                <input type="tel" id="phone" placeholder="Votre téléphone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="guests" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nombre de convives</label>
                <input type="number" id="guests" placeholder="2" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Date</label>
                <input type="date" id="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Heure</label>
                <input type="time" id="time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="requests" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Demandes spéciales (table préférée, etc.)</label>
                <textarea id="requests" placeholder="Faites-nous part de vos préférences" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                  Envoyer la demande de réservation
                </Button>
              </div>
            </form>
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
            </div>
            <div className="relative">
              <div className="relative w-full h-[500px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/elegant-italian-restaurant-exterior-with-stone-fac.jpg`}
                  alt="Jack Ristorante Exterior"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg shadow-2xl"
                />
              </div>
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={allDishes.map(dish => ({ src: `${process.env.NEXT_PUBLIC_BASE_PATH}${dish.image}`, title: dish.name, description: dish.description }))}
        index={currentIndex}
      />

    </div>
  )
}
