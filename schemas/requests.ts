// Define the TypeScript interface for PendingCatridgeRequestProps
export interface PendingCatridgeRequestProps {
    transId: number;
    assetName: string;
    cartridgeId: number;
    requestedQty: string;
    approvedQty: string;
    statusId: number;
    requestedBy: string;
    requestedOn: string;
    approvedBy: string;
    approvedOn: string;
    requesterName: string;
    cartridgeDescription: string;
    availableQuantity:number;
    cartridgeReturned:boolean;
}

// Define constants for the property names
export const TRANS_ID = "transId";
export const ASSET_NAME = "assetName";
export const CARTRIDGE_ID = "cartridgeId";
export const REQUESTED_QTY = "requestedQty";
export const APPROVED_QTY = "approvedQty";
export const STATUS_ID = "statusId";
export const REQUESTED_BY = "requestedBy";
export const REQUESTED_ON = "requestedOn";
export const APPROVED_BY = "approvedBy";
export const APPROVED_ON = "approvedOn";
export const REQUESTER_NAME = "requesterName";
export const CARTRIDGE_DESCRIPTION = "cartridgeDescription";
