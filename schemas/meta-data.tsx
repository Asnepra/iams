import {
  Biohazard,
  Briefcase,
  BriefcaseBusiness,
  CheckCheck,
  CircleHelp,
  FileSignature,
  Focus,
  Fuel,
  GitPullRequestClosed,
  GlobeLock,
  Handshake,
  IndianRupee,
  InspectionPanel,
  LandmarkIcon,
  Ligature,
  Nfc,
  Orbit,
  Receipt,
  Ruler,
  ServerCog,
  ShieldHalfIcon,
  ShieldQuestion,
  Store,
  Telescope,
  TriangleAlert,
  User,
  Trash,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  AudioLinesIcon,
  Columns2,
} from "lucide-react";

// Define Pastel Colors for Labels
const PASTEL_COLORS: Record<string, string> = {
  "AE SD": "bg-pink-200",
  "BusDev-Non Tax": "bg-blue-200",
  "BusinessDevelop": "bg-green-200",
  "Contracts": "bg-yellow-200",
  "Corp. Comm.": "bg-purple-200",
  "CP ES": "bg-teal-200",
  "Deputation": "bg-red-200",
  "DIR(P BD)s Off.": "bg-indigo-200",
  "E P": "bg-orange-200",
  "E P-Non Taxable": "bg-lime-200",
  "Finance": "bg-rose-200",
  "Gas": "bg-amber-200",
  "HSE": "bg-sky-200",
  "Human Resource": "bg-violet-200",
  "Info. Systems": "bg-cyan-200",
  "Internal Audit": "bg-fuchsia-200",
  "IT Helpdesk": "bg-green-300",
  "New Business": "bg-indigo-300",
  "Petrochemicals": "bg-red-300",
  "Vigilance": "bg-yellow-300",
};

// Define Labels with Icons and Pastel Colors
export const labels = [
  { value: "AE SD", label: "AE SD", icon: Ligature, color: PASTEL_COLORS["AE SD"] },
  { value: "BusDev-Non Tax", label: "BusDev-Non Tax", icon: Focus, color: PASTEL_COLORS["BusDev-Non Tax"] },
  { value: "BusinessDevelop", label: "BusinessDevelop", icon: FileSignature, color: PASTEL_COLORS["BusinessDevelop"] },
  { value: "Contracts", label: "Contracts", icon: Receipt, color: PASTEL_COLORS["Contracts"] },
  { value: "Corp. Comm.", label: "Corp. Comm.", icon: Nfc, color: PASTEL_COLORS["Corp. Comm."] },
  { value: "CP ES", label: "CP ES", icon: InspectionPanel, color: PASTEL_COLORS["CP ES"] },
  { value: "Deputation", label: "Deputation", icon: BriefcaseBusiness, color: PASTEL_COLORS["Deputation"] },
  { value: "DIR(P BD)s Off.", label: "DIR(P BD)s Off.", icon: Briefcase, color: PASTEL_COLORS["DIR(P BD)s Off."] },
  { value: "E P", label: "E P", icon: Telescope, color: PASTEL_COLORS["E P"] },
  { value: "E P-Non Taxable", label: "E P-Non Taxable", icon: LandmarkIcon, color: PASTEL_COLORS["E P-Non Taxable"] },
  { value: "Finance", label: "Finance", icon: IndianRupee, color: PASTEL_COLORS["Finance"] },
  { value: "Gas", label: "Gas", icon: Fuel, color: PASTEL_COLORS["Gas"] },
  { value: "HSE", label: "HSE", icon: GlobeLock, color: PASTEL_COLORS["HSE"] },
  { value: "Human Resource", label: "Human Resource", icon: User, color: PASTEL_COLORS["Human Resource"] },
  { value: "Info. Systems", label: "Info. Systems", icon: Orbit, color: PASTEL_COLORS["Info. Systems"] },
  { value: "Internal Audit", label: "Internal Audit", icon: ShieldQuestion, color: PASTEL_COLORS["Internal Audit"] },
  { value: "IT Helpdesk", label: "IT Helpdesk", icon: ShieldHalfIcon, color: PASTEL_COLORS["IT Helpdesk"] },
  { value: "New Business", label: "New Business", icon: Handshake, color: PASTEL_COLORS["New Business"] },
  { value: "Petrochemicals", label: "Petrochemicals", icon: AudioLinesIcon, color: PASTEL_COLORS["Petrochemicals"] },
  { value: "Vigilance", label: "Vigilance", icon: TriangleAlert, color: PASTEL_COLORS["Vigilance"] },
];

// Define Statuses with Icons
export const statuses = [
  { value: "Pending", label: "Pending", icon: CircleHelp },
  { value: "Issued", label: "Issued", icon: CheckCheck },
  { value: "Rejected", label: "Rejected", icon: GitPullRequestClosed },
  { value: "In IS Store", label: "In IS Store", icon: Store },
  { value: "Assigned", label: "Assigned", icon: FileSignature },
  { value: "Under Maint.", label: "Under Maint.", icon: ServerCog },
  { value: "Condemned", label: "Condemned", icon: Columns2 },
];

// Define Priorities with Icons
export const priorities = [
  { label: "Low", value: "low", icon: ArrowDownIcon },
  { label: "Medium", value: "medium", icon: ArrowRightIcon },
  { label: "High", value: "high", icon: ArrowUpIcon },
];

// Status Mapping with Descriptions
export const STATUS_DESCRIPTIONS: Record<number, string> = {
  102: "Assigned",
  201: "Pending",
  202: "Issued",
  203: "Rejected",
};

// Status Color Mapping using Tailwind CSS classes
export const STATUS_COLORS: Record<number, string> = {
  102: "bg-gray-200 text-gray-800", // Assigned
  201: "bg-yellow-200 text-yellow-800", // Pending
  202: "bg-green-200 text-green-800", // Issued
  203: "bg-red-200 text-red-800", // Rejected
};

// Status Color Mapping by Label
export const STATUS_COLORS_S: Record<string, string> = {
  "Assigned": "bg-gray-200 text-gray-800", // Assigned
  "Pending": "bg-yellow-200 text-yellow-800", // Pending
  "Issued": "bg-green-200 text-green-800", // Issued
  "Rejected": "bg-red-200 text-red-800", // Rejected
};
