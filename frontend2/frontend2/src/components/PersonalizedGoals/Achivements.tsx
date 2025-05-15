import React from "react";

import { StyledPaper } from "../Styled/StyledPaper";
import type { Achievement } from "../../types/types";
import { AchievementCard } from "../Styled/AchivementCard";
import { AchievementBadge } from "../Styled/AchievementBadge";
import { Typography, Box, Chip, useTheme } from "@mui/material";
import {
  Check as CheckIcon,
  EmojiEvents as AchievementsIcon,
} from "@mui/icons-material";

import Grid from "@mui/material/Grid";

interface Props {
  completedGoals: number;
  achievementsData: Achievement[];
}

const Achievements: React.FC<Props> = ({
  completedGoals,
  achievementsData,
}) => {
  const theme = useTheme();

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
        <AchievementsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        Your Learning Achievements
      </Typography>
      <Grid container spacing={3}>
        {achievementsData.map((achievement) => {
          const unlocked = completedGoals >= achievement.threshold;
          return (
            //@ts-ignore
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <AchievementCard unlocked={unlocked}>
                {unlocked && (
                  <AchievementBadge unlocked={unlocked}>
                    <CheckIcon fontSize="small" />
                  </AchievementBadge>
                )}
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Box sx={{ mb: 2 }}>{achievement.icon}</Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: unlocked
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                    }}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: unlocked
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
                      mb: 2,
                    }}
                  >
                    {achievement.description}
                  </Typography>
                  <Chip
                    label={`${achievement.threshold}+ Goals`}
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1,
                      borderColor: unlocked
                        ? theme.palette.success.main
                        : theme.palette.divider,
                      color: unlocked
                        ? theme.palette.success.main
                        : theme.palette.text.secondary,
                    }}
                  />
                </Box>
              </AchievementCard>
            </Grid>
          );
        })}
      </Grid>
      {completedGoals === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: theme.palette.text.secondary,
          }}
        >
          <AchievementsIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No achievements yet
          </Typography>
          <Typography variant="body1">
            Complete your first goal to unlock achievements!
          </Typography>
        </Box>
      )}
    </StyledPaper>
  );
};

export default Achievements;
