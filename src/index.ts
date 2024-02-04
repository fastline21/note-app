import express, { Express } from "express";

import routes from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api", routes);

const port = 8080;
app.listen(port, () => console.log(`Server running on port: ${port}`));
