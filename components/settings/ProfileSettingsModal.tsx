
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ProfileSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSettingsModal({
  open,
  onClose,
}: ProfileSettingsModalProps) {
  const [nickname, setNickname] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
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
            className="p-1 rounded-md hover:bg-[var(--bg-hover)] transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-standard)",
            }}
          >
            <span className="text-sm text-[var(--color-60)]">Avatar</span>
          </div>

          <p className="text-xs mt-3 text-[var(--color-50)] text-center">
            You will be able to edit your avatar in 7 days.
          </p>
        </div>

        {/* Nickname Input */}
        <div className="mb-4">
          <label className="text-sm text-[var(--color-60)]">
            Nickname
          </label>

          <div
            className="flex items-center mt-2 border rounded-lg px-3 py-2"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-input)",
            }}
          >
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={60}
              placeholder="Enter nickname"
              className="bg-transparent outline-none flex-1 text-sm"
            />

            <span className="text-xs text-[var(--color-40)]">
              {nickname.length}/60
            </span>
          </div>

          <p className="text-xs mt-2 text-[var(--color-50)]">
            You will be able to edit your nickname in 7 days.
          </p>
        </div>

        {/* Info */}
        <div className="text-xs text-[var(--color-50)] space-y-1 mb-6">
          <p>* Avatar will also be displayed in the platform.</p>
          <p>
            * Nickname will be used across the platform and may be subject to
            moderation.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border text-sm"
            style={{
              borderColor: "var(--border-standard)",
              backgroundColor: "var(--bg-elevated)",
            }}
          >
            Cancel
          </button>

          <button className="flex-1 py-2 rounded-lg text-white text-sm btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
