// TicketDetails.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Ticket {
  title: string;
  status: string;
  priority: string;
  user: User;
  date: string;
  description: string;
  chat: ChatMessage[];
}

interface TicketDetailsProps {
  ticket: Ticket | null;
  onCloseTicket: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onCloseTicket }) => {
  if (!ticket) return null;

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-800">Ticket Details</h1>
        <button onClick={onCloseTicket} className="text-red-500">Close Ticket</button>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardTitle className="flex justify-between items-center">
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-600">Status</p>
                    <p className={`font-bold ${ticket.status === 'open' ? 'text-red-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Priority</p>
                    <p className="font-bold">{ticket.priority}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Assignee</p>
                    <p className="font-bold">{ticket.user.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-600">User Information</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Avatar>
                        <AvatarImage src={ticket.user.avatar} />
                        <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{ticket.user.name}</p>
                        <p className="text-sm text-gray-500">{ticket.user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Date Created</p>
                    <p className="text-sm text-gray-800">{ticket.date}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <p className="font-semibold text-gray-600 mb-2">Description</p>
                <p className="text-sm text-gray-800">{ticket.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <div className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {ticket.chat.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'Support' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'Support' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                        <p className="text-sm font-semibold">{message.sender}</p>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default TicketDetails;
