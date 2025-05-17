import React, { useRef } from "react";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { Save } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

interface TopicForm {
  title: string;
  resource: string;
  resources: string[];
  files: File[];
  deadline: string;
  progress: number;
}

interface Props {
  open: boolean;
  editingId: number | null;
  form: TopicForm;
  onClose: () => void;
  onSave: () => void;
  setForm: React.Dispatch<React.SetStateAction<TopicForm>>;
  removeResource: (index: number) => void;
  removeFile: (index: number) => void;
  getToday: () => string;
}

const TopicDialog: React.FC<Props> = ({
  open,
  editingId,
  form,
  onClose,
  onSave,
  setForm,
  removeResource,
  removeFile,
  getToday,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingId ? "Edit Topic" : "Add New Topic"}</DialogTitle>
      <DialogContent dividers className="grid gap-4 pt-4">
        <TextField
          required
          label="Topic Title"
          value={form.title}
          autoFocus
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />

        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: "1px dashed",
            borderColor: "grey.400",
            borderRadius: 1,
            p: 1,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {form.files.length > 0 ? (
            form.files.map((file, idx) => (
              <Chip
                key={idx}
                label={file.name}
                onDelete={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                sx={{ m: 0.5 }}
              />
            ))
          ) : (
            <Typography color="text.secondary">Upload PDF or DOCX</Typography>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            hidden
            onChange={(e) => {
              const chosen = Array.from(e.target.files || []);
              setForm((f) => ({
                ...f,
                files: chosen,
                resource: chosen.length ? "" : f.resource,
              }));
            }}
          />
        </Box>

        {form.resources.length > 0 && (
          <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ width: "100%" }}>
              Existing Resources
            </Typography>
            {form.resources.map((url, idx) => (
              <Chip
                key={idx}
                label={url.replace(/^.*\//, "")}
                component="a"
                href={url}
                target="_blank"
                clickable
                onDelete={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeResource(idx);
                }}
                sx={{
                  m: 0.5,
                  maxWidth: 200,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              />
            ))}
          </Box>
        )}

        <TextField
          label="Resource URL"
          value={form.resource}
          onChange={(e) => setForm((f) => ({ ...f, resource: e.target.value }))}
          disabled={form.files.length > 0}
          helperText={
            form.files.length > 0 ? "Using uploaded file(s) instead of URL" : ""
          }
        />

        <TextField
          label="Deadline"
          type="date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: getToday() }}
          value={form.deadline}
          onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
        />

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>
            Progress: {form.progress}%
          </Typography>
          <Slider
            value={form.progress}
            onChange={(_, val) =>
              setForm((f) => ({ ...f, progress: val as number }))
            }
            aria-labelledby="progress-slider"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" startIcon={<Save />}>
          {editingId ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TopicDialog;