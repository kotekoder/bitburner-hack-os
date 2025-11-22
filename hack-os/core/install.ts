import {
  HACK_OS_CONFIG_FILE,
  HACK_OS_MODULES_DIR,
  HACK_OS_DEAMONS_DIR,
  HACK_OS_BINS_DIR,
  HACK_OS_SCRIPTS_DIR,
  HackOSConfig
}
  from "./modules/hack-os"
import { injectCommand } from "./modules/utils"
import { getLogger } from "./modules/logger"

const DEFAULT_CONFIG_FILE = "default-config.json"
const MODULES_DIR = "modules"
const DEAMONS_DIR = "deamons"
const BINS_DIR = "bins"
const SCRIPTS = "scripts"

export async function main(ns: NS) {
  let config = new HackOSConfig(ns)
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
        ns.read(f),
        "w")
    })
  ns.ls(hostname, installerPath + DEAMONS_DIR)
    .forEach(f => {
      logger.info(HACK_OS_DEAMONS_DIR + f.split("/").pop())
      ns.write(
        HACK_OS_DEAMONS_DIR + f.split("/").pop(),
        ns.read(f),
        "w")
    })
  ns.ls(hostname, installerPath + BINS_DIR)
    .forEach(f => {
      logger.info(HACK_OS_BINS_DIR + f.split("/").pop())
      ns.write(
       HACK_OS_BINS_DIR + f.split("/").pop(),
        ns.read(f),
        "w")
    })
  ns.ls(hostname, installerPath + SCRIPTS)
    .forEach(f => {
      logger.info(HACK_OS_SCRIPTS_DIR + f.split("/").pop())
      ns.write(
       HACK_OS_SCRIPTS_DIR + f.split("/").pop(),
        ns.read(f),
        "w")
    })
  logger.info(HACK_OS_CONFIG_FILE)
  ns.write(HACK_OS_CONFIG_FILE, ns.read(installerPath + DEFAULT_CONFIG_FILE),"w")
  logger.info("Done")
  logger.info("Creating aliases")
  injectCommand("alias hack-os-boot='run /scripts/boot.ts'")
  injectCommand("alias hack-os-rm='run /scripts/uninstall.ts'")
  logger.info("Done")
}
