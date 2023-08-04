const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

const NotesConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

// const poolPromise = new mssql.ConnectionPool(config)
//     .connect()
//     .then(pool => {
//         console.log('Connected to MSSQL');
//         return pool;
//     })
// .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

// mssql.connect(NotesConfig).then((pool) => {
//   if (pool.connected) {
//     console.log("Connected to MSSQL");
//   }
// });

module.exports = {
  NotesConfig,
};
