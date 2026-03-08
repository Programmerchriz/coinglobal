
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SettingsSection({ title, children }: Props) {
  return (
    <Card className="bg-(--bg-elevated) border border-(--border-standard) rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-(--text-primary)">
          {title}
        </h2>

        <div className="space-y-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
