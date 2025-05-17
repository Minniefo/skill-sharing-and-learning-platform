import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";

import type { Goal } from "../../types/types";

interface Props {
  open: boolean;
  goalToDelete: Goal | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmDialog: React.FC<Props> = ({
  open,
  goalToDelete,
  onClose,
  onDelete,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.error.main,
          color: theme.palette.common.white,
          fontWeight: "bold",
        }}
      >
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete the goal "{goalToDelete?.title}"?
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: theme.palette.text.secondary }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: theme.palette.text.secondary }}>
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;