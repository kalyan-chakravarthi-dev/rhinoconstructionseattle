import { useState, useEffect } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { STORAGE_KEYS } from "@/lib/constants";

// Types
interface NotificationSettings {
  email: {
    quoteUpdates: boolean;
    projectMilestones: boolean;
    paymentReminders: boolean;
    appointmentConfirmations: boolean;
    marketing: boolean;
    newsletter: boolean;
  };
  emailFrequency: 'immediate' | 'daily' | 'weekly';
  sms: {
    quoteSentApproved: boolean;
    appointmentReminders: boolean;
    emergenciesOnly: boolean;
  };
}

// Default settings
const DEFAULT_SETTINGS: NotificationSettings = {
  email: {
    quoteUpdates: true,
    projectMilestones: true,
    paymentReminders: true,
    appointmentConfirmations: true,
    marketing: false,
    newsletter: false,
  },
  emailFrequency: 'immediate',
  sms: {
    quoteSentApproved: true,
    appointmentReminders: true,
    emergenciesOnly: false,
  },
};

// Email notification options
const EMAIL_OPTIONS = [
  { key: 'quoteUpdates' as const, label: 'Quote status updates' },
  { key: 'projectMilestones' as const, label: 'Project milestones' },
  { key: 'paymentReminders' as const, label: 'Payment reminders' },
  { key: 'appointmentConfirmations' as const, label: 'Appointment confirmations' },
  { key: 'marketing' as const, label: 'Marketing emails' },
  { key: 'newsletter' as const, label: 'Newsletter' },
];

// SMS notification options
const SMS_OPTIONS = [
  { key: 'quoteSentApproved' as const, label: 'Quote sent/approved' },
  { key: 'appointmentReminders' as const, label: 'Appointment reminders' },
  { key: 'emergenciesOnly' as const, label: 'Emergencies only' },
];

// Frequency options
const FREQUENCY_OPTIONS = [
  { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
  { value: 'daily', label: 'Daily digest', description: 'One summary email per day' },
  { value: 'weekly', label: 'Weekly summary', description: 'One summary email per week' },
];

// Load settings from localStorage
const loadSettings = (): NotificationSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load notification settings:', e);
  }
  return DEFAULT_SETTINGS;
};

const SettingsNotifications = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings>(loadSettings);

  // Handle email checkbox change
  const handleEmailChange = (key: keyof NotificationSettings['email'], checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: checked,
      },
    }));
  };

  // Handle SMS checkbox change
  const handleSmsChange = (key: keyof NotificationSettings['sms'], checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      sms: {
        ...prev.sms,
        [key]: checked,
      },
    }));
  };

  // Handle frequency change
  const handleFrequencyChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      emailFrequency: value as NotificationSettings['emailFrequency'],
    }));
  };

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (e) {
      console.error('Failed to save notification settings:', e);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    toast({
      title: "Reset complete",
      description: "Settings reset to defaults. Click Save to apply.",
    });
  };

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
                {EMAIL_OPTIONS.map((option) => (
                  <div key={option.key} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`email-${option.key}`}
                      checked={settings.email[option.key]}
                      onCheckedChange={(checked) => handleEmailChange(option.key, checked as boolean)}
                    />
                    <Label htmlFor={`email-${option.key}`} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Label htmlFor="email-frequency" className="text-sm font-medium mb-3 block">
                  Email Frequency
                </Label>
                <Select value={settings.emailFrequency} onValueChange={handleFrequencyChange}>
                  <SelectTrigger id="email-frequency" className="w-full sm:w-64">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              {SMS_OPTIONS.map((option) => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`sms-${option.key}`}
                    checked={settings.sms[option.key]}
                    onCheckedChange={(checked) => handleSmsChange(option.key, checked as boolean)}
                  />
                  <Label htmlFor={`sms-${option.key}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          <Button variant="hero" onClick={saveSettings}>
            Save Preferences
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsNotifications;
