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
  X,
  SquareXIcon,
  CircleXIcon,
  UserCircle,
} from "lucide-react";

export const departments = [
  {
    value: "AE SD",
    label: "AE SD",
    icon: Ligature,
    color: "#FF6384", // Example color
  },
  {
    value: "BusDev-Non Tax",
    label: "BusDev-Non Tax",
    icon: Focus,
    color: "#36A2EB", // Example color
  },
  {
    value: "BusinessDevelop",
    label: "BusinessDevelop",
    icon: FileSignature,
    color: "#FFCE56", // Example color
  },
  {
    value: "Contracts",
    label: "Contracts",
    icon: Receipt,
    color: "#4BC0C0", // Example color
  },
  {
    value: "Corp. Comm.",
    label: "Corp. Comm.",
    icon: Nfc,
    color: "#9966FF", // Example color
  },
  {
    value: "CP ES",
    label: "CP ES",
    icon: InspectionPanel,
    color: "#FF9F9F", // Example color
  },
  {
    value: "Deputation",
    label: "Deputation",
    icon: BriefcaseBusiness,
    color: "#7AD0F5", // Example color
  },
  {
    value: "DIR(P BD)s Off.",
    label: "DIR(P BD)s Off.",
    icon: Briefcase,
    color: "#F7B500", // Example color
  },
  {
    value: "E P",
    label: "E P",
    icon: Telescope,
    color: "#1CC6B2", // Example color
  },
  {
    value: "E P-Non Taxable",
    label: "E P-Non Taxable",
    icon: LandmarkIcon,
    color: "#A178FF", // Example color
  },
  {
    value: "Finance",
    label: "Finance",
    icon: IndianRupee,
    color: "#FF6F61", // Example color
  },
  {
    value: "Gas",
    label: "Gas",
    icon: Fuel,
    color: "#87CEEB", // Example color
  },
  {
    value: "HSE",
    label: "HSE",
    icon: GlobeLock,
    color: "#FF7F50", // Example color
  },
  {
    value: "Human Resource",
    label: "Human Resource",
    icon: UserCircle,
    color: "#008080", // Example color
  },
  {
    value: "Info. Systems",
    label: "Info. Systems",
    icon: Orbit,
    color: "#9B59B6", // Example color
  },
  {
    value: "Internal Audit",
    label: "Internal Audit",
    icon: ShieldQuestion,
    color: "#FF6347", // Example color
  },
  {
    value: "IT Helpdesk",
    label: "IT Helpdesk",
    icon: ShieldHalfIcon,
    color: "#6A5ACD", // Example color
  },
  {
    value: "New Business",
    label: "New Business",
    icon: Handshake,
    color: "#FFD700", // Example color
  },
  {
    value: "Petrochemicals",
    label: "Petrochemicals",
    icon: AudioLinesIcon,
    color: "#ADFF2F", // Example color
  },
  {
    value: "Vigilance",
    label: "Vigilance",
    icon: TriangleAlert,
    color: "#FF4500", // Example color
  },
];

// Export this for use in your component


export const statuses = [
  {
    value: "Pending",
    label: "Pending",
    icon: CircleHelp,
    color: "bg-yellow-200 text-yellow-800", // Yellow for pending
  },
  {
    value: "Issued",
    label: "Issued",
    icon: CheckCheck,
    color: "bg-green-200 text-green-800", // Green for issued
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: CircleXIcon,
    color: "bg-red-200 text-red-800", // Red for rejected
  },
  {
    value: "In IS Store",
    label: "In IS Store",
    icon: Store,
    color: "bg-blue-200 text-blue-800", // Blue for in store
  },
  {
    value: "Assigned",
    label: "Assigned",
    icon: FileSignature,
    color: "bg-indigo-200 text-indigo-800", // Indigo for assigned
  },
  {
    value: "Under Maint.",
    label: "Under Maint.",
    icon: ServerCog,
    color: "bg-orange-200 text-orange-800", // Orange for under maintenance
  },
  {
    value: "Condemned",
    label: "Condemned",
    icon: Columns2,
    color: "bg-gray-200 text-gray-800", // Gray for condemned
  },
];


export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
