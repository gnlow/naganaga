import { parse } from "https://deno.land/std@0.215.0/csv/mod.ts"

const r = await fetch("https://docs.google.com/spreadsheets/u/0/d/1KuRQFwPnn4_jBlTkUHVeWD-6DRmtDohEBDsaP7XWxNY/export?format=csv").then(x => x.text())
console.log(parse(r))