import { useState } from 'react';
import { MapPin, Navigation, Search, Compass, Globe, ChevronRight, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export function LocationOnboarding({ isOpen, onLocationSelected }) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [step, setStep] = useState('welcome');
  const [locationError, setLocationError] = useState(null);

  const detectCurrentLocation = async () => {
    setIsDetecting(true);
    setLocationError(null);
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setIsDetecting(false);
      setLocationError('Geolocation is not supported by this browser');
      setStep('location');
      return;
    }
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          (error) => {
            // Handle specific geolocation errors
            let errorMessage = 'Location detection failed';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied by user';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable';
                break;
              case error.TIMEOUT:
                errorMessage = 'Location request timed out';
                break;
              default:
                errorMessage = 'Unknown location error';
                break;
            }
            // This is expected behavior, not an error
            reject(new Error(errorMessage));
          }, 
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      });

      // Mock reverse geocoding (in real app, use a geocoding service)
      const mockLocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: 'Downtown',
        country: 'United States',
        address: 'Current Location'
      };

      setIsDetecting(false);
      onLocationSelected(mockLocationData);
    } catch (error) {
      setIsDetecting(false);
      const errorMessage = error instanceof Error ? error.message : 'Location detection failed';
      setLocationError(errorMessage);
      // This is expected behavior when user denies location or it's unavailable
      // Fallback to manual location entry
      setStep('location');
    }
  };

  const handleManualLocation = () => {
    if (!manualLocation.trim()) return;

    // Mock geocoding (in real app, use a geocoding service)
    const mockLocationData = {
      latitude: 40.7128,
      longitude: -74.0060,
      city: manualLocation,
      country: 'United States',
      address: manualLocation
    };

    onLocationSelected(mockLocationData);
  };

  const popularDestinations = [
    { name: 'New York City', country: 'USA', icon: '🗽' },
    { name: 'Paris', country: 'France', icon: '🗼' },
    { name: 'Tokyo', country: 'Japan', icon: '🏯' },
    { name: 'London', country: 'UK', icon: '🏰' },
    { name: 'Rome', country: 'Italy', icon: '🏛️' },
    { name: 'Barcelona', country: 'Spain', icon: '🏖️' }
  ];

  if (step === 'welcome') {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Compass className="w-8 h-8 text-primary" />
                <span className="text-2xl">Welcome to TripMate</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center">
              Your personal travel companion for discovering amazing restaurants and experiences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 text-center">
            <div>
              <p className="text-muted-foreground mb-4">
                Your personal travel companion for discovering the best restaurants, 
                authentic local experiences, and hidden gems wherever you go.
              </p>
              
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Location-Based</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Smart Discovery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Local Authentic</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => setStep('location')} 
              className="w-full"
            >
              Get Started
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Where are you exploring today?
          </DialogTitle>
          <DialogDescription>
            Help us find the best restaurants and experiences near you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Error Alert */}
          {locationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {locationError}. Please enter your location manually below.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Current Location */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Use Current Location</h3>
                    <p className="text-sm text-muted-foreground">Get personalized recommendations nearby</p>
                  </div>
                </div>
                <Button 
                  onClick={detectCurrentLocation}
                  disabled={isDetecting}
                  className="shrink-0"
                >
                  {isDetecting ? 'Detecting...' : 'Allow'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Manual Location */}
          <div className="space-y-3">
            <div className="relative">
              <Label htmlFor="location">Or enter a location manually</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="location"
                  placeholder="Enter city, address, or landmark..."
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
                />
              </div>
            </div>
            <Button 
              onClick={handleManualLocation}
              variant="outline" 
              className="w-full"
              disabled={!manualLocation.trim()}
            >
              Search This Location
            </Button>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-medium mb-3">Popular Destinations</h3>
            <div className="grid grid-cols-2 gap-2">
              {popularDestinations.map((dest, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    const mockLocationData = {
                      latitude: 40.7128,
                      longitude: -74.0060,
                      city: dest.name,
                      country: dest.country,
                      address: `${dest.name}, ${dest.country}`
                    };
                    onLocationSelected(mockLocationData);
                  }}
                >
                  <span className="mr-2">{dest.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium">{dest.name}</div>
                    <div className="text-xs text-muted-foreground">{dest.country}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}