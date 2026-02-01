
# Implementation Plan: Security Settings Page

## Overview
Implement a fully functional Security settings page at `/dashboard/settings/security` with password change form, 2FA setup UI, and active sessions management.

---

## 1. Change Password Form

### Fields and State Management
- **Current Password**: Text input with show/hide toggle
- **New Password**: Text input with show/hide toggle + real-time validation
- **Confirm New Password**: Text input with show/hide toggle

### Validation Logic
Create password validation checks that update in real-time:
- At least 8 characters
- One uppercase letter (A-Z)
- One lowercase letter (a-z)
- One number (0-9)
- One special character (!@#$%^&*...)

Each requirement displays with a checkmark (green) or bullet (gray) based on current input.

### Additional Validation
- Confirm password must match new password
- Current password field must not be empty
- Display inline error messages for validation failures

### Actions
- **Update Password** button: Validates all fields, shows success toast on pass
- **Forgot Password?** link: UI only (no navigation)

---

## 2. Two-Factor Authentication Section

### Toggle Behavior
- Switch toggle for Enable/Disable 2FA
- When toggled ON: Show setup wizard UI
- When toggled OFF: Collapse setup UI, show confirmation toast

### Setup Wizard (UI Only)
When 2FA is enabled, display:

1. **QR Code Placeholder**
   - Gray box with QR code icon
   - Text: "Scan with your authenticator app"
   - Manual entry code: "RHINO-2FA-DEMO-CODE"

2. **Verification Input**
   - 6-digit code input field
   - "Verify Code" button
   - Simulates verification (any 6-digit code works)

3. **Backup Codes Section**
   - Display 8 mock backup codes in a grid
   - "Copy All" and "Download" buttons (UI only)
   - Warning text about storing codes safely

### Status Indicators
- "2FA Active" badge when enabled and verified
- "Setup Required" state when enabled but not verified

---

## 3. Active Sessions List

### Mock Data Structure
```text
Sessions array with:
- Device type (browser/mobile icon)
- Device description (e.g., "Chrome on Windows")
- Location (e.g., "Seattle, WA")
- Last active time
- Current session flag
```

### Display
- Card for each session with device icon
- "Current" badge for active session
- "Sign Out" button for non-current sessions

### Actions
- **Individual Sign Out**: Removes session from list, shows toast
- **Sign out of all other devices**: 
  - Opens confirmation dialog (AlertDialog)
  - On confirm: Removes all non-current sessions, shows success toast

---

## Technical Details

### State Variables
```text
- currentPassword, newPassword, confirmPassword (strings)
- showCurrentPassword, showNewPassword, showConfirmPassword (booleans)
- passwordErrors (object for field-level errors)
- twoFactorEnabled (boolean)
- twoFactorVerified (boolean)
- verificationCode (string)
- sessions (array - mock data, managed in state for removal)
- showSignOutDialog (boolean for confirmation modal)
```

### Password Validation Helper
Real-time validation function returning object:
```text
{
  minLength: boolean,
  hasUppercase: boolean,
  hasLowercase: boolean,
  hasNumber: boolean,
  hasSpecial: boolean
}
```

### Components Used
- Card, CardHeader, CardTitle, CardDescription, CardContent
- Input, Label, Button, Switch, Badge
- AlertDialog (for sign out confirmation)
- Icons: Shield, Smartphone, Monitor, Eye, EyeOff, Check, Copy, Download, QrCode, Key

### Accessibility
- Proper aria-invalid on inputs with errors
- aria-describedby linking inputs to error messages
- Button aria-labels for icon-only actions

---

## Mobile Responsiveness

- Password requirements stack vertically on small screens
- Session cards use flex-wrap for device info
- Backup codes grid: 2 columns on mobile, 4 on desktop
- Full-width buttons on mobile

---

## File Changes

| File | Change |
|------|--------|
| `src/pages/settings/SettingsSecurity.tsx` | Complete rewrite with all sections |

---

## Mock Data

### Backup Codes
```text
RHINO-A1B2-C3D4
RHINO-E5F6-G7H8
RHINO-I9J0-K1L2
RHINO-M3N4-O5P6
RHINO-Q7R8-S9T0
RHINO-U1V2-W3X4
RHINO-Y5Z6-A7B8
RHINO-C9D0-E1F2
```

### Sessions (already defined in skeleton, will keep similar structure)
```text
- Chrome on Windows | Seattle, WA | Now | Current
- Safari on iPhone | Seattle, WA | 2 hours ago
- Firefox on MacOS | Portland, OR | 3 days ago
```
