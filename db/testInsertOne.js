import pg from "pg";

console.log("testing db connection to trees");

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 6432,
    database: "trees"
});

// const newTree = {
//     name: "venus fly trap",
//     description: "it eats bugs",
//     height: 2,
//     width: 0.3
// }

// const { name, description, height, width } = newTree;
const treeId = 1;

pool.query(`SELECT id, name, description FROM flowering_trees WHERE id = $1`, 
    [treeId])
    .then((data) => {
        // sucessfully inserted new tree
        const tree = data.rows[0];
        console.log("Found the tree: \n", tree);
        return data
    })
    .catch((err) => {
        console.log("Insert failed: ", err);
    })
