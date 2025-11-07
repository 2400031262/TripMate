import { Brain, TrendingUp, Users, Star, MapPin, Clock, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function BestRecommendations({ recommendations, userPreferences, onSelectRecommendation }) {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'high': return 'Book Soon - High Demand';
      case 'medium': return 'Popular Choice';
      case 'low': return 'Good Availability';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI-Powered Best Picks</h2>
            <p className="text-sm text-muted-foreground">
              Curated based on 50,000+ reviews and your preferences
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Smart Recommendations
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card key={rec.id} className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative lg:w-64">
                <ImageWithFallback
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-48 lg:h-full object-cover"
                />
                
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full">
                  <span className="font-bold">#{index + 1} Best Pick</span>
                </div>

                {/* Trending Badge */}
                {rec.trending && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">Trending</span>
                  </div>
                )}

                {/* Booking Urgency */}
                {rec.bookingUrgency && (
                  <div className={`absolute bottom-3 left-3 ${getUrgencyColor(rec.bookingUrgency)} text-white px-2 py-1 rounded text-xs`}>
                    {getUrgencyText(rec.bookingUrgency)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{rec.name}</h3>
                        <p className="text-muted-foreground">{rec.category} • {rec.priceRange}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{rec.location} • {rec.distance}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(rec.aiScore.overall)}`}>
                          {rec.aiScore.overall}
                        </div>
                        <p className="text-xs text-muted-foreground">AI Score</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{rec.rating}</span>
                          <span className="text-sm text-muted-foreground">({rec.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Score Breakdown */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Reviews</span>
                          <span>{rec.aiScore.reviewQuality}</span>
                        </div>
                        <Progress value={rec.aiScore.reviewQuality} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Location</span>
                          <span>{rec.aiScore.locationConvenience}</span>
                        </div>
                        <Progress value={rec.aiScore.locationConvenience} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Value</span>
                          <span>{rec.aiScore.priceValue}</span>
                        </div>
                        <Progress value={rec.aiScore.priceValue} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Match</span>
                          <span>{rec.aiScore.userMatch}</span>
                        </div>
                        <Progress value={rec.aiScore.userMatch} className="h-1" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>

                    {/* Why Recommended */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        Why This is Perfect for You:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.whyRecommended.map((reason, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* User Match Reasons */}
                    {rec.userMatchReasons.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Based on Your Preferences:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {rec.userMatchReasons.map((reason, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Top Reviews */}
                    {rec.topReviews.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">What People Love:</h4>
                        <div className="space-y-2">
                          {rec.topReviews.slice(0, 2).map((review, i) => (
                            <blockquote key={i} className="text-sm italic text-muted-foreground border-l-2 border-primary/20 pl-3">
                              "{review}"
                            </blockquote>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      onClick={() => onSelectRecommendation(rec)}
                      className="w-full"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Choose This Recommendation
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            How Our AI Picks the Best for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <div>
                <h4 className="font-medium mb-1">Analyzes 50,000+ Reviews</h4>
                <p className="text-muted-foreground">We process real customer experiences using advanced sentiment analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <div>
                <h4 className="font-medium mb-1">Matches Your Preferences</h4>
                <p className="text-muted-foreground">Considers your travel style, budget, and past choices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <div>
                <h4 className="font-medium mb-1">Real-Time Updates</h4>
                <p className="text-muted-foreground">Recommendations update based on current availability and trends</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}