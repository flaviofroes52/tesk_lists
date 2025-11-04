import mongoose from "mongoose";

const db=process.env.BD_CONNECT;

async function  bdconnect(){

    try {
        await mongoose.connect(db);
        console.log("Conexão com o banco de dados válida");
        return mongoose.connection;
        
    } catch (error) {
        console.error("Erro na conexão com BD",error)
        throw error
    }

}
export default bdconnect;