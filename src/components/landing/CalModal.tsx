import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalModal = ({ open, onOpenChange }: CalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Agendar Reunião</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full min-h-0">
          <iframe
            src="https://cal.com/creativeia-agentes-t6ryln/creativevoiceia?embed=true&theme=dark"
            className="w-full h-full border-0 rounded-b-lg"
            style={{ minHeight: "calc(80vh - 60px)" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalModal;
