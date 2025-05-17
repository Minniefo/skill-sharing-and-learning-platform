import { styled, alpha } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  background:
    theme.palette.mode === "light"
      ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(
          theme.palette.primary.light,
          0.05
        )})`
      : theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));