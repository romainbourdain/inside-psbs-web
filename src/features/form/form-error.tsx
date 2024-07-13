import { AlertTriangle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Typography } from "../../components/ui/typography";

export type FormErrorProps = { message?: string };

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <Card variant="error" className="flex w-full items-center gap-2 p-2">
      <AlertTriangle size={24} />
      <Typography variant="small">{message}</Typography>
    </Card>
  );
};
