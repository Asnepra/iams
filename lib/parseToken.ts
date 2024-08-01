import { UserDataType } from "@/schemas";

export function parseToken(token: string): UserDataType | null {
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
  