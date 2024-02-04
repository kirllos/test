export interface IJob {
  job_type: string;
  id: number;
}

export interface IGrade {
  grade_type: string;
  id: number;
}

export interface IQuestion {
  question: string;
  answer: string;
}

export interface IQuestionData {
  count: number;
  next: string;
  previous: string;
  results: Array<IQuestion>;
}
