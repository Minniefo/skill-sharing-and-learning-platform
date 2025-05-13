import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Typography,
  ThemeProvider,
} from "@mui/material";

import {
  AutoAwesome as AutoAwesomeIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

import { getTheme } from "../hooks/theme";
import { float } from "../hooks/animations";
import type { Goal, User } from "../types/types";
import { getGoals, createGoal,updateGoal,deleteGoal } from "../api/plans";
import GoalList from "../components/PersonalizedGoals/GoalList";
import TasksDialog from "../components/PersonalizedGoals/TaskDialog";
import AddGoalForm from "../components/PersonalizedGoals/AddGoalForm";
import Achievements from "../components/PersonalizedGoals/Achivements";
import EditGoalDialog from "../components/PersonalizedGoals/EditGoalDialog";
import ProgressSummary from "../components/PersonalizedGoals/ProgressSummary";
import DeleteConfirmDialog from "../components/PersonalizedGoals/DeleteConfirmDialog";

const achievementsData = [
  {
    id: 1,
    title: "First Step",
    description: "Complete your first goal",
    threshold: 1,
    icon: <AutoAwesomeIcon fontSize="large" color="warning" />,
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Complete 3 goals",
    threshold: 3,
    icon: <AutoAwesomeIcon fontSize="large" color="error" />,
  },
  {
    id: 3,
    title: "Goal Achiever",
    description: "Complete 5 goals",
    threshold: 5,
    icon: <AutoAwesomeIcon fontSize="large" color="info" />,
  },
];

const PersonalizedGoalsLayout = () => {
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({
    title: "",
    description: "",
    progress: 0,
    targetDate: "",
    id: 0,
  });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  //@ts-ignore
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [openTasksDialog, setOpenTasksDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [dateError, setDateError] = useState("");
  const [editDateError, setEditDateError] = useState("");

  useEffect(() => {
    setCurrentUser({ id: 8, username: "John Doe" });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchGoals();
    }
  }, [currentUser]);

  const fetchGoals = async () => {
    const goals = await getGoals(8)
    console.log(goals)
     setGoals(goals)
    // Replace with real API
    const dummyGoals: Goal[] = [
      {
        id: 1,
        title: "Learn TypeScript",
        description: "Basics to advanced",
        progress: 60,
        targetDate: "2025-06-30",
      },
      {
        id: 2,
        title: "Build a React App",
        description: "With routing and state",
        progress: 100,
        targetDate: "2025-05-10",
      },
    ];
   // setGoals(dummyGoals);
  };

  const theme = getTheme(darkMode);

  const completedGoals = goals.filter((g) => g.progress === 100).length;
  const inProgressGoals = goals.filter((g) => g.progress < 100).length;

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", JSON.stringify(next));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", bgcolor: theme.palette.background.default }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          {showCelebration && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  animation: `${float} 2s ease-in-out infinite`,
                  textAlign: "center",
                }}
              >
                <AutoAwesomeIcon
                  sx={{ fontSize: 120, color: theme.palette.warning.main }}
                />
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.primary.dark, fontWeight: "bold" }}
                >
                  Goal Achieved!
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => setOpenTasksDialog(true)}
            >
              Open Learning Plan
            </Button>
            <Button onClick={toggleDarkMode}>
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Box>

          <Box
            sx={{
              mb: 4,
              p: 3,
              background: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <SchoolIcon sx={{ fontSize: 48, mr: 2 }} />
              {currentUser
                ? `${currentUser.username}'s Learning Journey`
                : "Loading..."}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", opacity: 0.9 }}
            >
              Track your progress and celebrate your achievements
            </Typography>
          </Box>

          <AddGoalForm
            newGoal={newGoal}
            handleInputChange={(e) =>
              setNewGoal({ ...newGoal, [e.target.name]: e.target.value })
            }
            handleProgressChange={(_, val) =>
              setNewGoal({ ...newGoal, progress: val as number })
            }
            onDateChange={(e) => {
              setNewGoal({ ...newGoal, targetDate: e.target.value });
              setDateError("");
            }}
            handleSubmit={ async (e) => {
              e.preventDefault();
              let data = newGoal
              data.userId = 8
              await createGoal(data)
              await getGoals(8)


              alert("123!");
              console.log(newGoal)
            }}
            dateError={dateError}
          />

          <ProgressSummary
            total={goals.length}
            completed={completedGoals}
            inProgress={inProgressGoals}
          />

          <GoalList
            goals={goals}
            onEdit={(g) => {
              setEditingGoal(g);
              setOpenEditDialog(true);
            }}
            onDelete={(g) => {
              setGoalToDelete(g);
              setOpenDeleteDialog(true);
            }}
          />

          <Achievements
            completedGoals={completedGoals}
            achievementsData={achievementsData}
          />

          <EditGoalDialog
            open={openEditDialog}
            editingGoal={editingGoal}
            onClose={() => setOpenEditDialog(false)}
            onUpdate={async (e) => {
              e.preventDefault();
              if (editingGoal) {
                try {
                  await updateGoal(editingGoal.id, editingGoal);
                  // call to backend
                  const updatedGoals = await getGoals(8); // fetch updated list
                  setGoals(updatedGoals);
                  setOpenEditDialog(false); // close modal
                } catch (err) {
                  console.error("Error updating goal:", err);
                  alert("Failed to update goal");
                }
              }
            }}

            onChange={(g) => setEditingGoal(g)}
            editDateError={editDateError}
            setEditDateError={setEditDateError}
          />

          <DeleteConfirmDialog
              open={openDeleteDialog}
              goalToDelete={goalToDelete}
              onClose={() => setOpenDeleteDialog(false)}
              onDelete={async () => {
                if (goalToDelete) {
                  try {
                    await deleteGoal(goalToDelete.id);
                    const updatedGoals = await getGoals(8);
                    setGoals(updatedGoals);
                    setOpenDeleteDialog(false);
                  } catch (error) {
                    console.error("Failed to delete goal:", error);
                    alert("Failed to delete the goal");
                  }
                }
              }}
          />


          <TasksDialog
            open={openTasksDialog}
            onClose={() => setOpenTasksDialog(false)}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PersonalizedGoalsLayout;
