const sql = require('mssql')
async function connectToDatabase() {
    const config={
    server: "10.14.91.29",
    database: "IAMS",
    user: "sa",
    password: "iocl@123",
    //driver: "msnodesqlv8",
    options: {
      encrypt: false, // Set to true if you are using a secure connection (HTTPS)
      trustedConnection: true, // Set to true if you are using Windows Authentication
      instancename:'SQLEXPRESS'

    },
    port:1433
  
}
const sconfig={
    server: "10.14.91.29",
    database: "BDINTRANET",
    user: "sa",
    password: "iocl@123",
    //driver: "msnodesqlv8",
    options: {
      encrypt: false, // Set to true if you are using a secure connection (HTTPS)
      trustedConnection: true, // Set to true if you are using Windows Authentication
      instancename:'SQLEXPRESS'

    },
    port:1433
  
}
    try {
          await sql.connect(sconfig);
          const result = await sql.query`SELECT * FROM AssetMaster`;

        //console.log("Connected to the MS SQL database");
    } catch (error) {
      console.error("Connect to DB Error Error connecting to the database:", error);
    }
  }