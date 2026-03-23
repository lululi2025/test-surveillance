import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compositions = [
  "EdgeAIDetection",
  "FacialRecLPR",
  "CustomAlertRules",
  "EdgeStorage",
  "NLSearch",
  "UnifiedDashboard",
  "CompetitorComparison",
];

const outputDir = path.resolve(
  __dirname,
  "../outputs/marketing-content/ai-cloud-surveillance-landing-page/assets/videos"
);

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  console.log("📦 Bundling Remotion project...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "src/index.ts"),
    webpackOverride: (config) => config,
  });

  for (const compositionId of compositions) {
    console.log(`\n🎬 Rendering ${compositionId}...`);
    const composition = await selectComposition({
      serveUrl: bundled,
      id: compositionId,
    });

    const outputPath = path.join(outputDir, `${compositionId}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: "h264",
      outputLocation: outputPath,
    });

    console.log(`✅ ${compositionId} → ${outputPath}`);
  }

  console.log("\n🎉 All animations rendered successfully!");
}

main().catch((err) => {
  console.error("❌ Render failed:", err);
  process.exit(1);
});
