DROP TABLE IF EXISTS snacks;

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    calories INTEGER
);