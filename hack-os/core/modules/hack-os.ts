export const HACK_OS_CONFIG_FILE = "hack-os.json"
export const HACK_OS_MODULES_DIR = "modules/"
export const HACK_OS_DEAMONS_DIR = "deamons/"

export class HackOSConfig {
  #ns: NS
  constructor(ns: NS) {
    this.#ns = ns
  }
  
  get scriptPath(){
	return this.#ns.getScriptName().split("/").filter(e => !e.endsWith(".ts")).join("/") + "/"
  }
}

