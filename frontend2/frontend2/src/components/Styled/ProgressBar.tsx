import { styled, alpha } from "@mui/material/styles";
import { LinearProgress } from "@mui/material";

export const ProgressBar = styled(LinearProgress)<{ value: number }>(
  ({ theme, value }) => ({
    height: 10,
    borderRadius: 8,
    margin: theme.spacing(2, 0),
    backgroundColor: alpha(theme.palette.primary.light, 0.2),
    "& .MuiLinearProgress-bar": {
      borderRadius: 8,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      ...(value === 100 && {
        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
      }),
    },
  })
);
