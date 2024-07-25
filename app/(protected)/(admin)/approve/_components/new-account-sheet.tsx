import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet";

  import { z } from "zod";

import { AccountForm } from "./account-form";
import { CartridgeSchemaStock } from "@/schemas/printerSchema";
  
 
  
  type FormValues = z.input<typeof CartridgeSchemaStock>;
  
  const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
  
    const mutation = useCreateAccount();
  
    const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
          onSuccess: () => {
              onClose()
          }
      })
    };
  
    return (
      <Sheet>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Catridge</SheetTitle>
            <SheetDescription>
              Create a new catridge item to track your Stock.
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
            }}
          />
        </SheetContent>
      </Sheet>
    );
  };
  
  export default NewAccountSheet;