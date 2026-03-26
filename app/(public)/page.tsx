
import { getServerSession } from "@/lib/session";
import OnboardingClient from './OnboardingClient';

const OnboardingPage = async () => {
  const session = await getServerSession();

  return (
    <OnboardingClient session={session} />
  );
};

export default OnboardingPage;
