import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import type { Goal } from "../../types/types";
import { Edit as EditIcon } from "@mui/icons-material";

interface Props {
  open: boolean;
  editingGoal: Goal | null;
  onClose: () => void;
  onUpdate: (e: React.FormEvent) => void;
  onChange: (goal: Goal) => void;
  editDateError: string;
  setEditDateError: (msg: string) => void;
}

const EditGoalDialog: React.FC<Props> = ({
  open,
  editingGoal,
  onClose,
  onUpdate,
  onChange,
  editDateError,
  setEditDateError,
}) => {
  const theme = useTheme();

  if (!editingGoal) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
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
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          fontWeight: "bold",
        }}
      >
        <EditIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Edit Learning Goal
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <form onSubmit={onUpdate}>
          <TextField
            fullWidth
            label="Goal Title"
            name="title"
            value={editingGoal.title}
            onChange={(e) =>
              onChange({ ...editingGoal, title: e.target.value })
            }
            required
            margin="normal"
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editingGoal.description}
            onChange={(e) =>
              onChange({ ...editingGoal, description: e.target.value })
            }
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography gutterBottom>Progress</Typography>
            <Slider
              value={editingGoal.progress}
              onChange={(_, value) =>
                onChange({ ...editingGoal, progress: value as number })
              }
              aria-labelledby="edit-progress-slider"
              valueLabelDisplay="auto"
              step={5}
              sx={{
                color: theme.palette.primary.main,
                "& .MuiSlider-thumb": {
                  boxShadow: `0 0 0 8px ${alpha(
                    theme.palette.primary.main,
                    0.16
                  )}`,
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0 0 0 10px ${alpha(
                      theme.palette.primary.main,
                      0.25
                    )}`,
                  },
                },
              }}
              marks={[
                { value: 0, label: "0%" },
                { value: 25, label: "25%" },
                { value: 50, label: "50%" },
                { value: 75, label: "75%" },
                { value: 100, label: "100%" },
              ]}
            />
          </Box>
          <TextField
            fullWidth
            label="Target Date"
            name="targetDate"
            type="date"
            value={editingGoal.targetDate.split("T")[0]}
            onChange={(e) => {
              onChange({ ...editingGoal, targetDate: e.target.value });
              if (editDateError) setEditDateError("");
            }}
            margin="normal"
            variant="outlined"
            required
            error={Boolean(editDateError)}
            helperText={editDateError}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: { min: new Date().toISOString().split("T")[0] },
              sx: {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: theme.palette.text.secondary }}>
          Cancel
        </Button>
        <Button
          onClick={onUpdate}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Update Goal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGoalDialog;