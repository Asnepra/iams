// TicketList.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Ticket {
  id: number;
  title: string;
  status: string;
  priority: string;
  date: string;
}

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: number | null;
  onSelectTicket: (ticketId: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, selectedTicketId, onSelectTicket }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Tickets</h2>
      <div className="space-y-2">
        {tickets.map(ticket => (
          <Card
            key={ticket.id}
            className={`cursor-pointer hover:bg-gray-50 ${selectedTicketId === ticket.id ? 'border-2 border-indigo-500' : ''}`}
            onClick={() => onSelectTicket(ticket.id)}
          >
            <CardHeader className="p-2">
              <CardTitle className="text-sm">{ticket.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className={`text-xs ${ticket.status === 'open' ? 'text-red-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                Status: {ticket.status}
              </p>
              <p className={`text-xs ${ticket.priority === 'high' ? 'text-red-500' : ticket.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                Priority: {ticket.priority}
              </p>
              <p className="text-xs text-gray-500">Date: {ticket.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TicketList;
