import {
  HACK_OS_CONFIG_FILE,
  HACK_OS_MODULES_DIR,
  HACK_OS_DEAMONS_DIR,
  HACK_OS_BINS_DIR,
  HACK_OS_SCRIPTS_DIR,
  HackOSConfig
}
  from "modules/hack-os"
import {injectCommand} from "modules/utils"
import { Logger } from "modules/logger"


export async function main(ns: NS) {
  let logger = new Logger(ns, "HACK-OS REMOVEER", true)
  logger.info("Stopping scripts...")
  ns.killall()
  logger.info("Done")
  logger.info("Deleting files...")
  ns.rm(HACK_OS_CONFIG_FILE)
  ns.ls("home").filter(f => f.startsWith(HACK_OS_MODULES_DIR)).forEach(f => { ns.rm(f); logger.info(f) })
  ns.ls("home").filter(f => f.startsWith(HACK_OS_DEAMONS_DIR)).forEach(f => { ns.rm(f); logger.info(f) })
  ns.ls("home").filter(f => f.startsWith(HACK_OS_BINS_DIR)).forEach(f => { ns.rm(f); logger.info(f) })
  ns.ls("home").filter(f => f.startsWith(HACK_OS_SCRIPTS_DIR)).forEach(f => { ns.rm(f); logger.info(f) })
  logger.info("Done")
  logger.info("Removing aliasess...")
  injectCommand("unalias hack-os-boot")
  injectCommand("unalias hack-os-rm")
  logger.info("Done")
}