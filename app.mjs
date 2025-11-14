import { loadSequelize } from "./database.mjs";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

/**
 * Point d'entrée de l'application
 * Vous déclarer ici les routes de votre API REST
 */

// GET /goodbye : affiche <p>Goodbye World</p>
// GET /status : affiche <p>Server is running</p>
// GET /date : affiche la date et l'heure actuelle au format ISO (utilisez new Date().toISOString())
// GET /random : affiche un nombre aléatoire entre 0 et 1 (utilisez Math.random())
// GET /random10 : affiche un nombre aléatoire entre 0 et 10 (utilisez Math.random())
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


        //je n'ai pas fini
           app.get("/goodbye",async (req,res)=>{
           res.send("<p>Goodbye World</p>");
        })

              app.get("/status",async (req,res)=>{
           res.send("<p>Server is running</p>");
        })

               app.get("/date",async (req,res)=>{
           res.send(new Date().toISOString());
        })

               app.get("/random",async (req,res)=>{
           res.send(Math.random());
        })

                app.get("/random10",async (req,res)=>{
           res.send(Math.random());
        })


     
       

        app.listen(3001, () => {
            console.log("Serveur démarré sur http://localhost:3001");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();