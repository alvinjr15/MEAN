var express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./emp_database.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE IF NOT EXISTS trades( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            type NVARCHAR(20)  NOT NULL,\
            user_id INTEGER ,\
            user_name NVARCHAR(20)  NOT NULL,\
            symbol NVARCHAR(20)  NOT NULL,\
            shares INTEGER,\
            price REAL,\
            timeCreate timestamp DEFAULT CURRENT_TIMESTAMP\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
                console.log(err.message);
            }
        });
    }
});

module.exports = db;