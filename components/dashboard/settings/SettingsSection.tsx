
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SettingsSection({ title, children }: Props) {
  return (
    <Card className="bg-[#0F1623] border border-white/5 rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="space-y-6">{children}</div>
      </CardContent>
    </Card>
  );
};
