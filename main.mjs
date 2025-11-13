import { Sequelize, DataTypes } from "sequelize";

async function main() {
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



        // Création des models (tables) -------------//
        sequelize.define("User", {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        });
        // -----------------------------------------//


        await sequelize.sync({ force: true });
        console.log("Connexion à la BDD effectuée")
        
        const User = sequelize.models.User;
        // INSERT INTO User
        const newUser = await User.create({
            username: "massinissa",
            email: "massi@mail.com",
            password: "1234"
        });
        // INSERT INTO User
        const newUser2 = await User.create({
            username: "billy",
            email: "billy@mail.com",
            password: "1234"
        });
        // INSERT INTO User
        const newUser3 = await User.create({
            username: "Boubou",
            email: "boubou@mail.com",
            password: "123456789AZERTY!"
        });

        // INSERT INTO User
        const newUser4 = await User.create({
            username: "Hérisson au chocolat",
            email: "HC123@mail.com",
            password: "123456789AZERTY!"
        });
        console.log(newUser.username);
        console.log(newUser2.username);
        console.log(newUser4.username);


        // SELECT * FROM User après ajout des deux users
        let allUsers = await User.findAll();

        // J'affiche l'email de chaque utilisateur
        allUsers.forEach(user => {
            console.log(user.email)
        });
         const userById = await User.findByPk(2); // 2 est l'id de Billy
console.log(userById);

        // DELETE User
await User.destroy({
    where : {
        username : "massinissa"
    }
})
  
const updatedValues_obj = { email:"newmailbilly@mail.com" };
await User.update(updatedValues_obj,{
    where : {
        username : "billy"
    }
})



    } catch (error) {
        console.log(error);
        throw new Error("Impossible de se connecter à la base de données");

    }
}
main()

//le true force se fait au niveau du create table les insert into il faut les mettre après