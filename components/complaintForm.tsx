'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import axios from "axios";
import { ChatInput } from "@/components/chat-input";
import FormError from "@/components/form-error"; 
import { TicketCatProps, USER_ASSET } from "@/schemas/ticket";

const MAX_FILE_SIZE = 1000000; // 1 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface ComplaintFormProps {
  assets: USER_ASSET[];
  ticketCat: TicketCatProps[];
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ assets, ticketCat }) => {
  const [mainCatId, setMainCatId] = useState<number>(-1);
  const [subCatId, setSubCatId] = useState<number>(-1);
  const [ticketId, setTicketId] = useState<number | null>(-1);
  const [ticketCatId, setTicketCatId] = useState<number>(-1);

  const [assetsId, setAssetsId] = useState<number>(-1);
  const [assetImage, setAssetImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const organizeTickets = (data: TicketCatProps[]) => {
    const organized: {
      [key: number]: {
        mainCatName: string;
        subCategories: {
          subCatId: number;
          subCatName: string;
          ticketCatId: number;
        }[];
      };
    } = {};

    data.forEach(item => {
      const { mainCatId, mainCatName, subCatId, subCatName, ticketCatId } = item;
      if (!organized[mainCatId]) {
        organized[mainCatId] = { mainCatName, subCategories: [] };
      }
      organized[mainCatId].subCategories.push({ subCatId, subCatName, ticketCatId });
    });
    return organized;
  };

  const organizedTicketData = organizeTickets(ticketCat);
  const specificComplaints = mainCatId && organizedTicketData[mainCatId]
    ? organizedTicketData[mainCatId].subCategories
    : [];

  const validateInputs = () => {
    setErrorMessage(null); 
    if (assetsId < 1) {
      setErrorMessage("Please select an asset.");
      return false;
    }
    if (mainCatId < 1) {
      setErrorMessage("Please select a complaint type.");
      return false;
    }
    if (subCatId < 1 || ticketId === null) {
      setErrorMessage("Please select a specific complaint.");
      return false;
    }
    if (assetImage && (assetImage.size > MAX_FILE_SIZE || !ACCEPTED_IMAGE_TYPES.includes(assetImage.type))) {
      setErrorMessage("Image size must be less than 1 MB and in .jpg, .jpeg, .png, or .webp format.");
      return false;
    }
    return true;
  };
  const getTicketCatId = (mainCatId: number, subCatId: number) => {
    //console.log("Function called with:", { mainCatId, subCatId });
    
    // Find the selected ticket category
    const selectedTicketCat = ticketCat.find(item => {
      const match = item.mainCatId === mainCatId && item.subCatId === subCatId;
      //console.log("Checking item:", item, "Match:", match);
      return match;
    });
  
    if (selectedTicketCat) {
      //console.log("Selected ticket category found:", selectedTicketCat, "ghbjmkl", selectedTicketCat.ticketCatId);
      return selectedTicketCat.ticketCatId;
    } else {
      //console.log("No matching ticket category found.");
      return -1; // Returning -1 if no match is found
    }
  };
  
  const handleComplaint = async ({ body, image }: { body: string; image: File | null }) => {
    if (!validateInputs()) return;
    const id=getTicketCatId(mainCatId,subCatId);
    //console.log("ticket id", id)
    setTicketCatId(id);


    setLoading(true);
    const token = Cookies.get('token');
  
    const formData = new FormData();
    formData.append("token", token ?? "");
    formData.append("asset_id", assetsId.toString());
    formData.append("ticket_cat_id", id.toString());

    formData.append("assetComplaintMessage", body);
    if (image) {
      formData.append("assetImage", image);
    }

    console.log("Form data:", Array.from(formData.entries()));
  
    try {
      await axios.post('/api/raiseTicket', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Request raised successfully!, reloading");
      
      // Reset form fields
      setMainCatId(-1);
      setSubCatId(-1);
      setTicketId(null);
      setAssetImage(null);
      setAssetsId(-1); // Reset asset ID
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error submitting the complaint. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-2">
      <div className="space-y-2">
        <Label>Select Asset</Label>
        <Select onValueChange={(value) => {
          const selectedAsset = assets.find(asset => asset.assetBatchId.toString() === value);
          if (selectedAsset) {
            setAssetsId(selectedAsset.assetBatchId);
            setSubCatId(-1);
            setTicketId(null);
          }
        }}>
          <SelectTrigger aria-label="Select Asset">
            <SelectValue placeholder="Select an Asset..." />
          </SelectTrigger>
          <SelectContent>
            {assets.map(asset => (
              <SelectItem key={asset.assetBatchId} value={asset.assetBatchId.toString()}>
                {asset.assetModel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Complaint Type</Label>
          <Select onValueChange={(value) => {
            setMainCatId(Number(value));
            setSubCatId(-1);
            setTicketId(null);
          }}>
            <SelectTrigger aria-label="Select Complaint Type">
              <SelectValue placeholder="Select a complaint type..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(organizedTicketData).map(([mainCatId, { mainCatName }]) => (
                <SelectItem key={mainCatId} value={mainCatId}>
                  {mainCatName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 gap-4">
          <Label>Specific Complaint</Label>
          <Select onValueChange={(value) => {
            const selectedComplaint = specificComplaints.find(c => c.subCatId.toString() === value);
            if (selectedComplaint) {
              setSubCatId(selectedComplaint.subCatId);
              setTicketId(selectedComplaint.ticketCatId);
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a specific complaint..." />
            </SelectTrigger>
            <SelectContent>
              {specificComplaints.map(complaint => (
                <SelectItem key={complaint.subCatId} value={complaint.subCatId.toString()}>
                  {complaint.subCatName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2 gap-4">
        <FormError message={errorMessage || undefined} />

        <ChatInput 
          placeholder="Enter your message in detail, you can attach a maximum of 1 image" 
          onSubmit={handleComplaint} 
        />
      </div>
    </div>
  );
};

export default ComplaintForm;