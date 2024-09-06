import { formatDate } from "@/lib/utils";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface ToastData {
  transId: number;
  assetId: number;
  cartridgeId: number;
  requestedQty: number;
  approvedQty: number;
  statusId: number;
  requestedBy: string;
  requestedOn: string;
  approvedBy: string;
  approvedOn: string;
  approvingReason: string;
  cartridgeReturned: boolean;
}

const showCustomToast = (data: ToastData) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Please return the old Cartridge having
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Approved On: {formatDate(data.approvedOn)}
              </p>
              <p className="mt-1 text-sm text-rose-500">
                Returned Status: {data.cartridgeReturned ? 'Returned' : 'Not Returned'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X/>Dsimiss
          </button>
        </div>
      </div>
    ), {
      position: "top-right",
    });
  }
  
  export default showCustomToast;
