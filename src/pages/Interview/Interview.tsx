import Box from "@mui/material/Box";
import s from "./Interview.module.scss";
import { NavLink, Navigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { PAGE_TITLE_MAP } from "./const";
import { useGetQuestionsQuery } from "./api";
import { generateRequestPathname } from "./libs";
import { Loader } from "../../UI";
import { Controller, useForm } from "react-hook-form";
import { CorrectAnswer } from "../../components";
import { TextareaAutosize, useMediaQuery } from "@mui/material";

const InterviewPage = () => {
  const mobile = useMediaQuery("(max-width: 560px)");

  const [searchParams] = useSearchParams();
  const [job, grade, type, question] = useMemo(() => {
    const job = searchParams.get("job") || "";
    const grade = searchParams.get("grade") || "";
    const type = searchParams.get("type") || "";
    const question = searchParams.get("question") || "1";
    return [job, grade, type, question];
  }, [searchParams]);
  const path = generateRequestPathname(type, job, grade, question);
  const { data, isError, isLoading } = useGetQuestionsQuery(path);
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const { handleSubmit, reset, control } = useForm({
    defaultValues: { answer: "" },
  });

  if (isError) return <Navigate to="/not-found" />;

  let content: JSX.Element;

  const onSubmit = () => {
    setSubmitted(true);
    setModal(true);
  };

  if (isLoading) {
    content = <Loader />;
  } else if (data && data.question) {
    const newSearchParams = new URLSearchParams(searchParams);
    const isFinish = data.total === Number(question) && type === "tech";
    if (data.total === Number(question)) {
      newSearchParams.set("type", "tech");
      newSearchParams.delete("question");
    } else {
      newSearchParams.set("question", String(Number(question) + 1));
    }
    const nextQuestionLink = isFinish
      ? "/offer"
      : `/interview?${newSearchParams.toString()}`;
    content = (
      <>
        <h4 className={s.header}>{PAGE_TITLE_MAP[type]}</h4>
        <p className={s.parting}>Успехов в прохождении!</p>
        <p className={s.tascks}>
          вопрос {question} из {data.total}
        </p>
        <form
          id="test"
          className={s.form}
          action="#"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className={s.question}>{data.question.question}</p>
          <div className={s["textarea-wrapper"]}>
            <Controller
              disabled={submitted}
              control={control}
              render={({ field }) => {
                return (
                  <TextareaAutosize
                    className={s.textarea}
                    maxRows={7}
                    placeholder="поле для ввода"
                    {...field}
                  />
                );
              }}
              rules={{
                maxLength: { value: 1000, message: "Максимум 1000 символов" },
                required: "Заполните поле",
              }}
              name="answer"
            />
          </div>
        </form>
        <div className={s["button-wrapper"]}>
          <button
            form="test"
            disabled={submitted}
            type="submit"
            className={s.sendButton}
          >
            ответить
          </button>
          {!submitted ? (
            <button disabled={!submitted} className={s.nextButton}>
              {isFinish ? "завершить" : mobile ? "далее" : "следующий этап"}
            </button>
          ) : (
            <NavLink
              onClick={() => {
                setSubmitted(false);
                reset();
              }}
              to={nextQuestionLink}
              className={s.nextButton}
            >
              {isFinish ? "завершить" : mobile ? "далее" : "следующий этап"}
            </NavLink>
          )}
        </div>
        <CorrectAnswer
          text={data.question.answer}
          open={modal}
          handleClose={() => setModal(false)}
        />
      </>
    );
  } else {
    content = <Navigate to="/not-found" />;
  }

  return <Box className={s.container}>{content}</Box>;
};

export default InterviewPage;
