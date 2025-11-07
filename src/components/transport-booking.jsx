import { useState } from 'react';
import { Car, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

 

const transportOptions = [
  {
    id: '1',
    type: 'taxi',
    name: 'Standard Taxi',
    description: 'Direct ride to restaurant',
    price: 15,
    duration: '12 mins',
    capacity: 4,
    features: ['Air conditioning', 'GPS tracking'],
    rating: 4.2
  },
  {
    id: '2',
    type: 'premium',
    name: 'Premium Car',
    description: 'Luxury vehicle with scenic route',
    price: 35,
    duration: '20 mins',
    capacity: 4,
    features: ['Luxury interior', 'Scenic route', 'Complimentary water', 'WiFi'],
    rating: 4.8
  },
  {
    id: '3',
    type: 'tour',
    name: 'Sightseeing Tour',
    description: 'Guided tour with multiple photo stops',
    price: 65,
    duration: '45 mins',
    capacity: 6,
    features: ['Professional guide', 'Multiple stops', 'Photo opportunities', 'Local insights'],
    rating: 4.9
  }
];

export function TransportBooking({ restaurant, isOpen, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    pickupTime: '',
    passengers: '2',
    contactNumber: ''
  });

  const handleBooking = () => {
    if (!selectedOption) return;
    
    // In a real app, this would submit to a backend
    alert(`Transport booked! A ${selectedOption.name} will pick you up at ${bookingData.pickupTime}. Total: $${selectedOption.price}`);
    onClose();
    setSelectedOption(null);
    setBookingData({
      pickupLocation: '',
      pickupTime: '',
      passengers: '2',
      contactNumber: ''
    });
  };

  if (!restaurant) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'taxi':
        return '🚕';
      case 'premium':
        return '🚗';
      case 'tour':
        return '🚐';
      default:
        return '🚗';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Book Transport to {restaurant.name}
          </DialogTitle>
          <DialogDescription>
            Choose your preferred transportation option to reach {restaurant.name}. Select from taxi, premium car, or sightseeing tour.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Destination: {restaurant.location} • {restaurant.distance}</span>
          </div>
          
          <div className="grid gap-4">
            <h3 className="font-medium">Choose Transport Option:</h3>
            {transportOptions.map((option) => (
              <Card 
                key={option.id} 
                className={`cursor-pointer transition-all ${selectedOption?.id === option.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedOption(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{getTypeIcon(option.type)}</span>
                        <h4 className="font-medium">{option.name}</h4>
                        <Badge variant="secondary">{option.rating} ⭐</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{option.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Up to {option.capacity} people</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {option.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {option.price}
                      </div>
                      <p className="text-xs text-muted-foreground">per trip</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedOption && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <h3 className="font-medium">Booking Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    value={bookingData.pickupLocation}
                    onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                    placeholder="Enter pickup address"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Pickup Time</Label>
                  <Input
                    id="time"
                    type="datetime-local"
                    value={bookingData.pickupTime}
                    onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={bookingData.passengers} onValueChange={(value) => setBookingData({ ...bookingData, passengers: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: selectedOption.capacity}, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={bookingData.contactNumber}
                    onChange={(e) => setBookingData({ ...bookingData, contactNumber: e.target.value })}
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
              <p className="font-medium">Total Cost: ₹{selectedOption.price}</p>
                  <p className="text-sm text-muted-foreground">Payment on arrival</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleBooking}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}