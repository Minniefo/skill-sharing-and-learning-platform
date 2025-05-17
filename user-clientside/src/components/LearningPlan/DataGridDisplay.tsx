import React from "react";

import {
  Box,
  IconButton,
  LinearProgress,
  Typography,
  Chip,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

interface TopicRow {
  id: number;
  title: string;
  resources?: string[];
  resource?: string;
  deadline: string;
  progress: number;
}

interface Props {
  topics: TopicRow[];
  loading: boolean;
  updateTopicInline: (updated: TopicRow) => void;
  onEdit: (row: TopicRow) => void;
  onDelete: (id: number) => void;
  toBackendUrl: (path: string) => string;
}

const DataGridDisplay: React.FC<Props> = ({
  topics,
  loading,
  updateTopicInline,
  onEdit,
  onDelete,
  toBackendUrl,
}) => {
  const columns = [
    { field: "title", headerName: "Topic", flex: 1, editable: true },
    {
      field: "resources",
      headerName: "Resource",
      flex: 1.2,
      valueGetter: () => null,
      renderCell: ({ row }: { row: TopicRow }) => {
        if (Array.isArray(row.resources) && row.resources.length > 0) {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {row.resources.map((path, idx) => (
                <Chip
                  key={idx}
                  label={path.split("/").pop()}
                  size="small"
                  component="a"
                  href={toBackendUrl(path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                />
              ))}
            </Box>
          );
        }
        if (row.resource) {
          return (
            <a
              href={row.resource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-indigo-500 hover:text-indigo-700"
            >
              Link
            </a>
          );
        }
        return "—";
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 130,
      type: "date",
      valueGetter: ({ value }: { value: string }) =>
        value ? new Date(value) : null,
      valueFormatter: ({ value }: { value: Date }) =>
        value.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      editable: true,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 160,
      type: "number",
      editable: true,
      renderCell: ({ value = 0 }: { value: number }) => (
        <Box
          sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}
        >
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{ flexGrow: 1, height: 6, borderRadius: 5 }}
          />
          <Typography variant="caption" sx={{ width: 28, textAlign: "right" }}>
            {value}%
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: ({ id, row }: { id: number; row: TopicRow }) => (
        <>
          <IconButton size="small" onClick={() => onEdit(row)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(id)}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 540 }}>
      <DataGrid
        rows={topics}
        //@ts-ignore
        columns={columns}
        getRowId={(r) => r.id}
        disableRowSelectionOnClick
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: { fileName: "learning-plan", utf8WithBom: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
          },
        }}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 100}
        virtualizeColumnsWithAutoRowHeight
        processRowUpdate={(newRow) => {
          updateTopicInline(newRow);
          return newRow;
        }}
        onRowEditStop={() => console.log("Edit stopped")}
      />
    </Box>
  );
};

export default DataGridDisplay;