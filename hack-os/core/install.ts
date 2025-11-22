import { HACK_OS_CONFIG_FILE, HACK_OS_MODULES_DIR, HACK_OS_DEAMONS_DIR, HackOSConfig } from "./modules/hack-os"
import { injectCommand } from "./modules/utils"
import { getLogger } from "./modules/logger"

const DEFAULT_CONFIG_FILE = "default-config.json"
const MODULES_DIR = "modules"
const DEAMONS_DIR = "deamons"

export async function main(ns: NS) {
  let config = new HackOSConfig()
  let logger = getLogger(ns, "HACK-OS INSTALLER", true)

  let hostname = "home"
  let installerPath = config.scriptPath

  logger.info("Starting HACK-OS instalation")
  logger.info("Copping files...")
  ns.ls(hostname, installerPath + MODULES_DIR)
    .forEach(f => {
      logger.info(HACK_OS_MODULES_DIR + f.split("/").pop())
      ns.write(
        HACK_OS_MODULES_DIR + f.split("/").pop(),
        ns.read(f))
    })
  ns.ls(hostname, installerPath + DEAMONS_DIR)
    .forEach(f => {
      logger.info(HACK_OS_DEAMONS_DIR + f.split("/").pop())
      ns.write(
        HACK_OS_DEAMONS_DIR + f.split("/").pop(),
        ns.read(f))
    })
  logger.info(HACK_OS_CONFIG_FILE)
  ns.write(HACK_OS_CONFIG_FILE, ns.read(installerPath + DEFAULT_CONFIG_FILE))
  logger.info("Done")
}