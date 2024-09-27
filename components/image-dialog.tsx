import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageDialogProps {
  imageSrc: string | null;
  onClose: () => void;
}

const ImageDialog = ({ imageSrc, onClose }: ImageDialogProps) => {
  return (
    <Dialog open={!!imageSrc} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-xl">
        <DialogHeader>
          <DialogTitle>Uploaded Image</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" className="rounded-lg" />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
