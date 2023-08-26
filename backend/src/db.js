import fs from 'fs';
import mysql from 'mysql2';
import { Client } from 'ssh2';

// Create a new SSH client instance
const ssh = new Client();

// Create a promise to establish the SSH tunnel and MySQL connection
const db = new Promise((resolve, reject) => {
  // Set up an event listener for the 'ready' event
  ssh.on('ready', () => {
    // Forward the SSH connection to the MySQL server
    ssh.forwardOut(
      '127.0.0.1', // source address, usually any valid address
      12345,      // source port, any valid port number
      '127.0.0.1', // destination address (localhost on SSH server)
      3306,       // destination port (MySQL default port)
      (err, stream) => {
        if (err) {
          // Reject the promise if there's an SSH error
          reject(err);
          return;
        }

        // Create a MySQL connection using the forwarded stream
        const connection = mysql.createConnection({
          host: '127.0.0.1',
          user: 'root',
          password: 'SAQ7bmMdUW85cP',
          database: 'cali_housing_prices',
          stream,
        });

        // Connect to the MySQL database
        connection.connect((err2) => {
          if (err2) {
            // Reject the promise if there's a MySQL connection error
            reject(err2);
          } else {
            // Resolve the promise if the connection is successful
            resolve(connection);
          }
        });
      },
    );
  });

  // Set up an event listener for the 'error' event
  ssh.on('error', (err) => {
    // Reject the promise if there's an SSH error
    reject(err);
  });

  // Connect to the SSH server with the specified options
  ssh.connect({
    host: '18.222.24.247',
    port: 22,
    username: 'ubuntu',
    privateKey: fs.readFileSync('../../sofia_gc_key_final.pem'),
  });
});

export default db;
