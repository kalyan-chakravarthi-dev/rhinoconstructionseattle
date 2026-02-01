import { MapPin, Plus, Home, Building, Pencil, Trash2 } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock addresses data
const mockAddresses = [
  {
    id: 1,
    nickname: "Main Home",
    street: "123 Main Street",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    type: "residential",
    primary: true,
  },
  {
    id: 2,
    nickname: "Rental Property",
    street: "456 Oak Avenue",
    city: "Bellevue",
    state: "WA",
    zip: "98004",
    type: "residential",
    primary: false,
  },
  {
    id: 3,
    nickname: "Office Building",
    street: "789 Business Park Dr",
    city: "Seattle",
    state: "WA",
    zip: "98109",
    type: "commercial",
    primary: false,
  },
];

const SettingsAddresses = () => {
  return (
    <SettingsLayout 
      title="Service Addresses" 
      description="Manage properties for quotes and projects"
    >
      <div className="space-y-6">
        {/* Add New Address Button */}
        <div className="flex justify-end">
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Address Cards */}
        <div className="grid gap-4">
          {mockAddresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {address.type === "commercial" ? (
                        <Building className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Home className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{address.nickname}</h3>
                        {address.primary && (
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/10">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {address.street}
                      </p>
                      <p className="text-muted-foreground">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 capitalize">
                        {address.type} property
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-shrink-0">
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={address.primary}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (hidden when addresses exist) */}
        {mockAddresses.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No addresses yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first property to get started with quotes
              </p>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SettingsLayout>
  );
};

export default SettingsAddresses;
