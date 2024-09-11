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
    icon: CircleHelp, // Represents pending or awaiting action
  },
  {
    value: "Issued",
    label: "Issued",
    icon: CheckCheck, // Represents issued or distributed items
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: GitPullRequestClosed, // Represents rejected or problematic status
  },
  {
    value: "In IS Store",
    label: "In IS Store",
    icon: Store, // Represents items in store or inventory
  },
  {
    value: "Assigned",
    label: "Assigned",
    icon: FileSignature, // Represents tasks or items that are assigned
  },
  {
    value: "Under Maint.",
    label: "Under Maint.",
    icon: ServerCog, // Represents maintenance status
  },
  {
    value: "Condemned",
    label: "Condemned",
    icon: Columns2, // Represents items that are condemned or disposed
  },
  
]


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
