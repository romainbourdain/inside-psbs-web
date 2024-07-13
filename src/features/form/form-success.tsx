import { CircleCheck } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Typography } from "../../components/ui/typography";

export type FormErrorProps = { message?: string };

export const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <Card variant="success" className="flex w-full items-center gap-2 p-2">
      <CircleCheck size={24} />
      <Typography variant="small">{message}</Typography>
    </Card>
  );
};
