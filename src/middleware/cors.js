// src/middleware/cors.js
import Cors from "cors";
import initMiddleware from "@/lib/middleware";

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

export default cors;
