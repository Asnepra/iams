import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CartridgeSchemaStockUpdate } from "@/schemas/printerSchema";


type FormValues = z.input<typeof CartridgeSchemaStockUpdate>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(CartridgeSchemaStockUpdate),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="cartridgeQuantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cartridge Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g Magenta-MXX5L"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="cartridgeQuantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cartridge Stock Quantity</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  type="number"
                  placeholder="e.g 0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Catridge"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete Entry
          </Button>
        )}
      </form>
    </Form>
  );
};