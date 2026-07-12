import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Repository Types
|--------------------------------------------------------------------------
*/
export interface RepositoryDetails {
  id: string;
  repositoryUrl: string;
  projectName: string;
  projectType?: string | null;
  architecture?: string | null;

  frameworks?: unknown;
  metrics?: Record<string, unknown> | null;
  summary?: Record<string, unknown> | null;
  project?: Record<string, unknown> | null;
  executionFlow?: unknown;
  repositoryGraph?: unknown;

  repositoryDiagram?: string | null;
  functionDiagram?: string | null;
  executionDiagram?: string | null;
  architectureDiagram?: string | null;

  createdAt: string;
  updatedAt: string;
}

interface RepositoryResponse {
  success: boolean;
  repository: RepositoryDetails;
}
export interface RepositoryTreeNode {
  id: string;
  name: string;
  path: string;
  type: "folder" | "file";

  extension?: string | null;
  language?: string | null;
  size?: number;
  lines?: number;

  children?: RepositoryTreeNode[];
}

export interface RepositoryFile {
  id: string;
  repositoryId: string;
  name: string;
  relativePath: string;
  extension?: string | null;
  language?: string | null;
  size: number;
  lines: number;
  content: string;
}

interface TreeResponse {
  success: boolean;
  tree: RepositoryTreeNode[];
}

interface FileResponse {
  success: boolean;
  file: RepositoryFile;
}

/*
|--------------------------------------------------------------------------
| Repository Service
|--------------------------------------------------------------------------
*/

export const RepositoryService = {
  analyze: (repositoryUrl: string) =>
    api.post(
      "/repository/analyze",
      {
        repositoryUrl,
      }
    ),

  getRepositories: () =>
    api.get("/repositories"),

  getRepository: (id: string) =>
  api.get<RepositoryResponse>(
    `/repositories/${id}`
  ),

  getTree: (id: string) =>
    api.get<TreeResponse>(
      `/repositories/${id}/tree`
    ),

  getFile: (
    id: string,
    path: string
  ) =>
    api.get<FileResponse>(
      `/repositories/${id}/file`,
      {
        params: {
          path,
        },
      }
    ),

  deleteRepository: (id: string) =>
    api.delete(
      `/repositories/${id}`
    ),

  reanalyzeRepository: (id: string) =>
    api.post(
      `/repositories/${id}/reanalyze`
    ),
};