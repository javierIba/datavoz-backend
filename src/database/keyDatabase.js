require("dotenv").config();
module.exports = {
    databaseInfo:{
        host: process.env.LOCALHOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
}


