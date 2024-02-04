import { Request, Response } from "express";
import path from "path";
import {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from "fs";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import { NOTE_PATH } from "../constants/note-path";

export const getAllNotes = (req: Request, res: Response) => {
  const notesPath: string = NOTE_PATH;
  const files = readdirSync(notesPath);

  const notes = [];

  for (const file of files) {
    const data = readFileSync(path.join(notesPath, file), {
      encoding: "utf-8",
    });
    notes.push(JSON.parse(data));
  }

  return res
    .status(200)
    .json({ status: 200, data: notes, mesage: "", success: true });
};

export const getNote = (req: Request, res: Response) => {
  const { id } = req.params;

  const notesPath: string = NOTE_PATH;

  if (!existsSync(path.join(notesPath, `${id}.json`))) {
    return res.status(404).json({
      status: 404,
      data: {},
      message: `Note (${id}) not found`,
      success: false,
    });
  }

  const data = readFileSync(path.join(notesPath, `${id}.json`), {
    encoding: "utf-8",
  });

  const note = JSON.parse(data);

  return res.status(200).json({
    status: 200,
    data: note,
    message: "",
    success: true,
  });
};

interface CreateNoteRequestBody {
  title: string;
  body: string;
}

interface CreateNotePayload extends CreateNoteRequestBody {
  id: string;
}
export const createNote = (req: Request, res: Response) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    console.log(err.mapped());
    return res.status(500).json({
      status: 500,
      data: {},
      message: err.mapped(),
      success: false,
    });
  }

  try {
    const { title, body } = req.body;

    const id: string = uuidv4();

    const payload: CreateNotePayload = {
      id,
      title,
      body,
    };

    const notesPath: string = NOTE_PATH;

    writeFileSync(
      path.join(notesPath, `${id}.json`),
      JSON.stringify(payload),
      "utf-8"
    );

    const data = readFileSync(path.join(notesPath, `${id}.json`), {
      encoding: "utf-8",
    });

    const note = JSON.parse(data);

    return res
      .status(200)
      .json({ status: 200, data: note, message: "", success: true });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      data: {},
      message: JSON.stringify(error),
      success: false,
    });
  }
};

export const updateNote = (req: Request, res: Response) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    console.log(err.mapped());
    return res.status(500).json({
      status: 500,
      data: {},
      message: err.mapped(),
      success: false,
    });
  }

  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const notesPath = NOTE_PATH;

    if (!existsSync(path.join(notesPath, `${id}.json`))) {
      return res.status(404).json({
        status: 404,
        data: {},
        message: `Note (${id}) not found`,
        success: false,
      });
    }

    const payload = {
      id,
      title,
      body,
    };

    writeFileSync(
      path.join(notesPath, `${id}.json`),
      JSON.stringify(payload),
      "utf-8"
    );

    const data = readFileSync(path.join(notesPath, `${id}.json`), {
      encoding: "utf-8",
    });

    const note = JSON.parse(data);

    return res
      .status(200)
      .json({ status: 200, data: note, message: "", success: true });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      data: {},
      message: JSON.stringify(error),
      success: false,
    });
  }
};

export const deleteNote = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notesPath: string = NOTE_PATH;

    if (!existsSync(path.join(notesPath, `${id}.json`))) {
      throw new Error(`Note (${id}) not found`);
    }

    unlinkSync(path.join(notesPath, `${id}.json`));

    return res.status(200).json({
      status: 200,
      data: {},
      message: `Successful removed Note (${id})`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      data: {},
      message: JSON.stringify(error),
      success: false,
    });
  }
};
