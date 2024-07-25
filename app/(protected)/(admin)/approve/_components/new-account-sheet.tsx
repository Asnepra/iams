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
import { useNewAccount } from "./hooks/use-new-accounts";
  
 
  
  type FormValues = z.input<typeof CartridgeSchemaStock>;
  
  const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
  
    // const mutation = useCreateAccount();
  
    const onSubmit = (values: FormValues) => {
      console.log("data cartridge", values);
    };
  
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Catridge</SheetTitle>
            <SheetDescription>
              Create a new catridge item to track your Stock.
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            onSubmit={onSubmit}
            disabled={false}
            defaultValues={{
              cartridgeName: "",
              cartridgeQuantity:""
            }}
          />
        </SheetContent>
      </Sheet>
    );
  };
  
  export default NewAccountSheet;