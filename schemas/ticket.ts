export interface TicketCatProps {
    ticketCatId: number;
    mainCatId: number;
    mainCatName: string;
    subCatId: number;
    subCatName: string;
}


export interface USER_ASSET{
    assetBatchId:number;
    assetMake:string;
    assetModel:string;
    categoryName:string;
    subcategoryName:string;
}

export interface TICKET_STATUS_ID{
    TICKET_STATUS_ID:number;
    TICKET_STATUS_DESCRIPTION:string;
}