import fs from 'fs';
import mysql from 'mysql2';
import { Client } from 'ssh2';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ssh = new Client();

// get file path to key file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    ssh.on('ready', () => {
      ssh.forwardOut(
        '127.0.0.1',
        12345,
        '127.0.0.1',
        3306,
        async (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          // create connection to mysql
          const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'SAQ7bmMdUW85cP', // mysql configurations
            database: 'cali_housing_prices',
            stream,
          });

          connection.connect((err2) => { // connect to database
            if (err2) {
              console.log('mysql connection error', err2);
              reject(err2);
            } else {
              resolve(connection);
            }
          });
        }
      );
    });

    // connect to SSH
    ssh.on('error', (err) => {
      console.log('ssh error', err);
      // Retry the SSH connection after a delay (e.g., 5 seconds)
      setTimeout(() => {
        connectToDatabase().then(resolve).catch(reject);
      }, 5000);
    });

    ssh.connect({
      host: '18.222.24.247', // ssh configurations
      port: 22,
      username: 'ubuntu',
      privateKey: fs.readFileSync(join(__dirname, '../sofia_gc_key_final.pem')),
    });
  });
};

const db = connectToDatabase(); // call function

export default db;