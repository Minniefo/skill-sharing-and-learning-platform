import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CssBaseline,
  Fab,
  Snackbar,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import useLocalStorage from "../hooks/useLocalStorage";
import SideNav from "../components/LearningPlan/SideNav";
import TopicDialog from "../components/LearningPlan/TopicDialog";
import DataGridDisplay from "../components/LearningPlan/DataGridDisplay";
import PieChartDisplay from "../components/LearningPlan/PieChartDisplay";
import { getTopics, createTopic, updateTopic, deleteTopic } from "../api/plans";
import type {
  Topic,
  FormState,
  View,
  SnackState,
  Bucket,
} from "../types/types";

const lightColors = {
  primary: "#4361ee",
  secondary: "#3f37c9",
  success: "#4cc9f0",
  warning: "#f8961e",
  error: "#f72585",
  info: "#4895ef",
  dark: "#3a0ca3",
  light: "#f8f9fa",
};

const darkColors = {
  primary: "#4895ef",
  secondary: "#4361ee",
  success: "#4cc9f0",
  warning: "#f8961e",
  error: "#f72585",
  info: "#3f37c9",
  dark: "#3a0ca3",
  light: "#121212",
};

const BUCKET_COLOURS = ["#ef4444", "#f97316", "#eab308", "#10b981"];

const LearningPlanApp = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [view, setView] = useState<View>("plan");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<SnackState>({ open: false, msg: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const getToday = () => new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<FormState>({
    title: "",
    resource: "",
    files: [],
    resources: [],
    deadline: getToday(),
    progress: 0,
  });

  const fetchData = () => {
    setLoading(true);
    getTopics()
      .then(setTopics)
      .catch(() => setSnack({ open: true, msg: "Failed to load plans" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDialogSave = () => {
    if (!form.title.trim()) return;
  
    const updatedResources = form.resource.trim()
      ? [...form.resources, form.resource.trim()]
      : form.resources;
  
    const topicPayload = {
      ...form,
      resources: updatedResources,
    };
  
    if (editingId) {
      // Assuming updateTopic supports raw object (or needs to be adjusted like createTopic)
      updateTopic(editingId, topicPayload)
        .then((updated) => {
          setTopics((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t))
          );
          setSnack({ open: true, msg: "Topic updated" });
        })
        .catch(() => setSnack({ open: true, msg: "Update failed" }));
    } else {
      createTopic({ topic: topicPayload, files: form.files })
        .then((created) => {
          setTopics((prev) => [...prev, created]);
          setSnack({ open: true, msg: "Topic added" });
        })
        .catch(() => setSnack({ open: true, msg: "Create failed" }));
    }
  
    setDialogOpen(false);
  };
  

  const updateTopicInline = (updatedRow: any) => {
    updateTopic(updatedRow.id, updatedRow)
      .then((updated) => {
        setTopics((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
        setSnack({ open: true, msg: "Row updated" });
      })
      .catch(() => setSnack({ open: true, msg: "Update failed" }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({
      title: "",
      resource: "",
      files: [],
      resources: [],
      deadline: getToday(),
      progress: 0,
    });
    setDialogOpen(true);
  };

  const openEdit = (topic: any) => {
    setEditingId(topic.id);
    setForm({
      title: topic.title,
      resource: "",
      files: [],
      resources: topic.resources || [],
      deadline: topic.deadline,
      progress: topic.progress,
    });
    setDialogOpen(true);
  };

  const deleteRow = (id: number) => {
    deleteTopic(id)
      .then(() => {
        setTopics((prev) => prev.filter((t) => t.id !== id));
        setSnack({ open: true, msg: "Topic deleted" });
      })
      .catch(() => setSnack({ open: true, msg: "Delete failed" }));
  };

  const removeResource = (idx: number) =>
    setForm((f) => ({
      ...f,
      resources: f.resources.filter((_, i) => i !== idx),
    }));
  const removeFile = (idx: number) =>
    setForm((f) => ({ ...f, files: f.files.filter((_, i) => i !== idx) }));
  const toBackendUrl = (path: string) =>
    /^https?:\/\//i.test(path)
      ? path
      : `http://localhost:8083/${path.replace(/^\//, "")}`;

  const overall = useMemo(() => {
    if (!topics.length) return 0;
    return (
      topics.reduce((sum, t) => sum + Number(t.progress || 0), 0) /
      topics.length
    );
  }, [topics]);

  const bucketData = useMemo(() => {
    const buckets: Bucket[] = [
      { label: "0-25 %", topics: [] },
      { label: "26-50 %", topics: [] },
      { label: "51-75 %", topics: [] },
      { label: "76-100 %", topics: [] },
    ];
    topics.forEach((t) => {
      const p = Number(t.progress || 0);
      const i = p < 25 ? 0 : p < 50 ? 1 : p < 75 ? 2 : 3;
      buckets[i].topics.push(t.title);
    });
    return buckets.map((b, i) => ({
      name: b.label,
      value: b.topics.length,
      fill: BUCKET_COLOURS[i],
      topicNames: b.topics,
    }));
  }, [topics]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? darkColors.primary : lightColors.primary },
      secondary: {
        main: darkMode ? darkColors.secondary : lightColors.secondary,
      },
      background: {
        default: darkMode ? darkColors.light : lightColors.light,
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideNav
          currentView={view}
          setView={(newView: string) => setView(newView as View)}
        />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Toolbar />
          <Box component="main" sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
            {view === "plan" && (
              <Card elevation={3}>
                <CardContent>
                  <DataGridDisplay
                    topics={topics}
                    loading={loading}
                    updateTopicInline={updateTopicInline}
                    onEdit={openEdit}
                    onDelete={deleteRow}
                    toBackendUrl={toBackendUrl}
                  />
                </CardContent>
              </Card>
            )}
            {view === "stats" && (
              <PieChartDisplay
                overall={overall}
                bucketData={bucketData}
                onAddTopic={openAdd}
              />
            )}
          </Box>
          <TopicDialog
            open={dialogOpen}
            editingId={editingId}
            form={form}
            onClose={() => setDialogOpen(false)}
            onSave={handleDialogSave}
            setForm={setForm}
            removeResource={removeResource}
            removeFile={removeFile}
            getToday={getToday}
          />
          <Snackbar
            open={snack.open}
            autoHideDuration={2000}
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            message={snack.msg}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
          {view !== "stats" && (
            <Fab
              color="primary"
              aria-label="add"
              onClick={openAdd}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: (t) => t.zIndex.drawer + 2,
                boxShadow: 6,
              }}
            >
              <AddIcon />
            </Fab>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LearningPlanApp;