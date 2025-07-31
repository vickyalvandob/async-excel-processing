import express from "express";
import routes from "$routes/index";
import cors from "cors";
import morganMiddleware from "$middlewares/morganMiddleware";

export default function createRestServer() {
  let allowedOrigins:string[] = ["*"]
  let corsOptions:cors.CorsOptions = {}
  if(process.env.ENVIRONMENT != "dev"){
    allowedOrigins = process.env.ALLOWED_ORIGINS!.split(",")
    corsOptions.origin = allowedOrigins
  }

  const app = express();
  app.use(cors(corsOptions));
  app.use(morganMiddleware);
  app.use(express.json());
  app.use(routes);

  return app;
}
