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

export interface COMPLAINTS_COLUMN {
    TICKET_ID: number;                       // Unique identifier for the ticket
    TICKET_DESC: string;                     // Description of the ticket
    TICKET_STATUS_ID: number;                // Status ID of the ticket
    TICKET_RAISED_ON: string;                // Date and time when the ticket was raised
    TICKET_CAT_ID: number;                   // Category ID of the ticket
    TICKET_ASSIGNED_TO: string | null;       // User assigned to the ticket (null if not assigned)
    TICKET_ASSIGNED_ON: string | null;       // Date and time when the ticket was assigned (null if not assigned)
    EMPLOYEE_NUMBER: string;                  // Employee number of the ticket raiser
    EMPLOYEE_NAME: string;                    // Name of the employee who raised the ticket
    EMP_DEPARTMENT: string;                   // Department of the employee
    EMP_MAIL: string;                         // Email of the employee
    DESIGNATION: string;                      // Designation of the employee
    ASSET_MAKE: string;                      // Make of the asset related to the ticket
    ASSET_MODEL: string;                     // Model of the asset related to the ticket
    TICKET_STATUS_DESCRIPTION: string;       // Description of the ticket status
    MAIN_CAT_ID: number;                     // Main category ID of the ticket
    MAIN_CAT_NAME: string;                   // Main category name of the ticket
    SUB_CAT_ID: number;                      // Subcategory ID of the ticket
    SUB_CAT_NAME: string;                    // Subcategory name of the ticket
    TICKET_REMARKS: string | null;           // Remarks associated with the ticket (null if not present)
    TICKET_IMAGE: string | null;             // Image associated with the ticket (null if not present)
    TICKET_ASSIGNED_BY_USER: string | null;  // User who assigned the ticket (null if not applicable)
    TICKET_RESOLVED_BY_USER: string | null;  // User who resolved the ticket (null if not resolved)
    TICKET_RESOLVED_ON: string | null;       // Date and time when the ticket was resolved (null if not resolved)
}


// Interface for Asset
export interface TICKET_FOR_USER {
    employeeNumber: string;
    employeeName: string;
    empDepartment: string;
    empMail: string;
    userRole: string;
    designation: string;
    statusDescription: string;
    assetMake: string;
    assetModel: string;
    categoryName: string;
  }
  
  // Interface for User
  export interface HELPDESK_USER {
    employeeNumber: string;
    employeeName: string;
    empDepartment: string;
    empMail: string;
    empProfilePic: string;
    userRole: string;
    designation: string;
    designationName: string;
  }
  
