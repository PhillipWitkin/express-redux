import express from "express"
import pg from "pg"
import dotenv from "dotenv"

dotenv.config({path: '.env.local'});
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
console.log("POSTGRESS_PASSWORD from environment: ", POSTGRES_PASSWORD);  
const PORT = process.env.PORT || 8003;
const POSTGRES_USER = process.env.POSTGRES_USER || 'user';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;

const pgConnect = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:6432/food`
const remoteConnect = process.env.REMOTE_DATABASE;
const pgURI = process.env.REMOTE_DATABASE || pgConnect;
console.log(remoteConnect);

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
        res.json(data.rows);
    })
    .catch((err) => {
        console.log(err)
    })
})

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})
