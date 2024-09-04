import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface DialogButtonProps {
  title: string;
  description: string;
  onClose: (id: number, reason: string) => void;
  id: number;
}

const schema = z.object({
  reason: z.string().min(1, "Please enter a reason."),
});

type FormValues = z.infer<typeof schema>;

export function DialogButton({ title, description, onClose, id }: DialogButtonProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    onClose(id, data.reason);
    reset(); // Clear the form fields
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="reason" className="sr-only">
              Reason
            </Label>
            <Input
              id="reason"
              {...register("reason")}
              placeholder="Enter reason here"
              aria-invalid={errors.reason ? "true" : "false"}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
