import React from "react";

import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";



interface Props {
  open: boolean;
  onClose: () => void;
}

const TasksDialog: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: "100vh",
          width: "100vw",
        },
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`
              : `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.dark})`,
          color:
            theme.palette.mode === "dark" ? theme.palette.grey[100] : "white",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Your Learning Plan
          </Typography>
        </Toolbar>
      </AppBar>
      {/*   <LearningPlanApp /> */}
    </Dialog>
  );
};

export default TasksDialog;
