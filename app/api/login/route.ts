import mssqlconnect from "@/lib/mssqlconnect";
import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";
const sql = require('mssql')

const ldap = require('ldapjs');
import jwt from 'jsonwebtoken'
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


async function hasAdminPrivilages(email:string){
    await mssqlconnect();
    //Fetch all the countries data
    const result = await sql.query`SELECT * FROM UserMaster WHERE EmployeeNumber=${email}`;
    // Map the result to a JSON format
    const empData = result.recordset.map((record: any) => ({
        userName:record.EmployeeName,
      userRole: record.UserRole,
      userEmail:record.EmpMail,
      userDepartment:record.EmpDepartment,
      userPic:record.EmpProfilePic
      // Add more fields as needed
    }));
    //console.log("data from DB", empData);
    return empData;
    
}

export const POST = async (req: Request, res: Response) => {
  try {
    const value: z.infer<typeof LoginSchema> = await req.json();

    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) {
      return NextResponse.json({
        error: "Invalid fields",
        status: 400,
      });
    }

    const { email, password } = validatedFields.data;
    let isAuthenticated=false;

    // try{
    //   isAuthenticated = await empLogin(email, password);
    // }catch(errror){
    //   console.log("auth error");
    // }

        //console.log(isAuthenticated ? "Login successful" : "Login failed");
        //console.log("user ",isAuthenticated);
        let user;
        
            user = await hasAdminPrivilages(email);
        
        let userName;
        let userRole;
        let userDepartment;

        let mail;
        let userProfilePic;
        if (user.length > 0) {
        userName = user[0].userName; // Assign user name
        userRole = user[0].userRole;
        userDepartment=user[0].userDepartment; // Assign user role
        mail=user[0].userEmail;
        userProfilePic=user[0].userPic;
        //console.log("mail", mail);
        }
        const { JWT_SECRET } = process.env;

        const token = jwt.sign({ userId: email, userRole:userRole, userName:userName,userMail:mail, userDepartment:userDepartment, userProfilePic }, `${JWT_SECRET}`, {
          expiresIn: '10m',
        })
    

    return NextResponse.json({
      Message: "Authentication successful",
      status: 200,
      user: isAuthenticated,
      userNumber:email,
      userName:userName,
      hasAdminPrivilages:userRole,
      token:token // Sending authenticated user ID in response
    });
  
  
  } catch (error) {
    console.error("API endpoint error:", error);
    return NextResponse.json({
      Message: "Internal server error",
      status: 500,
    });
  }
};

