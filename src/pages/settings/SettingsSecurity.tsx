import { Shield, Smartphone, Monitor, Eye, EyeOff, Check, Copy, Download, QrCode, Key } from "lucide-react";
import { useState } from "react";
import { SettingsLayout } from "@/components/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock session data
const initialSessions = [
  { id: 1, device: "Chrome on Windows", location: "Seattle, WA", lastActive: "Now", current: true },
  { id: 2, device: "Safari on iPhone", location: "Seattle, WA", lastActive: "2 hours ago", current: false },
  { id: 3, device: "Firefox on MacOS", location: "Portland, OR", lastActive: "3 days ago", current: false },
];

// Mock backup codes
const backupCodes = [
  "RHINO-A1B2-C3D4",
  "RHINO-E5F6-G7H8",
  "RHINO-I9J0-K1L2",
  "RHINO-M3N4-O5P6",
  "RHINO-Q7R8-S9T0",
  "RHINO-U1V2-W3X4",
  "RHINO-Y5Z6-A7B8",
  "RHINO-C9D0-E1F2",
];

// Password validation helper
const validatePassword = (password: string) => ({
  minLength: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

const SettingsSecurity = () => {
  const { toast } = useToast();
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{ current?: string; confirm?: string }>({});

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Sessions state
  const [sessions, setSessions] = useState(initialSessions);

  // Real-time password validation
  const passwordValidation = validatePassword(newPassword);
  const allPasswordRequirementsMet = Object.values(passwordValidation).every(Boolean);

  const handleUpdatePassword = () => {
    const errors: { current?: string; confirm?: string } = {};

    if (!currentPassword) {
      errors.current = "Current password is required";
    }
    if (newPassword !== confirmPassword) {
      errors.confirm = "Passwords do not match";
    }
    if (!allPasswordRequirementsMet) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your new password meets all requirements.",
        variant: "destructive",
      });
      return;
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length === 0 && allPasswordRequirementsMet) {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordErrors({});
    }
  };

  const handleToggle2FA = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    if (!enabled) {
      setTwoFactorVerified(false);
      setVerificationCode("");
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been turned off.",
      });
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      setTwoFactorVerified(true);
      toast({
        title: "2FA Verified",
        description: "Two-factor authentication is now active on your account.",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast({
      title: "Codes copied",
      description: "Backup codes have been copied to your clipboard.",
    });
  };

  const handleDownloadBackupCodes = () => {
    toast({
      title: "Download started",
      description: "Backup codes are being downloaded.",
    });
  };

  const handleSignOutSession = (sessionId: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    toast({
      title: "Session ended",
      description: "The device has been signed out.",
    });
  };

  const handleSignOutAllOtherDevices = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    toast({
      title: "All other sessions ended",
      description: "You have been signed out of all other devices.",
    });
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">•</span>
      )}
      <span className={met ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>{text}</span>
    </div>
  );

  return (
    <SettingsLayout 
      title="Account Security" 
      description="Manage your password and security settings"
    >
      <div className="space-y-6">
        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
            <CardDescription>
              Update your password regularly to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (passwordErrors.current) {
                        setPasswordErrors((prev) => ({ ...prev, current: undefined }));
                      }
                    }}
                    aria-invalid={!!passwordErrors.current}
                    aria-describedby={passwordErrors.current ? "currentPassword-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordErrors.current && (
                  <p id="currentPassword-error" className="text-sm text-destructive">
                    {passwordErrors.current}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input 
                    id="newPassword" 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordErrors.confirm) {
                        setPasswordErrors((prev) => ({ ...prev, confirm: undefined }));
                      }
                    }}
                    aria-invalid={!!passwordErrors.confirm}
                    aria-describedby={passwordErrors.confirm ? "confirmPassword-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordErrors.confirm && (
                  <p id="confirmPassword-error" className="text-sm text-destructive">
                    {passwordErrors.confirm}
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-muted rounded-lg p-4 text-sm space-y-2">
                <p className="font-medium text-foreground mb-2">Password must contain:</p>
                <PasswordRequirement met={passwordValidation.minLength} text="At least 8 characters" />
                <PasswordRequirement met={passwordValidation.hasUppercase} text="One uppercase letter (A-Z)" />
                <PasswordRequirement met={passwordValidation.hasLowercase} text="One lowercase letter (a-z)" />
                <PasswordRequirement met={passwordValidation.hasNumber} text="One number (0-9)" />
                <PasswordRequirement met={passwordValidation.hasSpecial} text="One special character (!@#$%^&*...)" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="hero" onClick={handleUpdatePassword}>Update Password</Button>
                <Button variant="link" className="text-secondary">Forgot Password?</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </div>
              {twoFactorEnabled && twoFactorVerified && (
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  <Shield className="w-3 h-3 mr-1" />
                  2FA Active
                </Badge>
              )}
              {twoFactorEnabled && !twoFactorVerified && (
                <Badge variant="secondary">
                  <Key className="w-3 h-3 mr-1" />
                  Setup Required
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Enable 2FA</p>
                <p className="text-sm text-muted-foreground">
                  Use an authenticator app to generate verification codes
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
              />
            </div>

            {/* 2FA Setup Wizard */}
            {twoFactorEnabled && !twoFactorVerified && (
              <div className="space-y-6 border-t pt-6">
                {/* QR Code Placeholder */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Step 1: Scan QR Code</h4>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                      <QrCode className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                      </p>
                      <div className="bg-muted rounded p-3">
                        <p className="text-xs text-muted-foreground mb-1">Or enter this code manually:</p>
                        <code className="text-sm font-mono font-medium text-foreground">RHINO-2FA-DEMO-CODE</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Input */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Step 2: Verify Code</h4>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-sm">
                    <Input
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      className="font-mono text-center text-lg tracking-widest"
                    />
                    <Button onClick={handleVerifyCode} className="shrink-0">
                      Verify Code
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Codes (shown when 2FA is verified) */}
            {twoFactorEnabled && twoFactorVerified && (
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-medium text-foreground">Backup Codes</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyBackupCodes}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy All
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadBackupCodes}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {backupCodes.map((code, index) => (
                    <code key={index} className="bg-muted rounded px-3 py-2 text-sm font-mono text-center">
                      {code}
                    </code>
                  ))}
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 rounded-lg p-3">
                  ⚠️ Store these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Sessions</CardTitle>
            <CardDescription>
              Manage devices where you're currently logged in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div 
                  key={session.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                      {session.device.includes("iPhone") ? (
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Monitor className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">{session.device}</p>
                        {session.current && (
                          <Badge variant="secondary" className="text-xs">Current</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive w-full sm:w-auto"
                      onClick={() => handleSignOutSession(session.id)}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}

              {sessions.filter(s => !s.current).length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Sign out of all other devices
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign out of all other devices?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will end all sessions except your current one. You'll need to sign in again on those devices.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOutAllOtherDevices}>
                        Sign Out All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default SettingsSecurity;
