
interface sendEmailProps {
  to: string | null;
  subject: string;
  text: string;
};

export default function sendEmail({
  to,
  subject,
  text,
}: sendEmailProps) {};