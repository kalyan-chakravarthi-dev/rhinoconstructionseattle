import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const SettingsNotifications = () => {
  return (
    <SettingsLayout 
      title="Notification Preferences" 
      description="Choose how and when you'd like to be notified"
    >
      <div className="space-y-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Email Notifications</CardTitle>
                <CardDescription>
                  Manage which emails you receive
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { id: "quoteUpdates", label: "Quote status updates", checked: true },
                  { id: "projectMilestones", label: "Project milestones", checked: true },
                  { id: "paymentReminders", label: "Payment reminders", checked: true },
                  { id: "appointmentConfirm", label: "Appointment confirmations", checked: true },
                  { id: "marketingEmails", label: "Marketing emails", checked: false },
                  { id: "newsletter", label: "Newsletter", checked: false },
                  { id: "specialOffers", label: "Special offers", checked: false },
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Checkbox id={item.id} defaultChecked={item.checked} />
                    <Label htmlFor={item.id} className="font-normal">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Label className="text-sm font-medium mb-3 block">Email Frequency</Label>
                <RadioGroup defaultValue="immediately" className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="immediately" id="immediately" />
                    <Label htmlFor="immediately" className="font-normal">Immediately</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="font-normal">Daily digest</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="font-normal">Weekly summary</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg">SMS Notifications</CardTitle>
                <CardDescription>
                  Get text messages for important updates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "smsQuote", label: "Quote approved/sent", checked: true },
                { id: "smsAppointment", label: "Appointment reminders", checked: true },
                { id: "smsEmergency", label: "Emergency updates only", checked: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox id={item.id} defaultChecked={item.checked} />
                  <Label htmlFor={item.id} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Push Notifications</CardTitle>
                <CardDescription>
                  Receive notifications on your mobile device
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Enable Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get real-time updates on your phone
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Button variant="outline">Reset to Defaults</Button>
          <Button variant="hero">Save Preferences</Button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsNotifications;
