const winston = require("winston");

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
