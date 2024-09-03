import { UserData } from "@/schemas";

export function parseToken(token: string): UserData | null {
    try {
      const [, payloadBase64] = token.split('.');
      const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }


// Function to pad a number or string to 8 digits
const padToEightDigits = (id: any): string => {
    const strId = String(id); // Convert to string
    return strId.length < 8 ? '0'.repeat(8 - strId.length) + strId : strId; // Pad with leading zeros
  };
  
  // Function to get the full profile URL
  export function getFullProfileUrl(employeeNumber: string): string {
    const paddedEmployeeNumber = padToEightDigits(employeeNumber); // Corrected parameter
    const url = `https://xsparsh.indianoil.in/allempphoto/EmpPhoto/${paddedEmployeeNumber}`;
    return url;
  }
  

  
  