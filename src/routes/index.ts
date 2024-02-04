import { Router } from "express";

import routeDIRv1 from "./api/v1";

const router = Router();

router.use("/v1", routeDIRv1);

export default router;
