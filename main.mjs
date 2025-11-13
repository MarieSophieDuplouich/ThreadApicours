import { Sequelize } from "sequelize";

async function main(){
    try {
        
        const login = {
            database: "app-database",
            username: "root",
            password: "root"
        };
        // Connexion à la BDD
        const sequelize = new Sequelize(login.database, login.username, login.password, {
            host: '127.0.0.1',
            dialect: 'mysql'
        });

        await sequelize.sync(); // j'attends la fin de la requête avant de continuer.
        console.log("Connexion à la BDD effectuée")
        
    }catch(error){
        console.log(error);
        throw new Error("Impossible de se connecter à la base de données");

    }
}
main()