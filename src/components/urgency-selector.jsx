import { Clock, Coffee, Zap, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const urgencyOptions = [
  {
    id: 'relaxed',
    name: 'Relaxed Explorer',
    description: 'Take your time to discover hidden gems',
    icon: <Coffee className="w-5 h-5" />,
    color: 'bg-green-500',
    features: ['Hidden local spots', 'Detailed reviews', 'Cultural experiences', 'Budget-friendly options'],
    timeframe: 'Planning ahead'
  },
  {
    id: 'moderate',
    name: 'Balanced Traveler',
    description: 'Good balance of quality and convenience',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-blue-500',
    features: ['Top-rated places', 'Moderate pricing', 'Quick booking', 'Popular attractions'],
    timeframe: 'Same day planning'
  },
  {
    id: 'urgent',
    name: 'Quick Decision',
    description: 'Need something great right now',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-red-500',
    features: ['Immediate availability', 'Nearby locations', 'Fast service', 'Instant booking'],
    timeframe: 'Right now'
  }
];

export function UrgencySelector({ selectedUrgency, onUrgencyChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="font-medium">How urgent is your travel plan?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {urgencyOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedUrgency === option.id 
                ? 'border-primary shadow-lg' 
                : 'border-transparent hover:border-primary/50'
            }`}
            onClick={() => onUrgencyChange(option.id)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${option.color} rounded-full flex items-center justify-center text-white`}>
                      {option.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {option.timeframe}
                      </Badge>
                    </div>
                  </div>
                  {selectedUrgency === option.id && (
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
                
                <div className="space-y-2">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}