import { z } from "zod";

export const CartridgeSchema = z.object({
  assetId: z.string().min(1, {
    message: "Please select a Cartridge.",
  }),
  assetPrinterCatridgeMessage: z.string().min(1, {
    message: "Please enter a message.",
  }),
  assetPrinterCatridgeQuantity: z.string().min(1, {
    message: "Please enter a valid Quantity greater than 0.",
  }),
});


export interface CartridgeType{
    id:number;
    cartridgeName:string;
    cartridgeQuantity:number;
    lastUpdatedBy:number;
    lastUpdatedOn:string;
}