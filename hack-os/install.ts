import {HackOSConfig} from "./core/modules/hack-os"

export async function main(ns: NS) {
  ns.tprintf("Installing HACK-OS")
  let config = new HackOSConfig(ns) 
  let installerPath = config.scriptPath
  ns.run(installerPath+"core/install.ts")
  while(ns.ps().length>1){
    await ns.sleep(500)
  }
  ns.tprintf("Done")
}
