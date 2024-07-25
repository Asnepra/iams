import React from 'react';

const ApprovalTimeline = ({ filteredRequests }) => (
  <div className="bg-background rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-bold mb-4">Approval Timeline</h2>
    <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-10">
      {filteredRequests.map((request, index) => (
        <div key={request.id} className="grid gap-1 text-sm relative">
          <div
            className={`aspect-square w-3 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 ${
              request.status === "Pending"
                ? "bg-muted-foreground"
                : request.status === "Approved"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          />
          <div className="font-medium">{request.requestedOn}</div>
          <div className="text-muted-foreground">
            {request.printerModel} requested {request.printerModel} ({request.status})
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ApprovalTimeline;
