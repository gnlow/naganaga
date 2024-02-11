import { parse } from "https://tsm.deno.dev/https://deno.land/std@0.215.0/csv/mod.ts"

console.log(parse(await fetch("https://gsheet.deno.dev/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY").then(x => x.text())))