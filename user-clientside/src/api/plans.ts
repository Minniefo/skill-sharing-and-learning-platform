import axios from "axios";

const API_BASE_URL = "http://localhost:8083/api/topics";
const API_SUPER_BASE_URL = "http://localhost:8083/api";

// Get all topics (if used)
export const getTopics = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Get all goals for a specific user
export const getGoals = async (userId: string) => {
  const response = await axios.get(`${API_SUPER_BASE_URL}/goals/user/${userId}`);
  return response.data;
};

// Create a new goal
export const createGoal = async (payload: any) => {
  const response = await axios.post(`${API_SUPER_BASE_URL}/goals`, payload);
  return response.data;
};

// Update an existing goal
export const updateGoal = async (id: number, payload: any) => {
  const response = await axios.put(`${API_SUPER_BASE_URL}/goals/${id}`, payload);
  return response.data;
};

// Delete a goal by ID
export const deleteGoal = async (id: number) => {
  const response = await axios.delete(`${API_SUPER_BASE_URL}/goals/${id}`);
  return response.data;
};



// Delete a topic (if needed)
export const deleteTopic = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Create a topic (if used)
export const createTopic = async (payload: {
  topic: any;
  files?: File[];
}) => {
  const formData = new FormData();

  // Append the topic as a JSON string
  formData.append("topic", new Blob([JSON.stringify(payload.topic)], { type: "application/json" }));

  // Append files, if any
  if (payload.files && payload.files.length > 0) {
    payload.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await axios.post(API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update a topic (if used)
export const updateTopic = async (id: number, payload: any) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, payload);
  return response.data;
};
