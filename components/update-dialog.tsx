import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { format } from "date-fns"  // Import the date formatting function
import { PROFILE_PIC_BASE_URL } from "@/schemas"
import { Plus } from "lucide-react"

interface UpdateDialogProps {
  row?: any; // Adjust this type based on your row data
  title?:string;
}

export function UpdateDialog({ row, title }: UpdateDialogProps) {
  // Extract data from the row
  const name = row?.getValue("catrdigeDescription") ?? ""
  const stock = row?.getValue("stock") ?? ""
  const lastUpdated = row?.getValue("updatedOn") ?? ""
  const updatedBy = row?.getValue("updatedBy") ?? ""
  // Ensure updatedBy is a string and pad it to 8 digits if necessary
  const padToEightDigits = (id: any) => {
    const strId = String(id); // Convert to string
    return strId.length < 8 ? '0'.repeat(8 - strId.length) + strId : strId; // Pad with leading zeros
  };
  // Format updatedBy to ensure it is 8 digits long
  const formattedUpdatedBy = padToEightDigits(updatedBy)
  const profilePic = `${PROFILE_PIC_BASE_URL}${formattedUpdatedBy}`

  // Parse and format the date
  const formattedLastUpdated = lastUpdated
    ? format(new Date(lastUpdated), "MMMM d, yyyy h:mm a")
    : "N/A"

  // State for editable fields
  const [editableName, setEditableName] = useState(name)
  const [editableStock, setEditableStock] = useState(stock)

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button size="sm">
          {title ? (
            <>
              <Plus className="size-4 mr-2" />
              {title}
            </>
          ) : (
            "Update Stock"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Details</DialogTitle>
          <DialogDescription>
            Make changes to the details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Profile Picture and Metadata */}
          <div className="flex items-center space-x-4">
            <img
              src={profilePic}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium">{updatedBy}</span>
              <span className="text-sm text-gray-500">
                Last updated: {formattedLastUpdated}
              </span>
            </div>
          </div>
          {/* Editable fields */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              value={editableStock}
              onChange={(e) => setEditableStock(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
