import { api } from "../../store";
import { IJob } from "../../types";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<IJob[],void>({
      query: () => "jobs",
    })
  }),
});

export const { useGetJobsQuery } = extendedApi;
