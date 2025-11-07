import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, MapPin, Camera, Clock, Car, Leaf, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function RestaurantCard({ restaurant, onBookTable, onBookTransport, onViewDetails }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {restaurant.emergency && (
            <Badge className="bg-red-500 text-white">
              Emergency Services
            </Badge>
          )}
          {restaurant.isEcoFriendly && (
            <Badge className="bg-green-500 text-white flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Eco-Friendly
            </Badge>
          )}
          {restaurant.isLocalFavorite && (
            <Badge className="bg-blue-500 text-white flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Local Favorite
            </Badge>
          )}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded">
          <Camera className="w-4 h-4" />
          <span className="text-sm">{restaurant.photoSpots} photo spots</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <span className="text-sm text-muted-foreground">{restaurant.priceRange}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({restaurant.reviews} reviews)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{restaurant.location} • {restaurant.distance}</span>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">Best Food:</p>
          <div className="flex flex-wrap gap-1">
            {restaurant.bestFoodItems.slice(0, 3).map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {restaurant.description}
        </p>
        
        <div className="flex gap-2">
          <Button onClick={() => onViewDetails(restaurant)} variant="outline" className="flex-1">
            View Details
          </Button>
          <Button onClick={() => onBookTable(restaurant)} className="flex-1">
            Book Table
          </Button>
          <Button onClick={() => onBookTransport(restaurant)} variant="outline" size="icon">
            <Car className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}