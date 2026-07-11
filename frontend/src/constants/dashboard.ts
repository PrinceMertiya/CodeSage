import {
  Activity,
  Database,
  FolderGit2,
  HardDrive,
} from "lucide-react";

export const stats = [
  {
    title: "Repositories",
    value: "12",
    change: "+18%",
    description: "Total connected",
    icon: FolderGit2,
    trend: [20, 35, 28, 42, 50, 64, 78],
  },
  {
    title: "Analyses",
    value: "28",
    change: "+12%",
    description: "This month",
    icon: Activity,
    trend: [15, 22, 30, 38, 42, 55, 70],
  },
  {
    title: "Files Scanned",
    value: "5,642",
    change: "+8%",
    description: "Across repositories",
    icon: Database,
    trend: [40, 48, 60, 58, 70, 80, 92],
  },
  {
    title: "Storage Used",
    value: "2.45 GB",
    change: "24%",
    description: "of 10 GB",
    icon: HardDrive,
    trend: [8, 14, 22, 26, 34, 42, 48],
  },
];

export const analysisData = [
  { day: "Mon", analyses: 4 },
  { day: "Tue", analyses: 6 },
  { day: "Wed", analyses: 8 },
  { day: "Thu", analyses: 7 },
  { day: "Fri", analyses: 12 },
  { day: "Sat", analyses: 10 },
  { day: "Sun", analyses: 15 },
];

export const languageData = [
  { name: "TypeScript", value: 46 },
  { name: "Python", value: 24 },
  { name: "Java", value: 14 },
  { name: "JavaScript", value: 10 },
  { name: "Other", value: 6 },
];

export const repositories = [
  {
    name: "ai-resume-analyzer",
    language: "Python",
    files: 1248,
    status: "Completed",
    updated: "2 days ago",
  },
  {
    name: "E-Commerce-Backend",
    language: "JavaScript",
    files: 842,
    status: "Completed",
    updated: "5 days ago",
  },
  {
    name: "CodeSage",
    language: "TypeScript",
    files: 2356,
    status: "Analyzing",
    updated: "1 hour ago",
  },
  {
    name: "ML-Model-API",
    language: "Python",
    files: 1390,
    status: "Completed",
    updated: "Yesterday",
  },
];

export const activities = [
  {
    title: "Analysis completed for ai-resume-analyzer",
    time: "2 min ago",
  },
  {
    title: "Repository connected: CodeSage",
    time: "20 min ago",
  },
  {
    title: "AI summary generated",
    time: "1 hour ago",
  },
  {
    title: "Architecture diagram created",
    time: "Yesterday",
  },
];