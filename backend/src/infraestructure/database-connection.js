const mysql = require("mysql2");
const config = require("../config");

const dbconfig={
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

let attemtCount=0;

const maxAttempts = 5;


function conMysql(){

    connection = mysql.createConnection(dbconfig);
    connection.connect((err) =>{
           if(err){
              console.log('[Database Error] ',err);
              attemtCount++;
              if(attemtCount< maxAttempts){
                   setTimeout(conMysql,200);
              }else{
                 console.log("Se alcanzo  el numero maximo de intentos");
              }
           }
           else{
            console.log("Database Conectada");
        }
    } 
    );

}

conMysql();

function getConnection(){
   return connection;
}

module.exports={
    getConnection,
}