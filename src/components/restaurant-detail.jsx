import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, MapPin, Camera, Clock, Phone, Globe, Car, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export function RestaurantDetail({ restaurant, isOpen, onClose, onBookTable, onBookTransport }) {
  if (!restaurant) return null;

  const photoSpotDescriptions = [
    "Rooftop terrace with city skyline views",
    "Vintage interior with exposed brick walls",
    "Garden patio with string lights",
    "Chef's table with open kitchen view",
    "Wine cellar with mood lighting"
  ];

  const menuHighlights = [
    { name: "Signature Truffle Pasta", price: "$28", description: "House-made pasta with black truffle and parmesan" },
    { name: "Grilled Sea Bass", price: "$32", description: "Fresh catch with Mediterranean herbs" },
    { name: "Wagyu Beef Tenderloin", price: "$45", description: "Premium cut with seasonal vegetables" },
    { name: "Chocolate Soufflé", price: "$12", description: "Made to order, serves 2" }
  ];

  const operatingHours = [
    { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{restaurant.name} Details</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about {restaurant.name} including photos, reviews, menu highlights, and booking options.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Image */}
          <div className="relative">
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {restaurant.emergency && (
              <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                Emergency Services Nearby
              </Badge>
            )}
          </div>
          
          {/* Restaurant Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{restaurant.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">({restaurant.reviews} reviews)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.location} • {restaurant.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span>{restaurant.photoSpots} photo spots</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">{restaurant.description}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={() => onBookTable(restaurant)} className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Book Table
              </Button>
              <Button onClick={() => onBookTransport(restaurant)} variant="outline" className="flex-1">
                <Car className="w-4 h-4 mr-2" />
                Book Transport
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Website
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Best Food Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Signature Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuHighlights.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Photo Spots */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Instagram-Worthy Photo Spots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {photoSpotDescriptions.slice(0, restaurant.photoSpots).map((spot, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Camera className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium">Spot {index + 1}</span>
                    <p className="text-sm text-muted-foreground">{spot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Operating Hours */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
            <div className="space-y-2">
              {operatingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{schedule.day}</span>
                  <span className="text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Emergency Services */}
          {restaurant.emergency && (
            <>
              <Separator />
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">Emergency Services</h3>
                <p className="text-sm text-red-700">
                  This restaurant is located near emergency services including hospitals, 
                  police stations, and tourist assistance centers for your safety and peace of mind.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}