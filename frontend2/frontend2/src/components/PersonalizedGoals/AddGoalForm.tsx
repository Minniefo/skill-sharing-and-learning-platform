import React from "react";

import {
  Box,
  Button,
  Slider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { StyledPaper } from "../Styled/StyledPaper";
import { Add as AddIcon } from "@mui/icons-material";

type Props = {
  newGoal: {
    title: string;
    description: string;
    progress: number;
    targetDate: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgressChange: (e: Event, value: number | number[]) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  dateError?: string;
};

const AddGoalForm: React.FC<Props> = ({
  newGoal,
  handleInputChange,
  handleProgressChange,
  onDateChange,
  handleSubmit,
  dateError = "",
}) => {
  const theme = useTheme();
  const today = new Date().toISOString().split("T")[0];

  return (
    <StyledPaper elevation={3}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.primary,
        }}
      >
        <AddIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        Add New Learning Goal
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Goal Title"
          name="title"
          value={newGoal.title}
          onChange={handleInputChange}
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
          value={newGoal.description}
          onChange={handleInputChange}
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
          <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>
            Initial Progress
          </Typography>
          <Slider
            value={newGoal.progress}
            onChange={handleProgressChange}
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
        <TextField
          fullWidth
          label="Target Date"
          name="targetDate"
          type="date"
          value={newGoal.targetDate}
          onChange={onDateChange}
          margin="normal"
          variant="outlined"
          required
          error={Boolean(dateError)}
          helperText={dateError}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: { min: today },
            sx: {
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{
            mt: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
            },
          }}
        >
          Add Goal
        </Button>
      </form>
    </StyledPaper>
  );
};

export default AddGoalForm;
