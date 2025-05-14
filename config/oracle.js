import pkg from 'oracledb';
const { initOracleClient, getConnection } = pkg;
// import { initOracleClient, getConnection } from 'oracledb';
import 'dotenv/config';

const wallet_path = process.env.WALLET_PATH || '/opt/render/project/src/wallet';

console.log(`Wallet path is ${wallet_path}`);
initOracleClient({ configDir: wallet_path });

async function insertUser(user) {
  const connection = await getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING
  });

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
