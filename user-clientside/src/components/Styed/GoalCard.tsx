import { styled, alpha } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { pulse } from "../../hooks/animations";

export const GoalCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "completed",
})<{ completed: boolean }>(({ theme, completed }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  background: completed
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.success.main,
        0.08
      )}, ${alpha(theme.palette.success.main, 0.03)})`
    : `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.08
      )}, ${alpha(theme.palette.primary.main, 0.03)})`,
  borderLeft: `4px solid ${
    completed ? theme.palette.success.main : theme.palette.primary.main
  }`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[4],
  },
  ...(completed && {
    animation: `${pulse} 2s infinite`,
  }),
}));