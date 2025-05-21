import oracledb from 'oracledb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Enable Thin mode (Render doesn’t support thick mode)
console.log(`Is it thin?:  ${oracledb.thin}`);

const wallet_path = process.env.TNS_ADMIN || '/opt/render/project/src/wallet/wallet';
process.env.TNS_ADMIN = wallet_path;

// oracledb.initOracleClient({ configDir: wallet_path });

async function insertUser(user) {
  const connection = await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: 'eduflexmain_high.adb.oraclecloud.com'
  });
  console.log('connection successful');
  await connection.execute(
    `INSERT INTO users (user_id, first_name, last_name, email, role)
     VALUES (:id, :fname, :lname, :email, :role)`,
    {
      id: user.user_id,
      fname: user.first_name,
      lname: user.last_name,
      email: user.email,
      role: user.role
    },
    { autoCommit: true }
  );
 
  await connection.close();
}
export default insertUser;


// console.log(`Wallet path is ${wallet_path}`);
// console.log(`Oracle client is using ${oracledb.thin ? 'Thin' : 'Thick'} mode.`);
// console.log("Using wallet path from TNS_ADMIN:", wallet_path);
// console.log('Wallet exists:', fs.existsSync(`${wallet_path}/cwallet.sso`));
// console.log('tnsnames exists:', fs.existsSync(`${wallet_path}/tnsnames.ora`));
// console.log('sqlnet exists:', fs.existsSync(`${wallet_path}/sqlnet.ora`));
// // const tnsFile = path.join(wallet_path, 'tnsnames.ora');
// // console.log("📄 tnsnames.ora contents:");
// // console.log(fs.readFileSync(tnsFile, 'utf8'));