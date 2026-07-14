import express, { type Express } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve static files from gssifo client and admin client
const frontendDist = path.resolve(__dirname, "../../gssifo/dist");
const adminDist = path.resolve(__dirname, "../../gssifo-admin/dist");

app.use(express.static(frontendDist));
app.use("/admin", express.static(adminDist));

// Serve index.html for all other routes to support client-side routing (single page app)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  // Serve admin panel if route starts with /admin
  if (req.path.startsWith("/admin")) {
    return res.sendFile(path.resolve(adminDist, "index.html"), (err) => {
      if (err) {
        next();
      }
    });
  }
  res.sendFile(path.resolve(frontendDist, "index.html"), (err) => {
    if (err) {
      next();
    }
  });
});

export default app;
