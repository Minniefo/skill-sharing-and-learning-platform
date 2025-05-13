import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Paper from "@mui/material/Paper";
import { Add } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

interface BucketData {
  name: string;
  value: number;
  fill: string;
  topicNames: string[];
}

interface Props {
  overall: number;
  bucketData: BucketData[];
  onAddTopic: () => void;
}

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { name, value, topicNames } = payload[0].payload;

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {value} topic{value !== 1 ? "s" : ""} in this range
      </Typography>
      {topicNames.map((t: string) => (
        <Typography key={t} variant="caption" display="block">
          • {t}
        </Typography>
      ))}
    </Paper>
  );
};

const PieChartDisplay: React.FC<Props> = ({
  overall,
  bucketData,
  onAddTopic,
}) => {
  return (
    <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <Box className="col-span-1 lg:col-span-2">
        <Typography variant="subtitle1" gutterBottom>
          Overall Progress
        </Typography>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={bucketData}
              dataKey="value"
              outerRadius="100%"
              innerRadius="80%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={1}
              strokeOpacity={0}
            >
              {bucketData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <RechartsTooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box className="flex flex-col justify-center items-center">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {overall.toFixed(0)}%
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          average completion
        </Typography>

        <Legend
          payload={bucketData.map((d) => ({
            id: d.name,
            type: "square",
            value: `${d.name} (${d.value})`,
            color: d.fill,
          }))}
          wrapperStyle={{ fontSize: 12, marginLeft: 250 }}
        />

        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          sx={{ mt: 2 }}
          onClick={onAddTopic}
        >
          Add Topic
        </Button>
      </Box>
    </Box>
  );
};

export default PieChartDisplay;
