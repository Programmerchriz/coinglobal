
"use client";

import { useState } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SettingsSection from "@/components/dashboard/settings/SettingsSection";
import SettingsItem from "@/components/dashboard/settings/SettingsItem";
import SettingsButton from "@/components/dashboard/settings/SettingsButton";
import ProfileSettingsModal from "@/components/settings/ProfileSettingsModal";
import { updateTheme } from "@/lib/actions/theme-actions";

interface Props {
  user: UserProps;
}

export default function SettingsClient({ user }: Props) {
  const [ theme, setTheme ] = useState("light");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateTheme(newTheme);
    
    const html = document.documentElement;

    if (newTheme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-(--text-primary)">
          Settings
        </h1>

        <p className="text-sm text-(--color-50)">
          Manage your account preferences and system configuration.
        </p>
      </div>

      {/* PROFILE */}
      <SettingsSection title="Profile">
        <SettingsItem
          title="Nickname & Avatar"
          description="Set your public display name and profile image."
          icon={
            user.image ? (
              <Image
                src={user.image}
                alt=""
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : (
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-(--color-primary) text-white">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            )
          }
          action={<SettingsButton onClick={() => setIsProfileModalOpen(true)}>Edit</SettingsButton>}
        />

        <SettingsItem
          title="Email Address"
          value={user.email}
          action={<SettingsButton>Change</SettingsButton>}
        />
      </SettingsSection>

      {/* NOTIFICATIONS */}
      <SettingsSection title="Notifications">
        <SettingsItem
          title="Notification Language"
          description="Choose your preferred notification language."
          value="English"
          action={<SettingsButton>Edit</SettingsButton>}
        />

        <SettingsItem
          title="Notification Preferences"
          description="Manage alerts, news and system messages."
          action={<SettingsButton>Manage</SettingsButton>}
        />

        <SettingsItem
          title="Auto Price Alerts"
          description="Receive alerts on major price movements."
          action={<SettingsButton>Manage</SettingsButton>}
        />
      </SettingsSection>

      {/* PREFERENCES */}
      <SettingsSection title="Preferences">
        <SettingsItem
          title="Color Preference"
          description="Choose market color display."
          value="Green Up / Red Down"
          action={<SettingsButton>Edit</SettingsButton>}
        />

        <SettingsItem
          title="Style Settings"
          description="Select your UI layout preference."
          value="Compact"
          action={<SettingsButton>Edit</SettingsButton>}
        />

        <SettingsItem
          title="UTC Time Zone"
          description="Adjust platform time zone."
          value="UTC +1"
          action={<SettingsButton>Edit</SettingsButton>}
        />

        <SettingsItem
          title="Theme"
          description="Switch between light and dark mode."
          value={theme === "dark" ? "Dark" : "Light"}
          action={
            <SettingsButton
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}
            </SettingsButton>
          }
        />
      </SettingsSection>

      {/* WITHDRAWAL */}
      <SettingsSection title="Withdrawal">
        <SettingsItem
          title="Withdrawal Whitelist"
          description="Restrict withdrawals to only approved wallet addresses."
          value="OFF"
          action={<SettingsButton>Enable</SettingsButton>}
        />

        <SettingsItem
          title="One-step Withdrawal"
          description="Allow small withdrawals without 2FA confirmation."
          value="OFF"
          action={<SettingsButton>Enable</SettingsButton>}
        />

        <SettingsItem
          title="Withdraw Setting"
          description="Configure on-chain and off-chain withdrawal behavior."
          value="Off-chain withdrawal"
          action={<SettingsButton>Edit</SettingsButton>}
        />
      </SettingsSection>

      {/* TRADE */}
      <SettingsSection title="Trade">
        <SettingsItem
          title="Order Confirmation Reminders"
          description="Require reconfirmation before submitting trades."
          value="Stop-Limit, Margin Orders"
          action={<SettingsButton>Manage</SettingsButton>}
        />

        <SettingsItem
          title="Fee Deduction"
          description="Use platform token to reduce trading fees."
          value="Enabled"
          action={<SettingsButton>Manage</SettingsButton>}
        />
      </SettingsSection>

      {/* LINK ACCOUNT */}
      <SettingsSection title="Linked Accounts">
        <SettingsItem
          title="Link X Account"
          description="Connect your X account to CoinGlobal."
          value={`Linked: ${user.name}`}
          action={<SettingsButton>Link</SettingsButton>}
        />
      </SettingsSection>

      {/* PRIVACY */}
      <SettingsSection title="Privacy">
        <SettingsItem
          title="Download Personal Data"
          description="Download profile, deposits, withdrawals and trade history."
          action={<SettingsButton>Download</SettingsButton>}
        />

        <SettingsItem
          title="Export Transaction Records"
          description="Export trading and funding transaction records."
          action={<SettingsButton>Export</SettingsButton>}
        />

        <SettingsItem
          title="Update Documents"
          description="Update verification and compliance documents."
          action={<SettingsButton>Update</SettingsButton>}
        />

        <SettingsItem
          title="Close Account"
          description="Permanently close your CoinGlobal account."
          action={
            <SettingsButton className="bg-(--color-error-10) text-(--text-error) border-(--color-error-40) hover:bg-(--color-error-20)">
              Delete
            </SettingsButton>
          }
        />
      </SettingsSection>

      <ProfileSettingsModal
        user={user}
        open={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
};
