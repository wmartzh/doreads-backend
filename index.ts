import Server from "./src/server";
import router from "./src/routes/router";

const PORT = parseInt(process.env.PORT || "8001");
const HOSTNAME = process.env.HOST || "localhost";
export default new Server().router(router).listen(PORT, HOSTNAME);
