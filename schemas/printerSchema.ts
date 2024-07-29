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

export interface CartridgeApprovalProps{
  requestId:string;
  cartridgeId:number;
  cartridgeDescription:string;
  requesterName:string;
  profilePic:string;
  reqeusterGrade:string;
  requestedOn:string;
  reason:string;
}

export const REQUEST_ID_STRING = "requestId";
export const CARTRIDGE_ID_STRING = "cartridgeId";
export const CARTRIDGE_DESCRIPTION_STRING = "catridgeDescription";
export const REQUESTOR_NAME_STRING = "requestorName";
export const PROFILE_PIC_STRING = "profilePic";
export const REQUESTOR_GRADE_STRING = "requestorGrade";
export const REQUESTED_ON_STRING = "requestedOn";
export const STOCK_STRING="stock";

export const ID_CARTRIDGE_STRING="id";
export const PRINTER_MODAL_STRING="printerModel";
export const QUANTITY_STRING="quantity";
export const REASON_STRING="reason";
export const STATUS_STRING="status";


export interface CartridgeApprovalProps {
  requestId: string;
  cartridgeId: number;
  cartridgeDescription: string;
  requesterName: string;
  profilePic: string;
  requesterGrade: string;
  requestedOn: string;
  reason: string;
}




export const CartridgeSchemaStockAdd = z.object({
  //id: z.number(), // Assuming id is a number
  cartridgeName: z.string().min(1, {
    message: "Please enter a Cartridge Name.",
  }),
  cartridgeQuantity: z.string().min(1, {
    message: "Please enter a valid Quantity greater than 0.",
  }),
  //lastUpdatedBy: z.number(), // Assuming lastUpdatedBy is a number
  //lastUpdatedOn: z.string(), // Assuming lastUpdatedOn is a string representing date/time
});

export const CartridgeSchemaStockUpdate = z.object({
  //id: z.number(), // Assuming id is a number
  cartridgeQuantity: z.string().min(1, {
    message: "Please enter a valid Quantity greater than 0.",
  }),
  //lastUpdatedBy: z.number(), // Assuming lastUpdatedBy is a number
  //lastUpdatedOn: z.string(), // Assuming lastUpdatedOn is a string representing date/time
});


export interface IAMS_CATRIDGE{
  id: string;
        catrdigeDescription: string;
        stock: string;
        updatedOn:string;
        updatedBy:string;
        assetBatchId:string;
}

export interface DialogProps{
  dialogButtonText:string;
  dialogTitle:string;
  dialogDescription:string;
  
}


const pendingRequests: CartridgeApprovalProps[] = [
  {
    requestId: "REQ001",
    cartridgeId: 123,
    cartridgeDescription: "CYAN 25X15X2",
    requesterName: "John Doe",
    profilePic: "https://example.com/profile-pic.jpg",
    requesterGrade: "Senior Engineer",
    requestedOn: "2024-07-25T09:00:00Z",
    reason: "Need replacement cartridge for urgent printing tasks.",
    reqeusterGrade: "A"
  },
  {
    requestId: "REQ002",
    cartridgeId: 456,
    cartridgeDescription: "MAGENTA 30X20X2",
    requesterName: "Jane Smith",
    profilePic: "https://example.com/jane-profile-pic.jpg",
    requesterGrade: "Junior Developer",
    requestedOn: "2024-07-24T14:30:00Z",
    reason: "Running low on ink, need additional cartridge for upcoming project.",
    reqeusterGrade: "C"
  },
  // Add more dummy data objects as needed
];

export default pendingRequests;
