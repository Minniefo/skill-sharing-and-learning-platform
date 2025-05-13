import { styled, alpha } from "@mui/material/styles";
import { Card } from "@mui/material";

export const AchievementCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "unlocked",
})<{ unlocked: boolean }>(({ theme, unlocked }) => ({
  minWidth: 200,
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "visible",
  background: unlocked
    ? `linear-gradient(135deg, ${alpha(
        theme.palette.success.main,
        0.1
      )}, ${alpha(theme.palette.background.default, 0.8)})`
    : `linear-gradient(135deg, ${alpha(theme.palette.grey[300], 0.1)}, ${alpha(
        theme.palette.grey[100],
        0.8
      )})`,
  border: unlocked
    ? `1px solid ${alpha(theme.palette.success.main, 0.3)}`
    : `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
  boxShadow: unlocked
    ? `0 4px 20px ${alpha(theme.palette.success.main, 0.2)}`
    : "none",
  "&:hover": {
    transform: unlocked ? "translateY(-5px)" : "none",
    boxShadow: unlocked
      ? `0 10px 25px ${alpha(theme.palette.success.main, 0.3)}`
      : `0 4px 8px ${alpha(theme.palette.grey[400], 0.1)}`,
  },
  opacity: unlocked ? 1 : 0.8,
}));
