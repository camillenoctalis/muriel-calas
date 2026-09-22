#!/usr/bin/env node
/**
 * Typographie française automatique : espaces insécables
 *  - avant ? ! ; : et »   (« Pour qui ? » → « Pour qui ? »)
 *  - après «
 *  - entre un nombre et son unité (80 €, 45 min, 9 h, 25 ans, 100 %)
 *
 * Ne touche QUE les textes : chaînes de caractères et textes JSX (via l’AST TypeScript) dans src/,
 * et le contenu des fichiers Markdown de content/. Le code n’est jamais modifié.
 *
 * Usage : npm run typo           (corrige)
 *         npm run typo -- --check (signale sans modifier, code de sortie 1 si besoin)
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const NBSP = "\u00a0";
const root = process.cwd();
const check = process.argv.includes("--check");

function fixText(text) {
  return text
    .replace(/([^\s\u00a0({\[])[ ]([?!;:»])(?=[\s"'`<)}\].,;:!?]|$)/g, `$1${NBSP}$2`)
    .replace(/^[ ]([?!;:»])(?=[\s"'`<)}\].,]|$)/, `${NBSP}$1`)
    .replace(/«[ ]/g, `«${NBSP}`)
    .replace(/(\d)[ ](€|%|h|min|ans|km|séances?)(?=[\s.,;:!?)»"'`<]|$)/g, `$1${NBSP}$2`);
}

function walk(dir, exts, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function processTs(file) {
  const source = fs.readFileSync(file, "utf8");
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, kind);
  const edits = [];

  const visit = (node) => {
    const isText =
      ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || node.kind === ts.SyntaxKind.JsxText;
    const isImportPath = node.parent && (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent));
    if (isText && !isImportPath) {
      const start = node.getStart(sf);
      const end = node.getEnd();
      const raw = source.slice(start, end);
      const fixed = fixText(raw);
      if (fixed !== raw) edits.push({ start, end, fixed });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  if (!edits.length) return 0;
  let result = source;
  for (const e of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, e.start) + e.fixed + result.slice(e.end);
  if (!check) fs.writeFileSync(file, result);
  return edits.length;
}

function processMd(file) {
  const source = fs.readFileSync(file, "utf8");
  // on ignore les commentaires HTML
  const fixed = source
    .split(/(<!--[\s\S]*?-->)/)
    .map((part) => (part.startsWith("<!--") ? part : fixText(part)))
    .join("");
  if (fixed === source) return 0;
  if (!check) fs.writeFileSync(file, fixed);
  return 1;
}

let changed = 0;
for (const f of walk(path.join(root, "src"), [".ts", ".tsx"])) {
  const n = processTs(f);
  if (n) console.log(`${check ? "à corriger" : "corrigé"} : ${path.relative(root, f)} (${n})`);
  changed += n;
}
for (const f of walk(path.join(root, "content"), [".md"])) {
  if (path.basename(f) === "README.md") continue;
  const n = processMd(f);
  if (n) console.log(`${check ? "à corriger" : "corrigé"} : ${path.relative(root, f)}`);
  changed += n;
}
console.log(changed ? `${changed} correction(s) ${check ? "à faire" : "appliquée(s)"}.` : "Typographie OK.");
if (check && changed) process.exit(1);
