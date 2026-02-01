
# Implementation Plan: Notifications Settings Page

## Overview
Implement a fully functional Notifications settings page at `/dashboard/settings/notifications` with controlled checkboxes, a frequency dropdown, and localStorage persistence.

---

## 1. Data Model

### Single Settings Object Structure
```text
NotificationSettings {
  email: {
    quoteUpdates: boolean
    projectMilestones: boolean
    paymentReminders: boolean
    appointmentConfirmations: boolean
    marketing: boolean
    newsletter: boolean
  }
  emailFrequency: 'immediate' | 'daily' | 'weekly'
  sms: {
    quoteSentApproved: boolean
    appointmentReminders: boolean
    emergenciesOnly: boolean
  }
}
```

### Default Values
- Email: Quote updates, project milestones, payment reminders, and appointment confirmations enabled by default
- Marketing and newsletter disabled by default
- Email frequency: Immediate
- SMS: Quote sent/approved and appointment reminders enabled, emergencies only disabled

---

## 2. Email Notifications Section

### Checkboxes (6 items)
| Setting | Label | Default |
|---------|-------|---------|
| quoteUpdates | Quote status updates | Enabled |
| projectMilestones | Project milestones | Enabled |
| paymentReminders | Payment reminders | Enabled |
| appointmentConfirmations | Appointment confirmations | Enabled |
| marketing | Marketing emails | Disabled |
| newsletter | Newsletter | Disabled |

### Frequency Dropdown
Replace the current RadioGroup with a Select dropdown:
- **Immediate** - Get notified right away
- **Daily digest** - One summary email per day
- **Weekly summary** - One summary email per week

---

## 3. SMS Notifications Section

### Checkboxes (3 items)
| Setting | Label | Default |
|---------|-------|---------|
| quoteSentApproved | Quote sent/approved | Enabled |
| appointmentReminders | Appointment reminders | Enabled |
| emergenciesOnly | Emergencies only | Disabled |

---

## 4. UI Changes

### Remove Push Notifications Card
The requirements only specify Email and SMS, so the Push Notifications section will be removed.

### Save Button Behavior
- **Save Preferences**: Saves current state to localStorage, shows success toast
- **Reset to Defaults**: Resets all settings to default values (does not auto-save)

### Accessibility
- All checkboxes have proper `id` and `htmlFor` label associations
- Checkbox state is keyboard accessible (Tab + Space to toggle)
- Proper focus indicators maintained from existing Checkbox component

---

## 5. localStorage Persistence

### Storage Key
Add to existing pattern: `rhino_notification_settings`

### Load on Mount
```text
1. Check localStorage for saved settings
2. If found, parse and use
3. If not found, use default values
```

### Save Flow
```text
1. User clicks "Save Preferences"
2. Current state saved to localStorage
3. Success toast shown
```

---

## 6. Mobile Responsiveness

- Checkbox lists stack vertically (already the case)
- Cards stack vertically on mobile
- Buttons use `flex-col-reverse sm:flex-row` pattern (already in place)

---

## Technical Details

### State Variables
```text
- settings: NotificationSettings (main state object)
- hasChanges: boolean (track if user made changes for UX)
```

### Key Functions
- `loadSettings()` - Load from localStorage or defaults
- `handleEmailChange(key, checked)` - Update email preference
- `handleSmsChange(key, checked)` - Update SMS preference
- `handleFrequencyChange(value)` - Update email frequency
- `saveSettings()` - Persist to localStorage + show toast
- `resetToDefaults()` - Reset state to defaults

---

## File Changes

| File | Change |
|------|--------|
| `src/pages/settings/SettingsNotifications.tsx` | Complete rewrite with state management and localStorage |
| `src/lib/constants.ts` | Add `NOTIFICATION_SETTINGS` storage key |

---

## Implementation Steps

1. Add storage key constant to `src/lib/constants.ts`
2. Define TypeScript interface for NotificationSettings
3. Create default settings object
4. Implement useState with localStorage initialization
5. Create controlled Checkbox components for email preferences
6. Replace RadioGroup with Select dropdown for frequency
7. Create controlled Checkbox components for SMS preferences
8. Remove Push Notifications card
9. Implement Save and Reset handlers with toast notifications
10. Add useEffect to track changes (optional UX enhancement)
