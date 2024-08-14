import { useState } from "react";
import { format } from "date-fns"; // Import the date formatting function
import { PROFILE_PIC_BASE_URL } from "@/schemas";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CatridgeForm from "./catridge-form";
import { formatDate } from "@/lib/utils";


interface UpdateDialogProps {
  row?: any; // Adjust this type based on your row data
  title?: string;
  add: boolean;
}

export function UpdateDialog({ row, title, add }: UpdateDialogProps) {
  // Extract data from the row
  const name = row?.getValue("catrdigeDescription") ?? ""
  const stock = row?.getValue("stock") ?? ""
  const lastUpdated = row?.getValue("updatedOn") ?? ""
  const updatedBy = row?.getValue("updatedBy") ?? ""
  const id=row?.getValue("id")??""
  // Ensure updatedBy is a string and pad it to 8 digits if necessary
  const padToEightDigits = (id: any) => {
    const strId = String(id); // Convert to string
    return strId.length < 8 ? '0'.repeat(8 - strId.length) + strId : strId; // Pad with leading zeros
  };
  // Format updatedBy to ensure it is 8 digits long
  const formattedUpdatedBy = padToEightDigits(updatedBy)
  const profilePic = `${PROFILE_PIC_BASE_URL}${formattedUpdatedBy}`

  // Parse and format the date
  const formattedLastUpdated = formatDate(lastUpdated)

  // State for editable fields
  const [editableName, setEditableName] = useState(name)
  const [editableStock, setEditableStock] = useState(stock)
  //console.log("catridge name", name);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          {add ? (
            <>
              <Plus className="size-4 mr-2" />
              {title}
            </>
          ) : (
            <span>{title}</span> 
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{add ? <>{title}</> : <span>{title}</span>}</DialogTitle>
          <DialogDescription>
            Make changes to the details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Profile Picture and Metadata */}
          <div className="flex items-center space-x-4">
            <img src={profilePic} alt="Profile Picture" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col">
              <span className="font-medium">{updatedBy}</span>
              <span className="text-sm text-gray-500">Last updated: {formattedLastUpdated}</span>
            </div>
          </div>
          {/* CatridgeForm */}
          <CatridgeForm isUpdate={!add} catrdigeName={name} catridgeId={id}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
