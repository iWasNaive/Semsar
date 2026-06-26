const db = require("./db");
const app = require("./app");

const run = async () => {
  try {
    const [rows] = await db.execute("select version() as version");
    console.log("MySQL Version => ", rows[0].version);

    app.listen(process.env.port, () => {
      console.log("Server Run ");
    });
  } catch (error) {
    console.log(error.message);
  }
};

run();
