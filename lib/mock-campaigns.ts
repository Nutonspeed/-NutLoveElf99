import type { CampaignReport } from "@/components/CampaignReportCard";

export let mockCampaignReports: CampaignReport[] = [
  { slug: "summer-sale", clicks: 120, bills: 30 },
  { slug: "facebook-ad", clicks: 80, bills: 10 },
  { slug: "line-broadcast", clicks: 50, bills: 8 },
];

export function loadCampaignReports() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("campaignReports");
    if (stored) mockCampaignReports = JSON.parse(stored);
  }
}
