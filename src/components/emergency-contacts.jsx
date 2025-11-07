import { Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const emergencyContacts = [
  {
    name: "City General Hospital",
    phone: "108",
    address: "123 Medical Center Dr",
    distance: "0.8 km",
    type: "hospital"
  },
  {
    name: "Tourist Police Station",
    phone: "+1-555-0100",
    address: "456 Safety Street",
    distance: "0.5 km",
    type: "police"
  },
  {
    name: "Fire Department",
    phone: "+1-555-0911",
    address: "789 Rescue Road",
    distance: "1.2 km",
    type: "fire"
  },
  {
    name: "Tourist Information Center",
    phone: "+1-555-0199",
    address: "321 Help Avenue",
    distance: "0.3 km",
    type: "tourist"
  }
];

export function EmergencyContacts() {
  const getIcon = (type) => {
    switch (type) {
      case 'hospital':
        return '🏥';
      case 'police':
        return '👮';
      case 'fire':
        return '🚒';
      case 'tourist':
        return 'ℹ️';
      default:
        return '📞';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getIcon(contact.type)}</span>
                  <h4 className="font-medium">{contact.name}</h4>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => window.open(`tel:${contact.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{contact.address} • {contact.distance}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Universal Emergency Number</span>
            </div>
            <p className="text-sm text-red-700">For immediate emergencies, dial <strong>100</strong></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}