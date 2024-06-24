// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const ldap = require('ldapjs');
import * as z from "zod";

// Assuming your LDAP search result is an array of objects
interface LDAPSearchResult {
    // Define the structure of your LDAP search result object
    // This is just an example. You should adjust it based on the actual structure.
    [key: string]: any;
}
async function empLogin(uid: string, pass: string) {
  try {
      const principalName = uid + process.env.PRINCIPAL_NAME;
      const ldapClient = ldap.createClient({ url: `${process.env.LDAP_HOST}` });
      try {
        await new Promise<void>((resolve, reject) => {
          ldapClient.bind(principalName, pass, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });

        // LDAP search example
        const opts = {
          filter: `(&(objectClass=user)(sAMAccountName=${uid}))`,
          scope: 'sub'
        };
        const searchResult = await new Promise<LDAPSearchResult[]>((resolve, reject) => {
          ldapClient.search(`${process.env.LDAP_DN}`, opts, (err: any, res: any) => {
            if (err) {
              reject(err);
            } else {
              const entries: any = [];
              res.on('searchEntry', (entry: any) => {
                entries.push(entry.object);
              });
              res.on('end', () => {
                resolve(entries);
              });
            }
          });
        });

        ldapClient.unbind();
        return searchResult.length > 0;
      } catch (error) {
        //console.error("LDAP search error:", error);
        ldapClient.unbind();
        return false; // Return false for failed login attempt
      }
    
  } catch (error) {
    //console.error("LDAP authentication error:", error);
    return false; // Return false for failed login attempt
  }
}

export async function getUserFromDb(email:string, password:string):Promise<Boolean>{
    const isAuthenticated = await empLogin(email, password);
    return isAuthenticated;
}

