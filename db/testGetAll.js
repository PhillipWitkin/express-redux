import pg from "pg";

console.log("testing db connection to trees");

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 6432,
    database: "trees"
})


pool.query(`SELECT id, name, description FROM flowering_trees`)
    .then((data) => {
        console.log(data.rows)
    })
    .catch((err) => {
        console.log("Query failed");
        console.log(err);
    })