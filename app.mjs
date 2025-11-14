import { loadSequelize } from "./database.mjs";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

/**
 * Point d'entrée de l'application
 * Vous déclarer ici les routes de votre API REST
 */
async function main() {
    try {
        const sequelize = await loadSequelize();
        const app = express();

        app.get("/",(req,res)=>{


            res.json({message:"Hello api 7"})
        })

        app.get("/tasks",async (req,res)=>{
            const Task = sequelize.models.Task;
            const tasks = await Task.findAll()
            res.json(tasks);
        })

     
       

        app.listen(3001, () => {
            console.log("Serveur démarré sur http://localhost:3001");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();