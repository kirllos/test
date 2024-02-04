import { api } from "../../store";
import { IQuestion, IQuestionData } from "../../types";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<{ total: number; question: IQuestion }, string>({
      query: (path) => path,
      transformResponse(baseQueryReturnValue) {
        const { results, count } = baseQueryReturnValue as IQuestionData;
        return { total: count, question: results[0] };
      },
    }),
  }),
});

export const { useGetQuestionsQuery } = extendedApi;
