import { DollarSign, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

export function PricingTransparency({ options, itemName, category }) {
  const bestValue = options.reduce((best, current) => 
    current.price < best.price ? current : best
  );

  const averagePrice = options.reduce((sum, option) => sum + option.price, 0) / options.length;

  const getPriceChangeIcon = (price) => {
    if (price < averagePrice * 0.9) return <TrendingDown className="w-4 h-4 text-green-500" />;
    if (price > averagePrice * 1.1) return <TrendingUp className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      case 'full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Spots';
      case 'full': return 'Fully Booked';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Price Comparison for {itemName}
        </h3>
        <div className="text-sm text-muted-foreground">
          Avg: ${averagePrice.toFixed(0)}
        </div>
      </div>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <Card key={index} className={`${option === bestValue ? 'border-green-500 bg-green-50/50' : ''}`}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{option.provider}</div>
                    {option === bestValue && (
                      <Badge className="bg-green-500 text-white">Best Value</Badge>
                    )}
                    <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(option.availability)}`} />
                    <span className="text-sm text-muted-foreground">
                      {getAvailabilityText(option.availability)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getPriceChangeIcon(option.price)}
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">${option.price}</span>
                        {option.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${option.originalPrice}
                          </span>
                        )}
                      </div>
                      {option.savings && (
                        <div className="text-xs text-green-600">
                          Save ${option.savings}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{option.rating}</span>
                    <span className="text-muted-foreground">({option.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Value Score</span>
                      <span>{Math.round((5 - (option.price / averagePrice - 1)) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((5 - (option.price / averagePrice - 1)) * 20)} className="h-1" />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {option.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hidden Fees Warning */}
                {option.hidden_fees.length > 0 && (
                  <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-yellow-800">Additional Fees May Apply</div>
                        <ul className="text-xs text-yellow-700 mt-1">
                          {option.hidden_fees.map((fee, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <span>•</span>
                              <span>{fee}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant={option === bestValue ? "default" : "outline"}
                  disabled={option.availability === 'full'}
                >
                  {option.availability === 'full' ? 'Fully Booked' : `Book with ${option.provider}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>All prices shown include taxes and mandatory fees</span>
            </div>
            <div className="text-muted-foreground">
              Last updated: just now
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}