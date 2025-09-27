import { useState, memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  setPaymentId: (id: string) => void;
}

export default memo(function ManualCouponFetchModal({
  open,
  onClose,
  setPaymentId
}: Props) {
  const [id, setId] = useState("");

  const handleSubmit = () => {
    if (!id.trim()) return;
    setPaymentId(id.trim());
    handleClose();
  };

    const handleClose = () => {
    setId(''); // Clear when closing
    onClose(); //use parent onclose fucntion
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "visible"
        }
      }}
    >
      {/* ---- Proper Close Button using MUI's positioning ---- */}
      <DialogTitle className="relative text-lg font-semibold text-gray-800 pr-12">
        Enter Payment ID
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            bgcolor: 'black',
            color: 'white',
            width: 32,
            height: 32,
            '&:hover': {
              bgcolor: 'grey.800',
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ---- Content ---- */}
      <DialogContent>
        <Box className="flex flex-col gap-4 mt-2">
          <Box className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Payment ID from Razorpay email
            </label>
            <TextField
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              variant="outlined"
              placeholder="Enter your payment ID"
            />
          </Box>

          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            fullWidth
            sx={{
              bgcolor: 'grey.800',
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'grey.900'
              }
            }}
          >
            Get Coupon
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
});