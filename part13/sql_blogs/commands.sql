CREATE TABLE blogs (id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0, year INTEGER NOT NULL);

INSERT INTO blogs (author, url, title) VALUES ('Brianna Spinks', 'https://fullstackopen.com/en/part13/using_relational_databases_with_sequelize', 'Adding a blog from the command line');
INSERT INTO blogs (author, url, title) VALUES ('Brianna Spinks', 'https://fly.io/dashboard', 'Using Fly.io for the db');


CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT NOT NULL, name TEXT NOT NULL);

INSERT INTO users (username, name) VALUES ('foo@bar.com', 'Foobar');
INSERT INTO users (username, name) VALUES ('bri@anna.com', 'Brianna');