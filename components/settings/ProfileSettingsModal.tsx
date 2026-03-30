
"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { updateUsername } from "../../lib/actions/username-actions";
import { saveUserAvatar } from "@/lib/actions/profile-actions";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

interface ProfileSettingsModalProps {
  user: UserProps;
  open: boolean;
  onClose: () => void;
}

export default function ProfileSettingsModal({
  user,
  open,
  onClose,
}: ProfileSettingsModalProps) {
  const router = useRouter();
  
  const [username, setUsername] = useState(user.username);
  const [userImage, setUserImage] = useState(user.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    try {
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to create upload URL");
      const { url, publicUrl } = await presignRes.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload image");

      await saveUserAvatar(publicUrl);
      setUserImage(publicUrl);
      router.refresh();
      toast.success("Profile image updated!");
      
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");

    } finally {
      setIsUploading(false);
      e.target.value = "";
    };
  };

  const handleUploadImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const handleUsernameUpdate = async () => {
    setIsLoading(true);
  
    try {
      await updateUsername(username);
      toast.success("Username updated!", {
        description: "Your username has been updated successfully.",
      });

      onClose();
    } catch (error) {
      toast.error("Error updating username", {
        description: "There was an error updating your username. Please try again.",
      });

      console.error("Error updating username:", error);
    } finally {
      setIsLoading(false);
    };
  };

  if (!open) return null;

  return (
    isLoading ?
      (
        <Loading />
      ) :
      (
        <div className="fixed inset-0 z-50 flex items-center justify-center fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm hover:cursor-pointer"
            onClick={onClose}
          />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Modal */}
          <div
            className="relative w-[92%] max-w-md rounded-2xl border p-6 shadow-xl"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-standard)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Edit Profile</h2>

              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-(--bg-hover) transition"
              >
                <X size={18} className="hover:cursor-pointer" />
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center relative group">
              <button
                className="w-16 h-16 rounded-full flex items-center justify-center border relative hover:cursor-pointer"
                onClick={handleUploadImage}
                disabled={isUploading}
              >
                {
                  isUploading ? (
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-(--bg-elevated)">
                      <div className="w-5 h-5 border-2 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : user.image ? (
                    <Image
                      src={userImage}
                      alt=""
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center bg-(--bg-elevated) border border-(--border-standard)"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-(--color-primary) text-white text-lg">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )
                }
              </button>

              <button
                className="absolute -bottom-1 right-40 w-7 h-7 rounded-full border-2 border-(--bg-surface) flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 bg-(--bg-elevated) hover:cursor-pointer"
                style={{
                  borderColor: "var(--bg-elevated)",
                  backgroundColor: "var(--bg-surface)",
                }}
                onClick={handleUploadImage}
              >
                <Camera className="w-4 h-4 text-(--color-50)" />
              </button>
            </div>

            <div className="items-center text-center text-(--color-60) mb-6">
              <p>@{username}</p>
            </div>

            {/* Username Input */}
            <div className="mb-4">
              <label className="text-sm text-(--color-60)">
                Username
              </label>

              <div
                className="flex items-center mt-2 border rounded-lg px-3 py-2"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  borderColor: "var(--border-input)",
                }}
              >
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={20}
                  placeholder="Enter Username"
                  className="bg-transparent outline-none flex-1 text-sm"
                />

                <span className="text-xs text-(--color-40)">
                  {username.length}/20
                </span>
              </div>

              {/* <p className="text-xs mt-2 text-(--color-50)">
                You will be able to edit your username in 7 days.
              </p> */}
            </div>

            {/* Info */}
            <div className="text-xs text-(--color-50) space-y-1 mb-6">
              <p>* Avatar will also be displayed in the platform.</p>
              <p>
                * Username will be used across the platform and may be subject to
                moderation.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border text-sm hover:cursor-pointer"
                style={{
                  borderColor: "var(--border-standard)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleUsernameUpdate}
                className="flex-1 py-2 rounded-lg text-white text-sm btn-primary hover:cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>
      )
  );
};
