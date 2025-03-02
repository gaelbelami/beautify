import { Spotlight } from "@/components/ui/spotlight";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-black">
      <div className="container relative min-h-screen flex items-center justify-center">
        <Spotlight />
        {children}
      </div>
    </div>
  );
}
