import winston, { level } from "winston";
import path, { dirname, format } from "path";
import { fileURLToPath } from "url";
import { info } from "console";
import { write } from "fs";

const __filename=fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const logDir = path.join(__dirname, "../logs")

const {colorize, align, errors,combine,json,timestamp} = winston.format

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    format : combine (
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        errors({stack: true}),
        json
    ),
    transports: [
        new winston.transport.File({
            filename: path.join(logDir, "app.log"),
            level: "info",
            maxsize: 5242880,
            maxFile: 5
        }),
        new winston.transport.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
            maxsize: 5242880,
            maxFile: 5
        }
        )
    ],
    exceptionHandlers : [
        new winston.transport.File({filename:path.join(logDir, "exceptions.log")})
    ],
    rejectionHandlers : [
        new winston.transport.File({filename:path.join(logDir, "rejections.log")})
    ],
    exitOnError: false
}
)

if(process.env.NODE_ENV !== "development"){
    logger.add(new winston.transport.console({
        format: combine(
            colorize(),
            timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            align()
        ),
        level: "debug"
    }))
}

logger.stream= {
    write: (message) => {
        logger.info(message.substring(0,message.lastIndexOf("/n")))
    }
}

export default logger