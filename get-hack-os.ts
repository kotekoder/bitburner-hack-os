export async function main(ns: NS) {
  await Promise.all([
    ns.wget("url", "target").then(() => ns.tprintf("target")),
    ns.wget("url", "target").then(() => ns.tprintf("target"))
  ])
}
