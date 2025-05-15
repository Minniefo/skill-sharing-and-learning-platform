
import React from "react";

import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const navItems: NavItem[] = [
  { id: "plan", label: "Plan", icon: <SchoolIcon /> },
  { id: "stats", label: "Stats", icon: <BarChartIcon /> },
];

interface Props {
  currentView: string;
  setView: (view: string) => void;
  width?: number;
}

const SideNav: React.FC<Props> = ({ currentView, setView, width = 220 }) => {
  return (
    <Box
      sx={{
        width,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRight: 1,
        borderColor: "divider",
        pt: 0,
        height: "100%",
        overflow: "auto",
      }}
    >
      <List disablePadding>
        {navItems.map(({ id, label, icon }) => (
          <ListItemButton
            key={id}
            selected={currentView === id}
            onClick={() => setView(id)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ color: "inherit" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SideNav;
