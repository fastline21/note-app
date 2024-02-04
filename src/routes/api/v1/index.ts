import { Router } from "express";

import notesRoute from "./notes.route";

const router = Router();

router.use("/notes", notesRoute);

export default router;
