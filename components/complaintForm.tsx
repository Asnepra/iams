"use client";

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
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [assetComplaintMessage, setAssetComplaintMessage] = useState<string>("");
  const [assetImage, setAssetImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const organizeTickets = (data: TicketCatProps[]) => {
    const organized: { [key: number]: { mainCatName: string; subCategories: { subCatId: number; subCatName: string; ticketCatId: number; }[]; } } = {};
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
    if (mainCatId < 1) {
      toast.error("Please select a complaint type.");
      return false;
    }
    if (subCatId < 1 || ticketId === null) {
      toast.error("Please select a specific complaint.");
      return false;
    }
    if (!assetComplaintMessage.trim()) {
      toast.error("Please enter a message.");
      return false;
    }
    if (assetImage && (assetImage.size > MAX_FILE_SIZE || !ACCEPTED_IMAGE_TYPES.includes(assetImage.type))) {
      toast.error("Image size must be less than 1 MB and in .jpg, .jpeg, .png, or .webp format.");
      return false;
    }
    return true;
  };

  const handleComplaint = async () => {
    if (!validateInputs()) return;
    console.log("data",mainCatId, subCatId, assetComplaintMessage, assetImage);

    // setLoading(true);
    // const token = Cookies.get('token');
    // const formData = new FormData();
    // formData.append('token', token);
    // formData.append('mainCatId', mainCatId.toString());
    // formData.append('subCatId', subCatId.toString());
    // formData.append('ticketID', ticketId?.toString() || "");
    // formData.append('assetComplaintMessage', assetComplaintMessage);
    // if (assetImage) {
    //   formData.append('assetImage', assetImage);
    // }

    // try {
    //   await axios.post('/api/requestedComplaints', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   toast.success("Request raised successfully!");
    //   setTimeout(() => window.location.reload(), 2000);
    // } catch (error) {
    //   toast.error("Error submitting the complaint");
    //   console.error("Submission Error:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <div>
        <Label>Complaint Type</Label>
        <Select onValueChange={(value) => {
          setMainCatId(Number(value));
          setSubCatId(-1); // Reset specific complaint
          setTicketId(null); // Reset ticketID
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

      <div>
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

      <ChatInput 
        placeholder="Enter your message in detail, you can attach a maximum of 1 image" 
        onSubmit={handleComplaint} 
      />
      
      
    </div>
  );
};

export default ComplaintForm;
