import { REQUEST_TYPE_MAP } from "./const";

export const generateRequestPathname = (
  type: string,
  job: string,
  grade: string,
  question: string
): string => {
  const typePath = REQUEST_TYPE_MAP[type];
  const questionQuery = `page=${question}`
  if (type==='hr') {
    return `${typePath}?${questionQuery}`
  }
  return `${typePath}/${job}/${grade}?${questionQuery}`
};
