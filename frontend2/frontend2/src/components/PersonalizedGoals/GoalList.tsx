import React from "react";

import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import {
  Check as CheckIcon,
  DateRange as DateIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lightbulb as LightbulbIcon,
  School as SchoolIcon,
  Celebration as CelebrationIcon,
} from "@mui/icons-material";

import type { Goal } from "../../types/types";
import { GoalCard } from "../Styled/GoalCard";
import { ProgressBar } from "../Styled/ProgressBar";
import { StyledPaper } from "../Styled/StyledPaper";

type Props = {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
};

const GoalList: React.FC<Props> = ({ goals, onEdit, onDelete }) => {
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
        <SchoolIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        Current Learning Goals
      </Typography>
      {goals.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: theme.palette.text.secondary,
          }}
        >
          <LightbulbIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No goals yet
          </Typography>
          <Typography variant="body1">
            Add your first learning goal to get started!
          </Typography>
        </Box>
      ) : (
        <List>
          {goals
            .slice()
            .sort(
              (a, b) =>
                new Date(a.targetDate).getTime() -
                new Date(b.targetDate).getTime()
            )
            .map((goal) => (
              <GoalCard
                key={goal.id}
                elevation={2}
                completed={goal.progress === 100}
              >
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {goal.title}
                        {goal.progress === 100 && (
                          <CheckIcon
                            sx={{
                              ml: 1,
                              verticalAlign: "middle",
                              color: theme.palette.success.main,
                            }}
                          />
                        )}
                      </Typography>
                    }
                    secondary={
                      <>
                        {goal.description && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 1 }}
                          >
                            {goal.description}
                          </Typography>
                        )}
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <DateIcon
                            sx={{
                              mr: 1,
                              fontSize: 16,
                              color: theme.palette.text.secondary,
                            }}
                          />
                          <Typography variant="caption" color="textSecondary">
                            Target:{" "}
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Edit Goal">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEdit(goal)}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Goal">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(goal)}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mr: 2 }}
                  >
                    Progress: {goal.progress}%
                  </Typography>
                  <ProgressBar
                    variant="determinate"
                    value={goal.progress}
                    sx={{ flexGrow: 1 }}
                  />
                </Box>
                {goal.progress === 100 && (
                  <Box sx={{ mt: 1, textAlign: "center" }}>
                    <Chip
                      icon={<CelebrationIcon />}
                      label="Goal Achieved!"
                      sx={{
                        fontWeight: "bold",
                        background: (theme) => theme.palette.success.light,
                        color: theme.palette.success.main,
                      }}
                    />
                  </Box>
                )}
              </GoalCard>
            ))}
        </List>
      )}
    </StyledPaper>
  );
};

export default GoalList;
