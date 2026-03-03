
"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SettingsSection from "@/components/dashboard/settings/SettingsSection";
import SettingsItem from "@/components/dashboard/settings/SettingsItem";

interface Props {
  user: UserProps;
}

export default function SettingsClient({ user }: Props) {

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-white/50">
          Manage your account preferences and profile settings.
        </p>
      </div>

      {/* PROFILE SECTION */}
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
                className="rounded-full object-cover"
              />
            ) : (
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-indigo-600 text-white">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            )
          }
          action={
            <Button className="h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer">
              Edit
            </Button>
          }
        />

        <SettingsItem
          title="Email Address"
          value={user.email}
          action={
            <Button className="h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer">
              Change
            </Button>
          }
        />
      </SettingsSection>

      {/* NOTIFICATIONS SECTION */}
      <SettingsSection title="Notifications">
        <SettingsItem
          title="Notification Language"
          description="Choose your preferred notification language."
          value="English"
          action={
            <Button className="h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer">
              Edit
            </Button>
          }
        />

        <SettingsItem
          title="Notification Preferences"
          description="Manage trading alerts, news and system messages."
          action={
            <Button className="h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer">
              Manage
            </Button>
          }
        />

        <SettingsItem
          title="Auto Price Alerts"
          description="Receive alerts on price changes for selected assets."
          action={
            <Button className="h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer">
              Manage
            </Button>
          }
        />
      </SettingsSection>
    </div>
  );
};
