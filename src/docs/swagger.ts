import { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import docs from "./docs.json";

function swaggerDocs(app: Application) {
  const host = process.env.SWAGGER_HOST;
  const port = parseInt(process.env.PORT || "8000");

  docs["servers"] = [
    {
      url: `${host}:${port}`,
    },
  ];

  app.use("/api", swaggerUi.serve, swaggerUi.setup(docs));

  // Docs in Json format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(docs);
  });

  console.log(`The documentation is available at ${host}:${port}/api`);
}

export default swaggerDocs;
