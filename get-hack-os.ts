export async function main(ns: NS) {
  let URL_BASE = "https://raw.githubusercontent.com/kotekoder/bitburner-hack-os/refs/heads/main/"
  let TOKEN = "?token=GHSAT0AAAAAADPC4M4ANLFIH5ITZJAPINIW2JBSNGA" 
  let files = [
    "hack-os/install.ts", 
    "hack-os/core/install.ts",
    "hack-os/core/default-config.json",
    "hack-os/core/deamons/init.ts",
    "hack-os/core/modules/hack-os.ts",
    "hack-os/core/modules/logger.ts",
    "hack-os/core/modules/utils.ts"
  ]
  ns.tprintf("Getting HACK-OS")
  let promise:Promise<any>|null = null
  files.forEach(f=>{
    if (promise == null)
      promise = ns.wget(URL_BASE+f+TOKEN,f).then(()=>ns.tprintf(f))
    else
      promise = Promise.all([promise,ns.wget(URL_BASE+f+TOKEN,f).then(()=>ns.tprintf(f))])
  })
  await promise
  ns.tprintf("Done")
}
