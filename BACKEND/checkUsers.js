const { User } = require("./models"); // Adjusted path if running from BACKEND root
const sequelize = require("./config/db");

const checkData = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB keys:", Object.keys(sequelize.models));

        const count = await User.count();
        console.log(`Total users in DB: ${count}`);

        const users = await User.findAll();
        console.log("Users:", JSON.stringify(users, null, 2));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkData();
