import Server from "./src/server";
import router from "./src/routes/router";

const PORT = parseInt(process.env.PORT || "8000");
const HOSTNAME = process.env.HOST || "localhost";
export default new Server().router(router).listen(PORT, HOSTNAME);
