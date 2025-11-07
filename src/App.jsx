import { useState, useMemo } from 'react';
import { Compass, MapPin, Menu, Sparkles, Clock } from 'lucide-react';
import { RestaurantCard } from './components/restaurant-card';
import { WeatherWidget } from './components/weather-widget';
import { EmergencyContacts } from './components/emergency-contacts';
import { BookingModal } from './components/booking-modal';
import { TransportBooking } from './components/transport-booking';
import { RestaurantDetail } from './components/restaurant-detail';
import { SearchFilters } from './components/search-filters';
import { LocationOnboarding } from './components/location-onboarding';
import { UrgencySelector } from './components/urgency-selector';
import { LocalAuthenticPicks } from './components/local-authentic-picks';
import { BestRecommendations } from './components/best-recommendations';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

const mockRestaurants = [
  {
    id: '1',
    name: 'Vista Rooftop Restaurant',
    image: 'https://images.unsplash.com/photo-1756397391675-dce7c5faf9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudCUyMHZpZXd8ZW58MXx8fHwxNzU4ODExOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 324,
    cuisine: 'Mediterranean',
    location: 'Downtown District',
    priceRange: '25000₹',
    photoSpots: 5,
    emergency: true,
    bestFoodItems: ['Grilled Octopus', 'Lamb Souvlaki', 'Baklava'],
    description: 'Stunning rooftop dining with panoramic city views and authentic Mediterranean cuisine.',
    distance: '0.8 km',
    isEcoFriendly: true,
    sustainabilityFeatures: ['Solar powered', 'Local sourcing', 'Zero waste kitchen']
  },
  {
    id: '2',
    name: 'Sakura Fine Dining',
    image: 'https://images.unsplash.com/photo-1698434939525-dd584e446a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzU4ODExOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 567,
    cuisine: 'Japanese',
    location: 'Arts Quarter',
    priceRange: '₹₹₹₹',
    photoSpots: 4,
    emergency: false,
    bestFoodItems: ['Omakase Sushi', 'Wagyu Beef', 'Matcha Parfait'],
    description: 'Exquisite Japanese cuisine with traditional presentation and modern flair.',
    distance: '1.2 km'
  },
  {
    id: '3',
    name: 'Rustic Garden Bistro',
    image: 'https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwdGVycmFjZSUyMG91dGRvb3J8ZW58MXx8fHwxNzU4ODExOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviews: 189,
    cuisine: 'Italian',
    location: 'Garden District',
    priceRange: '₹₹',
    photoSpots: 3,
    emergency: true,
    bestFoodItems: ['Truffle Risotto', 'Wood-fired Pizza', 'Tiramisu'],
    description: 'Charming outdoor dining surrounded by lush gardens with homemade Italian cuisine.',
    distance: '0.5 km',
    isLocalFavorite: true,
    isEcoFriendly: true,
    sustainabilityFeatures: ['Organic garden', 'Compost program', 'Local ingredients'],
    established: '1985'
  },
  {
    id: '4',
    name: 'The Cozy Corner Cafe',
    image: 'https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc1ODc3MjMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.3,
    reviews: 92,
    cuisine: 'American',
    location: 'Historic Quarter',
    priceRange: '₹',
    photoSpots: 2,
    emergency: false,
    bestFoodItems: ['Avocado Toast', 'Specialty Coffee', 'Pancakes'],
    description: 'Intimate cafe with vintage decor, perfect for brunch and specialty coffee.',
    distance: '0.3 km',
    isLocalFavorite: true,
    established: '1962'
  },
  {
    id: '5',
    name: 'Elegance Restaurant',
    image: 'https://images.unsplash.com/photo-1743793055775-3c07ab847ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGFtYmlhbmNlfGVufDF8fHx8MTc1ODgxMTk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 445,
    cuisine: 'French',
    location: 'Luxury District',
    priceRange: '₹₹₹₹',
    photoSpots: 4,
    emergency: true,
    bestFoodItems: ['Foie Gras', 'Beef Wellington', 'Crème Brûlée'],
    description: 'Sophisticated French dining with impeccable service and elegant atmosphere.',
    distance: '1.5 km'
  },
  {
    id: '6',
    name: 'Modern Dining Hall',
    image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU4ODAwNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
    reviews: 256,
    cuisine: 'Asian Fusion',
    location: 'Business District',
    priceRange: '₹₹₹',
    photoSpots: 3,
    emergency: false,
    bestFoodItems: ['Korean BBQ', 'Ramen Bowl', 'Mochi Ice Cream'],
    description: 'Contemporary Asian fusion with sleek modern interior and innovative dishes.',
    distance: '2.1 km'
  }
];

const mockLocalPicks = [
  {
    id: 'lp1',
    name: 'Nonna\'s Family Kitchen',
    image: 'https://images.unsplash.com/photo-1682634214429-13b1cef1291b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhbWlseSUyMHJlc3RhdXJhbnQlMjBjb3p5fGVufDF8fHx8MTc1ODgxNDIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'family_owned',
    rating: 4.5,
    reviews: 143,
    location: 'Little Italy',
    distance: '0.7 km',
    specialty: 'Traditional Italian',
    localScore: 94,
    sustainabilityFeatures: ['Family recipes', 'Local produce'],
    description: 'Third-generation Italian family restaurant serving authentic recipes passed down through generations.',
    priceRange: '₹₹',
    established: '1952'
  },
  {
    id: 'lp2',
    name: 'Green Earth Bistro',
    image: 'https://images.unsplash.com/photo-1620052736792-ac388531ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGVjbyUyMHJlc3RhdXJhbnQlMjBmYXJtfGVufDF8fHx8MTc1ODgxNDIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'eco_friendly',
    rating: 4.7,
    reviews: 89,
    location: 'Green Quarter',
    distance: '1.1 km',
    specialty: 'Farm-to-Table',
    localScore: 91,
    sustainabilityFeatures: ['Zero waste', 'Solar energy', 'Urban farming', 'Compostable packaging'],
    description: 'Pioneering sustainable dining with ingredients from their own urban farm and zero-waste practices.',
    priceRange: '₹₹₹'
  },
  {
    id: 'lp3',
    name: 'Heritage Spice House',
    image: 'https://images.unsplash.com/photo-1758346970347-300106fecfbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGxvY2FsJTIwY3Vpc2luZSUyMGF1dGhlbnRpY3xlbnwxfHx8fDE3NTg4MTQyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'traditional',
    rating: 4.6,
    reviews: 267,
    location: 'Cultural District',
    distance: '0.9 km',
    specialty: 'Traditional Spices & Curries',
    localScore: 96,
    sustainabilityFeatures: ['Traditional methods', 'Local spices'],
    description: 'Authentic traditional cuisine using centuries-old recipes and locally sourced spices.',
    priceRange: '₹₹'
  },
  {
    id: 'lp4',
    name: 'Community Corner Diner',
    image: 'https://images.unsplash.com/photo-1751608431864-10036ddb9b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBsb2NhbCUyMGRpbmVyJTIwbmVpZ2hib3Job29kfGVufDF8fHx8MTc1ODgxNDIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    type: 'local_favorite',
    rating: 4.4,
    reviews: 421,
    location: 'Main Street',
    distance: '0.4 km',
    specialty: 'Classic American Comfort',
    localScore: 98,
    sustainabilityFeatures: ['Community supported', 'Local partnerships'],
    description: 'Beloved neighborhood spot where locals gather for hearty comfort food and community spirit.',
    priceRange: '₹',
    established: '1974'
  }
];

const mockBestRecommendations = [
  {
    id: 'br1',
    name: 'Vista Rooftop Restaurant',
    image: 'https://images.unsplash.com/photo-1756397391675-dce7c5faf9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudCUyMHZpZXd8ZW58MXx8fHwxNzU4ODExOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Mediterranean Fine Dining',
    rating: 4.8,
    reviewCount: 324,
    location: 'Downtown District',
    distance: '0.8 km',
    priceRange: '₹₹₹',
    aiScore: {
      overall: 94,
      reviewQuality: 96,
      locationConvenience: 89,
      priceValue: 87,
      userMatch: 98
    },
    whyRecommended: ['Perfect for special occasions', 'Stunning city views', 'Authentic Mediterranean', 'Highly rated service'],
    userMatchReasons: ['Matches your preference for rooftop dining', 'Within your budget range', 'High photo spot rating'],
    description: 'Our AI identified this as the perfect match based on your preferences. Stunning rooftop dining with panoramic city views and authentic Mediterranean cuisine.',
    topReviews: [
      'The view is absolutely breathtaking, especially at sunset!',
      'Best Mediterranean food I\'ve had outside of Greece. The lamb souvlaki is perfection.'
    ],
    trending: true,
    bookingUrgency: 'high',
  },
  {
    id: 'br2',
    name: 'Rustic Garden Bistro',
    image: 'https://images.unsplash.com/photo-1689075326462-581d7705c0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwdGVycmFjZSUyMG91dGRvb3J8ZW58MXx8fHwxNzU4ODExOTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Italian Garden Dining',
    rating: 4.6,
    reviewCount: 189,
    location: 'Garden District',
    distance: '0.5 km',
    priceRange: '₹₹',
    aiScore: {
      overall: 91,
      reviewQuality: 93,
      locationConvenience: 95,
      priceValue: 94,
      userMatch: 89
    },
    whyRecommended: ['Eco-friendly practices', 'Great value for money', 'Romantic garden setting', 'Local favorite'],
    userMatchReasons: ['Perfect for your moderate budget', 'Aligns with eco-friendly preferences', 'Close to your location'],
    description: 'Charming outdoor dining surrounded by lush gardens with homemade Italian cuisine and sustainable practices.',
    topReviews: [
      'The garden setting is magical, feels like dining in Tuscany!',
      'Amazing truffle risotto and the staff is so knowledgeable about their ingredients.'
    ],
    trending: false,
    bookingUrgency: 'medium',
  }
];

const mockWeather = {
  location: 'Current Location',
  temperature: 24,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 12,
  description: 'Perfect weather for dining outdoors! Clear skies with gentle breeze.'
};

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showLocationOnboarding, setShowLocationOnboarding] = useState(true);
  const [selectedUrgency, setSelectedUrgency] = useState('moderate');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: 'All Cuisines',
    priceRange: 'All Prices',
    rating: [0],
    photoSpots: false,
    emergency: false,
    distance: [10]
  });
  
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    let restaurants = [...mockRestaurants];

    // Apply urgency-based filtering
    if (selectedUrgency === 'urgent') {
      restaurants = restaurants.filter(r => parseFloat(r.distance.replace(' km', '')) <= 1.5);
    } else if (selectedUrgency === 'relaxed') {
      restaurants = restaurants.filter(r => r.isLocalFavorite || r.isEcoFriendly);
    }

    return restaurants.filter(restaurant => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query) ||
          restaurant.location.toLowerCase().includes(query) ||
          restaurant.bestFoodItems.some(item => item.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Cuisine filter
      if (filters.cuisine !== 'All Cuisines' && restaurant.cuisine !== filters.cuisine) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== 'All Prices' && restaurant.priceRange !== filters.priceRange) {
        return false;
      }

      // Rating filter
      if (filters.rating[0] > 0 && restaurant.rating < filters.rating[0]) {
        return false;
      }

      // Photo spots filter
      if (filters.photoSpots && restaurant.photoSpots < 3) {
        return false;
      }

      // Emergency services filter
      if (filters.emergency && !restaurant.emergency) {
        return false;
      }

      // Distance filter
      const distance = parseFloat(restaurant.distance.replace(' km', ''));
      if (distance > filters.distance[0]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, selectedUrgency]);

  const handleLocationSelected = (location) => {
    setCurrentLocation(location);
    setShowLocationOnboarding(false);
  };

  const handleBookTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsBookingModalOpen(true);
  };

  const handleBookTransport = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsTransportModalOpen(true);
  };

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDetailModalOpen(true);
  };

  const handleSelectLocalPick = (pick) => {
    // Convert local pick to restaurant format for detail view
    const restaurant = {
      id: pick.id,
      name: pick.name,
      image: pick.image,
      rating: pick.rating,
      reviews: pick.reviews,
      cuisine: pick.specialty,
      location: pick.location,
      priceRange: pick.priceRange,
      photoSpots: 3,
      emergency: false,
      bestFoodItems: [],
      description: pick.description,
      distance: pick.distance,
      isEcoFriendly: pick.type === 'eco_friendly',
      isLocalFavorite: pick.type === 'local_favorite',
      sustainabilityFeatures: pick.sustainabilityFeatures,
      established: pick.established
    };
    handleViewDetails(restaurant);
  };

  const handleSelectRecommendation = (rec) => {
    // Convert recommendation to restaurant format
    const restaurant = {
      id: rec.id,
      name: rec.name,
      image: rec.image,
      rating: rec.rating,
      reviews: rec.reviewCount,
      cuisine: rec.category,
      location: rec.location,
      priceRange: rec.priceRange,
      photoSpots: 4,
      emergency: false,
      bestFoodItems: [],
      description: rec.description,
      distance: rec.distance
    };
    handleViewDetails(restaurant);
  };

  if (showLocationOnboarding) {
    return (
      <LocationOnboarding
        isOpen={showLocationOnboarding}
        onLocationSelected={handleLocationSelected}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">TripMate</h1>
                <p className="text-sm text-muted-foreground">Your Smart Travel Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{currentLocation?.city || 'Current Location'}</span>
              </div>
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="space-y-4 mt-6">
                    <WeatherWidget weather={mockWeather} />
                    <EmergencyContacts />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Urgency Selector */}
            <UrgencySelector
              selectedUrgency={selectedUrgency}
              onUrgencyChange={setSelectedUrgency}
            />

            {/* Tabs for different views */}
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Picks
                </TabsTrigger>
                <TabsTrigger value="local" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Local Authentic
                </TabsTrigger>
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Browse All
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <BestRecommendations
                  recommendations={mockBestRecommendations}
                  onSelectRecommendation={handleSelectRecommendation}
                />
              </TabsContent>

              <TabsContent value="local" className="space-y-6">
                <LocalAuthenticPicks
                  picks={mockLocalPicks}
                  onSelectPick={handleSelectLocalPick}
                />
              </TabsContent>

              <TabsContent value="browse" className="space-y-6">
                {/* Search and Filters */}
                <SearchFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filters={filters}
                  onFiltersChange={setFilters}
                />

                {/* Results */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} Found
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery && `Showing results for "${searchQuery}"`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRestaurants.map(restaurant => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onBookTable={handleBookTable}
                        onBookTransport={handleBookTransport}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>

                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                      <Compass className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery('');
                          setFilters({
                            cuisine: 'All Cuisines',
                            priceRange: 'All Prices',
                            rating: [0],
                            photoSpots: false,
                            emergency: false,
                            distance: [10]
                          });
                        }}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <WeatherWidget weather={mockWeather} />
            <EmergencyContacts />
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        restaurant={selectedRestaurant}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <TransportBooking
        restaurant={selectedRestaurant}
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
      />

      <RestaurantDetail
        restaurant={selectedRestaurant}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookTable={handleBookTable}
        onBookTransport={handleBookTransport}
      />
    </div>
  );
}