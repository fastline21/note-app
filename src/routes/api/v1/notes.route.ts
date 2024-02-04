import { Router, Request, Response } from "express";

import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../../../controllers/notes.controller";

import {
  createNoteValidator,
  updateNoteValidator,
} from "../../../validators/notes";

const router = Router();

router.get("/", (req, res) => getAllNotes(req, res));
router.get("/:id", (req, res) => getNote(req, res));
router.post("/", createNoteValidator, (req: Request, res: Response) =>
  createNote(req, res)
);
router.put("/:id", updateNoteValidator, (req: Request, res: Response) =>
  updateNote(req, res)
);
router.delete("/:id", (req, res) => deleteNote(req, res));

export default router;
