import express from "express"
import pg from "pg"
import dotenv from "dotenv"

dotenv.config({path: '.env.local'});
const PORT = process.env.PORT || 8003;

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
console.log("POSTGRESS_PASSWORD from environment: ", POSTGRES_PASSWORD);  
const POSTGRES_USER = process.env.POSTGRES_USER || 'user';

const pgConnect = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:6432/food`
const pgURI = process.env.REMOTE_DATABASE || pgConnect;
// console.log(remoteConnect);

const pool = new pg.Pool({
    connectionString: pgURI,
    ssl: {
        rejectUnauthorized: false, 
      }
}); 

pool.connect()
    .then((client) => {
        console.log(`Connected to postgres using connection string ${pgURI}`);
        client.release();
    })
    .catch((err)=>{
        console.log("Failed to connect to postgres: ", err.message);
    })

const app = express();

app.use(express.static('public'));

app.get("/snacks", (req, res) => {
    pool.query(`SELECT * FROM snacks`)
    .then((data) => {
        console.log("Returning data: \n", data.rows);
        res.json(data.rows);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

app.get("/snacks/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    // TODO send 400 if non-integer ID
    pool.query(`SELECT * FROM snacks WHERE id = $1`, [id])
    .then((data) => {
        console.log("Snack: \n", data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(500);
    })
})

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})
