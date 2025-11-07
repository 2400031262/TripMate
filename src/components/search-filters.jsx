import { Search, Filter, Star, MapPin, Camera, DollarSign } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function SearchFilters({ searchQuery, onSearchChange, filters, onFiltersChange }) {
  const cuisineTypes = [
    'All Cuisines',
    'Italian',
    'Japanese',
    'French',
    'Mediterranean',
    'Asian Fusion',
    'American',
    'Mexican',
    'Indian',
    'Thai'
  ];

  const priceRanges = [
    'All Prices',
    '₹',
    '₹₹',
    '₹₹₹',
    '₹₹₹₹'
  ];

  const clearFilters = () => {
    onFiltersChange({
      cuisine: 'All Cuisines',
      priceRange: 'All Prices',
      rating: [0],
      photoSpots: false,
      emergency: false,
      distance: [10]
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== 'All Cuisines' && value !== 'All Prices';
    if (Array.isArray(value)) return value[0] > 0 && value[0] < 10;
    return false;
  }).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search restaurants, cuisine, or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={filters.photoSpots ? "default" : "outline"} 
          className="cursor-pointer"
          onClick={() => onFiltersChange({ ...filters, photoSpots: !filters.photoSpots })}
        >
          <Camera className="w-3 h-3 mr-1" />
          Great Photo Spots
        </Badge>
        <Badge 
          variant={filters.emergency ? "default" : "outline"} 
          className="cursor-pointer"
          onClick={() => onFiltersChange({ ...filters, emergency: !filters.emergency })}
        >
          Emergency Services
        </Badge>
        <Badge 
          variant={filters.rating[0] >= 4 ? "default" : "outline"} 
          className="cursor-pointer"
          onClick={() => onFiltersChange({ ...filters, rating: filters.rating[0] >= 4 ? [0] : [4] })}
        >
          <Star className="w-3 h-3 mr-1" />
          4+ Rating
        </Badge>
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={filters.cuisine} onValueChange={(value) => onFiltersChange({ ...filters, cuisine: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cuisine Type" />
          </SelectTrigger>
          <SelectContent>
            {cuisineTypes.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((price) => (
              <SelectItem key={price} value={price}>
                {price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Advanced Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Minimum Rating: {filters.rating[0]} stars
                  </Label>
                  <Slider
                    value={filters.rating}
                    onValueChange={(value) => onFiltersChange({ ...filters, rating: value })}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Maximum Distance: {filters.distance[0]} km
                  </Label>
                  <Slider
                    value={filters.distance}
                    onValueChange={(value) => onFiltersChange({ ...filters, distance: value })}
                    max={10}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="photo-spots" className="text-sm font-medium">
                    Great Photo Spots
                  </Label>
                  <Switch
                    id="photo-spots"
                    checked={filters.photoSpots}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, photoSpots: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency" className="text-sm font-medium">
                    Near Emergency Services
                  </Label>
                  <Switch
                    id="emergency"
                    checked={filters.emergency}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, emergency: checked })}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}