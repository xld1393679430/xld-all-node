#! /usr/bin/env node

import importLocal from "import-local";
import { fileURLToPath } from 'node:url'
import { log } from "@lerna-cli-xld-v2/utils";
import entry from "../lib/index.js";

const url = import.meta.url
const __filename = fileURLToPath(url)

if (importLocal(__filename)) {
  log.info("cli", "使用本地的lerna-cli-xld");
} else {
  entry(process.argv.slice(2));
}
