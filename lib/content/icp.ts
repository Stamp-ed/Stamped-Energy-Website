/** Single source for ICP copy — revenue floor, bill band, buyer titles. */

export const icp = {
  revenueFloor: "₹200 Cr+",
  revenueFloorShort: "₹200 Cr",
  monthlyBillBand: "₹20-30 lakh+",
  monthlyBillFloor: "₹20 lakh",
  monthlyBillFloorShort: "₹20L",
  buyerTitles: [
    "Plant Director",
    "VP Operations",
    "Head of Electrical",
    "CFO",
  ] as const,
  buyerTitlesShort: "plant directors, VP Ops, and electrical heads",
  geography: "Indian manufacturers",
  positioning:
    "Prescriptive energy intelligence - specific prescriptions, rupee impact, verified on your next DISCOM bill.",
} as const;

export function icpBillLine() {
  return `For ${icp.geography} spending ${icp.monthlyBillFloor} on electricity every month`;
}
