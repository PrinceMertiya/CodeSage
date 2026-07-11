import { api } from "./api";

export const RepositoryService = {

    analyze: (url: string) =>
        api.post("/repository/analyze", { url }),

    getRepository: (id: string) =>
        api.get(`/repository/${id}`),

    getTree: (id: string) =>
        api.get(`/repository/${id}/tree`),

    getFile: (id: string, path: string) =>
        api.get(`/repository/${id}/file`, {
            params: { path },
        }),

};