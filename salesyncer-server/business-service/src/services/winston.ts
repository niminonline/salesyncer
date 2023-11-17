import winston from "winston";
import path from "path";
import fs from "fs";

const logsDirectory = path.join(__dirname, "../../logs");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "dd-MM-YYYY hh:mm:ss a" }),
    winston.format.json()
  ),
  defaultMeta: { service: "business" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDirectory, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, "combined.log"),
    }),
  ],
});

export default logger;
