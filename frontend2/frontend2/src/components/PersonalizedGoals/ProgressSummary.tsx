// ProgressSummary.tsx
import React from "react";

import { ProgressBar } from "../Styled/ProgressBar";
import { StyledPaper } from "../Styled/StyledPaper";
import { TrendingUp as ProgressIcon } from "@mui/icons-material";
import { Box, Chip, Avatar, Typography, useTheme } from "@mui/material";

interface Props {
  total: number;
  completed: number;
  inProgress: number;
}

const ProgressSummary: React.FC<Props> = ({ total, completed, inProgress }) => {
  const theme = useTheme();
  return (
    <StyledPaper elevation={3}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          color: theme.palette.text.primary,
        }}
      >
        <ProgressIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        Progress Overview
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.success.main }}>
              {completed}
            </Avatar>
          }
          label="Completed"
          variant="outlined"
          sx={{
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
            fontWeight: "bold",
          }}
        />
        <Chip
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {inProgress}
            </Avatar>
          }
          label="In Progress"
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        />
        <Chip
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              {total}
            </Avatar>
          }
          label="Total Goals"
          variant="outlined"
          sx={{
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            fontWeight: "bold",
          }}
        />
      </Box>
      <ProgressBar
        variant="determinate"
        value={total > 0 ? (completed / total) * 100 : 0}
      />
    </StyledPaper>
  );
};

export default ProgressSummary;
