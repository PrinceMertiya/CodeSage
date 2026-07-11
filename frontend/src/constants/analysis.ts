export const analysisStages = [
  {
    title: "Repository Connected",
    completed: true,
  },
  {
    title: "Cloning Repository",
    completed: true,
  },
  {
    title: "Reading Files",
    completed: true,
  },
  {
    title: "Generating Chunks",
    active: true,
  },
  {
    title: "Creating Embeddings",
  },
  {
    title: "AI Analysis",
  },
];

export const analysisLogs = [
  "[10:42:21] Repository connected.",
  "[10:42:24] Cloning repository...",
  "[10:42:30] Repository cloned successfully.",
  "[10:42:38] Reading project files...",
  "[10:42:44] TypeScript detected.",
  "[10:42:48] Parsing source files...",
  "[10:42:56] Generating chunks...",
];