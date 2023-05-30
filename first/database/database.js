const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1991",
    database: "postgres"
})
client.connect();

client.query(`Select * FROM users`, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
    client.end();
});