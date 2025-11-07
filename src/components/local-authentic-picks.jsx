import { Leaf, Heart, Award, MapPin, Users, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';



const typeConfig = {
  local_favorite: {
    icon: <Heart className="w-4 h-4" />,
    label: 'Local Favorite',
    color: 'bg-red-500',
    description: 'Beloved by locals'
  },
  eco_friendly: {
    icon: <Leaf className="w-4 h-4" />,
    label: 'Eco-Friendly',
    color: 'bg-green-500',
    description: 'Sustainable practices'
  },
  family_owned: {
    icon: <Users className="w-4 h-4" />,
    label: 'Family Owned',
    color: 'bg-blue-500',
    description: 'Traditional family business'
  },
  traditional: {
    icon: <Award className="w-4 h-4" />,
    label: 'Traditional',
    color: 'bg-purple-500',
    description: 'Authentic local cuisine'
  }
};

export function LocalAuthenticPicks({ picks, onSelectPick }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-green-500" />
        <div>
          <h2 className="text-xl font-semibold">Authentic Local Picks</h2>
          <p className="text-sm text-muted-foreground">
            Handpicked by locals • Sustainable choices • Authentic experiences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {picks.map((pick) => (
          <Card key={pick.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <ImageWithFallback
                src={pick.image}
                alt={pick.name}
                className="w-full h-48 object-cover"
              />
              
              {/* Type Badge */}
              <div className={`absolute top-3 left-3 ${typeConfig[pick.type].color} text-white px-2 py-1 rounded-full flex items-center gap-1`}>
                {typeConfig[pick.type].icon}
                <span className="text-xs font-medium">{typeConfig[pick.type].label}</span>
              </div>

              {/* Local Score */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  <span className="text-xs font-medium">{pick.localScore}% Local Love</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{pick.name}</h3>
                    <p className="text-sm text-muted-foreground">{pick.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{pick.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">({pick.reviews} reviews)</p>
                  </div>
                </div>

                {/* Location & Established */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{pick.location} • {pick.distance}</span>
                  </div>
                  {pick.established && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Est. {pick.established}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pick.description}
                </p>

                {/* Sustainability Features */}
                {pick.sustainabilityFeatures.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm font-medium text-green-700">
                      <Leaf className="w-3 h-3" />
                      <span>Sustainable Practices</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pick.sustainabilityFeatures.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                          {feature}
                        </Badge>
                      ))}
                      {pick.sustainabilityFeatures.length > 3 && (
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          +{pick.sustainabilityFeatures.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{pick.priceRange}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{typeConfig[pick.type].description}</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => onSelectPick(pick)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why We Recommend */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-1">Why These Picks?</h3>
              <p className="text-sm text-green-700">
                Our local authentic picks are recommended by residents, support sustainable practices, 
                and offer genuine cultural experiences. We partner with community leaders to ensure 
                these businesses truly represent the local culture and values.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}