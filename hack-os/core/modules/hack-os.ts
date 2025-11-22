export const HACK_OS_CONFIG_FILE = "hack-os.json"
export const HACK_OS_MODULES_DIR = "modules/"
export const HACK_OS_DEAMONS_DIR = "deamons/"
export const HACK_OS_BINS_DIR = "bins/"
export const HACK_OS_TOOLS_DIR = "tools/"
export const HACK_OS_SCRIPTS_DIR = "scripts/"

export class HackOSConfig {
  #ns: NS
  constructor(ns: NS) {
    this.#ns = ns
  }
  
  get scriptPath(){
	return this.#ns.getScriptName().split("/").filter(e => !e.endsWith(".ts")).join("/") + "/"
  }
}

