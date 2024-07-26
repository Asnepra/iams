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

interface UpdateDialogProps {
  row: any; // Adjust this type based on your row data
}

export function UpdateDialog({ row }: UpdateDialogProps) {
  // Extract data from the row
  const name = row.getValue("catrdigeDescription") ?? ""
  const stock = row.getValue("stock") ?? ""
  const lastUpdated = row.getValue("updatedOn") ?? ""
  const updatedBy = row.getValue("updatedBy") ?? ""
  const profilePic = row.getValue("profilePic") ?? ""

  // State for editable fields
  const [editableStock, setEditableStock] = useState(stock)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Stock</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
          <DialogDescription>
            Make changes to the details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <img src={profilePic} alt="Profile Picture" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col">
              <span className="font-medium">{updatedBy}</span>
              <span className="text-sm text-gray-500">Last updated: {lastUpdated}</span>
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
              //onChange={(e) => setEditableName(e.target.value)}
              //disabled={true}
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
