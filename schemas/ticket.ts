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

export interface COMPLAINTS_COLUMN{
    TICKET_ID:number;
    ASSET_ID:number;
    ASSET_NAME:string;
    TICKET_RAISED_BY_USER_NAME:string;
    TICKET_CATEGORY_DESCRIPTION:string;
    TICKET_STATUS_DESCRIPTION:string;
    TICKET_RAISED_ON:string;
    TICKET_ASSIGNED_TO:string;
    TICKET_ASSIGNED_ON:string;
    TICKET_ASSIGNED_BY_USER:string;
    TICKET_RESOLVED_BY_USER:string;
    TICKET_RESOLVED_ON:string;
    TICKET_REMARKS:string;
    TICKET_IMAGE:string;

}