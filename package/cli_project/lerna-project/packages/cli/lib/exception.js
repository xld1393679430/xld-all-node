import { printErrorLog } from "@lerna-cli-xld-v2/utils";

process.on("uncaughtException", (e) => printErrorLog(e, "uncaughtException"));

process.on("unhandledRejection", (e) => printErrorLog(e, "unhandledRejection"));
