
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host:"localhost",
    database:"nodelogin",
    password:"1991",
    port:5432
});

module.exports = pool;