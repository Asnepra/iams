// TicketSummary.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TicketSummaryProps {
  summary: {
    open: number;
    pending: number;
    closed: number;
  };
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ summary }) => {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <h2 className="text-lg font-semibold mb-2">Ticket Summary</h2>
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-indigo-700 text-white">
          <CardHeader className="p-2">
            <CardTitle className="text-sm">Open</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-bold">{summary.open}</p>
          </CardContent>
        </Card>
        <Card className="bg-indigo-700 text-white">
          <CardHeader className="p-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-bold">{summary.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-indigo-700 text-white">
          <CardHeader className="p-2">
            <CardTitle className="text-sm">Closed</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-bold">{summary.closed}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TicketSummary;
