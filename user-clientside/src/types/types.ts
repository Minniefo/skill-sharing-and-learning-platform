import type { JSX } from "react";

export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  targetDate: string;
  completed?: boolean;
}

export interface User {
  id: string;
  username: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  threshold: number;
  icon: JSX.Element;
}

export interface Topic {
  id: number;
  title: string;
  progress: number;
  resources: string[];
  deadline: string;
}

export interface FormState {
  title: string;
  resource: string;
  files: any[]; // Replace `any` with the actual type if known
  resources: string[];
  deadline: string;
  progress: number;
}

export type View = "plan" | "stats";

export interface SnackState {
  open: boolean;
  msg: string;
}

export interface Bucket {
  label: string;
  topics: string[];
}