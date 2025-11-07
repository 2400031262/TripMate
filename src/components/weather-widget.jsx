import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function WeatherWidget({ weather }) {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weather.condition)}
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">{weather.location}</p>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              <span className="text-2xl">{weather.temperature}°C</span>
              <span className="text-sm text-muted-foreground">{weather.condition}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>Wind: {weather.windSpeed} km/h</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">{weather.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}