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
        const Task = sequelize.models.Task;
        const User = sequelize.models.User;
        //    const headers = new Headers();
        //     headers.append("Content-Type", "application/json");
        //     fetch("http://localhost:8000/task", {
        //         method: "POST",
        //         headers: headers,
        //         body: JSON.stringify({ title: "Faire ses devoirs", content: "tout de suite", userId: 1 })
        //     })

        // je place le middleware express.json AVANT la définition des routes de mon serveur
        app.use(express.json());

        app.post("/task", async (request, response) => {
            console.log(request.body);
            const newTaskData = request.body;
            try {
                // +
                const newTask = await Task.create({
                    title: newTaskData.title,
                    content: newTaskData.content,
                    UserId: 1
                });
                response.json(newTask);
            } catch (error) {
                console.log(error);
                response.status(500).json({ error: "Erreur lors de la création de la tâche" });
            }
        });

        app.get("/tasks", async (request, response) => {
            const tasks = await Task.findAll();
            response.json(tasks);
        });


        app.get("/", (req, res) => {


            res.json({ message: "Hello api 7" })
        })

        app.get("/tasks", async (req, res) => {
            const Task = sequelize.models.Task;
            const tasks = await Task.findAll()
            res.json(tasks);
        })

        app.get("/users", async (req, res) => {
            const User = sequelize.models.User;
            const users = await User.findAll()
            res.json(users);
        })


        //Postman je suis GET /user/:id get user id postman fini"
        app.get("/user/:id", async (req, res) => {
            console.log(req.params);
            const User = sequelize.models.User;
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            res.json(user)

        })



        app.get("/goodbye", async (req, res) => {
            res.send("<p>Goodbye World</p>");
        })

        app.get("/status", async (req, res) => {
            res.send("<p>Server is running</p>");
        })

        app.get("/date", async (req, res) => {
            res.send(new Date().toISOString());
        })

        app.get("/random", async (req, res) => {
            res.send(Math.random());
        })

        app.get("/random10", async (req, res) => {
            res.send(Math.random() * 10);
        })


        //         POST /task (pour l'utilisateur 1 par défaut)
        // En développement web front-end, il est d'usage d'envoyer des données complexes via le body d'une requête HTTP.

        // Par exemple ici j'envoie une requête POST au back-end pour ajouter une tâche à l'utilisateur 1 (Billy).
        // Retenez ceci :

        // Il est impossible d'utiliser la méthode GET pour envoyer des données au back-end.
        // Le contenu JSON se trouve dans le body de la requête HTTP du client.
        // Il est obligatoire de préciser le header Content-Type: application/json pour que le back-end fonctionne.
        // Il nous faut donc :

        // Décoder le body JSON lors de la réception de la requête.
        // Lire le body.
        // L'ajouter dans la table Task.





        app.listen(3001, () => {
            console.log("Serveur démarré sur http://localhost:3001/");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();