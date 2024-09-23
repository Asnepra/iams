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
} from "lucide-react"

export const labels = [
  {
    value: "AE SD",
    label: "AE SD",
    icon: Ligature,
  },
  {
    value: "BusDev-Non Tax",
    label: "BusDev-Non Tax",
    icon: Focus,
  },
  {
    value: "BusinessDevelop",
    label: "BusinessDevelop",
    icon: FileSignature,
  },
  {
    value: "Contracts",
    label: "Contracts",
    icon: Receipt,
  },
  {
    value: "Corp. Comm.",
    label: "Corp. Comm.",
    icon: Nfc,
  },
  {
    value: "CP ES",
    label: "CP ES",
    icon: InspectionPanel,
  },
  {
    value: "Deputation",
    label: "Deputation",
    icon: BriefcaseBusiness,
  },
  {
    value: "DIR(P BD)s Off.",
    label: "DIR(P BD)s Off.",
    icon: Briefcase,
  },
  {
    value: "E P",
    label: "E P",
    icon: Telescope,
  },
  {
    value: "E P-Non Taxable",
    label: "E P-Non Taxable",
    icon: LandmarkIcon,
  },
  {
    value: "Finance",
    label: "Finance",
    icon: IndianRupee,
  },
  {
    value: "Gas",
    label: "Gas",
    icon: Fuel,
  },
  {
    value: "HSE",
    label: "HSE",
    icon: GlobeLock,
  },
  {
    value: "Human Resource",
    label: "Human Resource",
    icon: User,
  },
  {
    value: "Info. Systems",
    label: "Info. Systems",
    icon: Orbit,
  },
  {
    value: "Internal Audit",
    label: "Internal Audit",
    icon: ShieldQuestion,
  },
  {
    value: "IT Helpdesk",
    label: "IT Helpdesk",
    icon: ShieldHalfIcon,
  },
  {
    value: "New Business",
    label: "New Business",
    icon: Handshake,
  },
  {
    value: "Petrochemicals",
    label: "Petrochemicals",
    icon: AudioLinesIcon,
  },
  {
    value: "Vigilance",
    label: "Vigilance",
    icon: TriangleAlert,
  },
]

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
    icon: GitPullRequestClosed,
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
