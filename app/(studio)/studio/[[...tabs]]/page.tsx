import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { hasSanity } from "@/lib/sanity";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!hasSanity) {
    return (
      <div style={{ maxWidth: 640, margin: "15vh auto", padding: 32, font: "400 16px/1.6 system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>Connect Sanity to open the Studio</h1>
        <p>
          Add your project ID to <code>.env.local</code>:
        </p>
        <pre style={{ background: "#f4f4f1", padding: 16, borderRadius: 12 }}>NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id{"\n"}NEXT_PUBLIC_SANITY_DATASET=production</pre>
        <p>
          Then restart <code>npm run dev</code>. Full steps are in <code>README.md</code> → “Connect Sanity”.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
