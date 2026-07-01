import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const extractionPath = path.join(root, "docs/research/storiedhats.com/global-extraction.json");
const outputDir = path.join(root, "public/storiedhats");
const manifestPath = path.join(root, "docs/research/storiedhats.com/assets-manifest.json");

const data = JSON.parse(await readFile(extractionPath, "utf8"));

function urlsFromBackground(value) {
  return [...value.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((match) => match[1]);
}

function extensionFromUrl(url) {
  const parsed = new URL(url);
  const ext = path.extname(parsed.pathname);
  return ext || ".bin";
}

function safeName(url, index, prefix) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname, path.extname(parsed.pathname))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
  return `${String(index).padStart(2, "0")}-${prefix}-${base || "asset"}${extensionFromUrl(url)}`;
}

const assets = [];
for (const image of data.images ?? []) {
  if (image.src) {
    assets.push({
      kind: "image",
      source: image.src,
      alt: image.alt ?? "",
      width: image.width,
      height: image.height,
    });
  }
}

for (const background of data.backgroundImages ?? []) {
  for (const url of urlsFromBackground(background.backgroundImage)) {
    assets.push({
      kind: "background",
      source: url,
      element: background.className || background.tag,
    });
  }
}

const unique = Array.from(new Map(assets.map((asset) => [asset.source, asset])).values());

await mkdir(outputDir, { recursive: true });

const manifest = [];
for (let index = 0; index < unique.length; index += 1) {
  const asset = unique[index];
  const filename = safeName(asset.source, index + 1, asset.kind);
  const target = path.join(outputDir, filename);
  const response = await fetch(asset.source);
  if (!response.ok) {
    manifest.push({ ...asset, ok: false, status: response.status });
    continue;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(target, buffer);
  manifest.push({
    ...asset,
    ok: true,
    bytes: buffer.length,
    localPath: `/storiedhats/${filename}`,
  });
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Downloaded ${manifest.filter((asset) => asset.ok).length}/${manifest.length} assets`);
