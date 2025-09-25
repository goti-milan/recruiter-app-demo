import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export type CompanyProfile = {
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  description?: string | null;
  logo?: File | { id: string; name: string; url: string; } | undefined;
  address?: string | null;
  postalCode?: string | null;
  website?: string | null;
  linkedin?: string | null;
  employeeSize?: number | string | null;
  gst?: string | null;
  twitter?: string | null;
  companyImages?: (File | { id: string; name: string; url: string; })[] | null;
  otherOptionalFields?: Record<string, any> | null;
};

type Props = {
  company: CompanyProfile;
  className?: string;
  size?: number; // px for width/height
};

const toBool = (v: any) => v !== undefined && v !== null && String(v).trim() !== "";

export const computeScore = (company: CompanyProfile) => {
  const weights = {
    companyName: 10,
    email: 5,
    phone: 5,
    description: 10,
    logo: 10,
    address: 10,

    website: 15,
    linkedin: 10,
    employeeSize: 10,
    gst: 5,

    twitter: 5,
    images: 5,
  } as const;

  const items = [] as number[];

  items.push(toBool(company.companyName) ? weights.companyName : 0);
  items.push(toBool(company.email) ? weights.email : 0);
  items.push(toBool(company.phone) ? weights.phone : 0);
  items.push(toBool(company.description) ? weights.description : 0);
  items.push(toBool(company.logo) ? weights.logo : 0);

  const hasCity = toBool(company.address);
  const hasPostal = toBool(company.postalCode);
  items.push((hasCity ? weights.address / 2 : 0) + (hasPostal ? weights.address / 2 : 0));

  items.push(toBool(company.website) ? weights.website : 0);
  items.push(toBool(company.linkedin) ? weights.linkedin : 0);
  items.push(toBool(company.employeeSize) ? weights.employeeSize : 0);
  items.push(toBool(company.gst) ? weights.gst : 0);

  // items.push(toBool(company.twitter) ? weights.twitter : 0);
  items.push(Array.isArray(company.companyImages) && company.companyImages.length > 0 ? weights.images : 0);

  const total = items.reduce((s, v) => s + v, 0);
  return Math.min(100, Math.round(total));
};

const createCenterTextPlugin = (text: string): Plugin<'doughnut'> => ({
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { ctx, width, height } = chart;
    ctx.save();
    // Outer circle area is canvas width/height
    ctx.font = `600 ${Math.max(Math.floor(height * 0.18), 12)}px "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`;
    ctx.fillStyle = "#111827"; // gray-900
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
    ctx.restore();
  },
});

const ProfileCompletion: React.FC<Props> = ({ company, className = "", size = 80 }) => {
  const score = useMemo(() => computeScore(company), [company]);

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: [score, Math.max(0, 100 - score)],
          backgroundColor: ["#3f1562", "#E5E7EB"], // primary and gray-200
          borderColor: ["#3f1562", "#E5E7EB"],
          borderWidth: 0,
        },
      ],
    }),
    [score]
  );

  const options: ChartOptions<'doughnut'> = useMemo(
    () => ({
      cutout: "70%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    }),
    []
  );

  return (
    <div className={`flex gap-2 py-2 flex-col md:w-auto w-full ${className}`}>
      <div style={{ width: size, height: size }}>
        <Doughnut data={data} options={options} plugins={[createCenterTextPlugin(`${score}%`)]} />
      </div>
      <p>You {score > 79 ? `have completed ${score}% of your profile` : "need to complete your profile to unlock hiring features"}</p>
    </div>
  );
};

export default ProfileCompletion;
