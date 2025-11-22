export function getLogger(parent:NS|Logger,name:string,tprint:boolean=false,file:string=""):Logger{
  if(parent instanceof Logger){
    return new ChainLogger(parent,name,tprint,file)
  }
  return new Logger(parent,name,tprint,file)
}

export class Logger {
  #ns: NS
  #name: string
  #tprint: boolean
  #file: string

  constructor(ns: NS, logerName: string, tprint: boolean = false, file: string = "") {
    this.#ns = ns
    this.#name = logerName
    this.#tprint = tprint
    this.#file = file
  }
  get ns(){
    return this.#ns
  }

  info(msg: string) {
    let fmsg = `INFO:${this.#name} - ${msg}\n`
    this.#ns.printf(fmsg)
    if (this.#tprint) {
      this.#ns.tprintf(fmsg)
    }
    if (this.#file !== "") {
      this.#ns.write(this.#file, fmsg, "a")
    }
  }
  debug(msg: string) {
    let fmsg = `DEBUG:${this.#name} - ${msg}\n`
    this.#ns.printf(fmsg)
    if (this.#tprint) {
      this.#ns.tprintf(fmsg)
    }
    if (this.#file !== "") {
      this.#ns.write(this.#file, fmsg, "a")
    }
  }
  error(msg: string) {
    let fmsg = `ERROR:${this.#name} - ${msg}\n`
    this.#ns.printf(fmsg)
    if (this.#tprint) {
      this.#ns.tprintf(fmsg)
    }
    if (this.#file !== "") {
      this.#ns.write(this.#file, fmsg, "a")
    }
  }
}

export class ChainLogger extends Logger{
  #logger: Logger

  constructor(logger: Logger, logerName: string, tprint: boolean = false, file: string = "") {
    super(logger.ns, logerName, tprint, file)
    this.#logger = logger
  }

  info(msg: string) {
    super.info(msg)
    this.#logger.info(msg)
  }
  debug(msg: string) {
    super.debug(msg)
    this.#logger.debug(msg)
  }
  error(msg: string) {
    super.error(msg)
    this.#logger.error(msg)
  }
}