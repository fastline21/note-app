import { body } from "express-validator";

export const createNoteValidator = [
  body("title").isString().notEmpty().escape(),
  body("body").isString().notEmpty().escape(),
];

export const updateNoteValidator = [
  body("title").isString().notEmpty().escape(),
  body("body").isString().notEmpty().escape(),
];
