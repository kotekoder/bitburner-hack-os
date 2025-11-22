import {Logger} from "modules/logger"
import {HACK_OS_BINS_DIR} from "modules/hack-os"

export async function main(ns: NS) {
  let logger = new Logger(ns,"HACK-OS BOOT",true)
  ns.run(HACK_OS_BINS_DIR+"init.ts")
}