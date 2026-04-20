import { EventProvider } from "@/context/EventContext";
import PulseAgent from "@/components/PulseAgent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventProvider>
      {children}
      <PulseAgent />
    </EventProvider>
  );
}
