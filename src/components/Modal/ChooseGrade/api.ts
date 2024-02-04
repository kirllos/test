import { api } from "../../../store";
import { IGrade } from "../../../types";


const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGrades: build.query<IGrade[],void>({
      query: () => "grades",
    }),

  }),
});

export const { useGetGradesQuery } = extendedApi;
