import { styled } from "@mui/material/styles";
import { float } from "../../hooks/animations";

export const AchievementBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "unlocked",
})<{ unlocked: boolean }>(({ theme, unlocked }) => ({
  position: "absolute",
  top: -12,
  right: -12,
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
  color: theme.palette.common.white,
  boxShadow: theme.shadows[2],
  zIndex: 1,
  ...(unlocked && {
    animation: `${float} 3s ease-in-out infinite`,
  }),
}));