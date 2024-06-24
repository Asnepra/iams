import { AlertTriangleIcon } from "lucide-react";

type Props = { message?: string };
const FormError = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className=" w-full bg-destructive/15 flex items-center gap-x-2 p-3 text-destructive text-sm rounded-md">
      <AlertTriangleIcon className="w-4 h-4" /> <p>{message}</p>
    </div>
  );
};
export default FormError;
