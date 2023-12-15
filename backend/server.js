const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');

dotenv.config({path:path.join(__dirname,'./config/config.env')})

connectDatabase();

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to the unhandled rejection error')
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to the unCaught Exception error')
    server.close(()=>{
        process.exit(1);
    })
})

//console.log(a);

