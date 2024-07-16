import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"


import {
  Shield,
  ShieldEllipsis
} from "lucide-react"

export const labels = [
  {
    value: "Admin",
    label: "Admin",
    icon: ShieldEllipsis,
    color:"#3e9392"
  },
  {
    value: "Normal",
    label: "Normal",
    icon: Shield,
    color:"gray"
  }
]

// Create a map of gradient colors for each user type
const gradientColorMap = {
  Admin: "linear-gradient(to right, #30cfd0, #330867)",
  Normal: "linear-gradient(to right, #4facfe, #00f2fe)",
};