import { useState } from "react";
import s from "./Start.module.scss";
import { Card } from "./components";
import { ChooseGrade } from "../../components";
import { useGetJobsQuery } from "./api";
import { Loader } from "../../UI";
import { IJob } from "../../types";

const StartPage = () => {
  const [job, setJob] = useState<IJob | null>(null);
  const { isLoading, isSuccess, data = [] } = useGetJobsQuery();

  let content: JSX.Element;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <>
        {data.map(({ job_type, id }) => {
          return (
            <Card
              handleClick={() => setJob({ id, job_type })}
              text={job_type}
              key={id}
            />
          );
        })}
      </>
    );
  } else {
    content = <h3>К сожалению, пока пусто(</h3>;
  }

  return (
    <div className={s.root}>
      <h1>Самые актуальные профессии в IT на сегодняшний день!</h1>
      <div className={s.layout}>{content}</div>
      <ChooseGrade
        selectedJob={job}
        open={!!job}
        onClose={() => setJob(null)}
      />
    </div>
  );
};

export default StartPage;
