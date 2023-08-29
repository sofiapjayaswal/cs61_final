import fs from 'fs';
import mysql from 'mysql2';
import { Client } from 'ssh2';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ssh = new Client();

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

          const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'SAQ7bmMdUW85cP',
            database: 'cali_housing_prices',
            stream,
          });

          connection.connect((err2) => {
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

    ssh.on('error', (err) => {
      console.log('ssh error', err);
      // Retry the SSH connection after a delay (e.g., 5 seconds)
      setTimeout(() => {
        connectToDatabase().then(resolve).catch(reject);
      }, 5000);
    });

    ssh.connect({
      host: '18.222.24.247',
      port: 22,
      username: 'ubuntu',
      privateKey: fs.readFileSync(join(__dirname, '../sofia_gc_key_final.pem')),
    });
  });
};

const db = connectToDatabase();

export default db;