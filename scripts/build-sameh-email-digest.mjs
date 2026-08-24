#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

const sources = [
  "audit/sameh-emails-older.json",
  "audit/sameh-emails.json",
];

const byId = new Map();
for (const source of sources) {
  const parsed = JSON.parse(await readFile(source, "utf8"));
  for (const email of parsed.emails) byId.set(email.id, email);
}

function cleanBody(body) {
  const lines = String(body || "").replace(/\r/g, "").split("\n");
  const kept = [];
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (/^Multi Gates for Industri/i.test(line.trim())) break;
    if (/^From:\s/i.test(line.trim()) && kept.some((item) => item.trim())) break;
    kept.push(line);
  }
  return kept
    .join("\n")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

const emails = [...byId.values()].sort((a, b) => new Date(a.date) - new Date(b.date));
const output = [
  "# Sameh email source digest",
  "",
  `Generated from ${emails.length} Gmail messages matching ` +
    "`from:sameh.ahmed@multigates-co.com`.",
  "",
];

for (const email of emails) {
  const date = new Date(email.date);
  output.push(
    `## ${date.toISOString()} · ${email.subject || "(no subject)"} · ${email.id}`,
    "",
    cleanBody(email.body) || "_No request text before the signature._",
    "",
  );
  if (email.attachments.length) {
    output.push(
      "**Attachments:** " +
        email.attachments.map((attachment) => "`" + attachment.filename + "`").join(", "),
      "",
    );
  }
}

await writeFile("audit/sameh-email-digest.md", `${output.join("\n")}\n`, "utf8");
console.log(`Wrote ${emails.length} emails to audit/sameh-email-digest.md`);
