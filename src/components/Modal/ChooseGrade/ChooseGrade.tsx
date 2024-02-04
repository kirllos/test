import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import CloseX from "../../../UI/CloseX";
import s from "./ChooseGrade.module.scss";
import { Button, Modal } from "@mui/material";
import { useGetGradesQuery } from "./api";
import { Loader } from "../../../UI";
import { NavLink } from "react-router-dom";
import { IGrade, IJob } from "../../../types";

interface IChooseProps {
  open: boolean;
  selectedJob: IJob | null;
  onClose: () => void;
}

const ChooseGrade = ({ open, onClose, selectedJob }: IChooseProps) => {
  const { isSuccess, isLoading, data } = useGetGradesQuery();
  const [selectedGrade, setSelectedGrade] = useState<IGrade | null>(null);
  const searchParams = useMemo(() => {
    if (selectedGrade && selectedJob) {
      return new URLSearchParams([
        ["job", String(selectedJob.id)],
        ["grade", String(selectedGrade.id)],
        ["type", "hr"],
      ]);
    }
  }, [selectedGrade, selectedJob]);

  const handleClose = () => {
    onClose();
    setSelectedGrade(null);
  };

  const isSelected = (currentGrade: string | undefined, grade: string) =>
    currentGrade === grade;

  let content: JSX.Element;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <Box className={s.choice}>
        {data.map(({ grade_type, id }) => (
          <label
            key={id}
            className={`${s.choiceItem} ${
              isSelected(selectedGrade?.grade_type, grade_type)
                ? s.selected
                : ""
            }`}
          >
            <input
              className={s.radioInput}
              type='radio'
              value={grade_type}
              checked={isSelected(selectedGrade?.grade_type, grade_type)}
              onChange={() => setSelectedGrade({ grade_type, id })}
            />
            {grade_type}
          </label>
        ))}
      </Box>
    );
  } else {
    content = <h3>К сожалению, пока пусто(</h3>;
  }

  return (
    <Modal className={s.modal} open={open} onClose={handleClose}>
      <Box className={s.container}>
        <Button onClick={handleClose} className={s.close}>
          <CloseX />
        </Button>
        <h4 className={s.title}>Выбери свой уровень</h4>
        {content}
        <Box className={s.wrapperButton}>
          {selectedGrade ? (
            <NavLink
              to={`/interview?${searchParams?.toString()}`}
              className={s.sendButton}
            >
              начать
            </NavLink>
          ) : (
            <button disabled={true} className={s.sendButton}>
              начать
            </button>
          )}

          <p className={s.rules}>
            Нажимая на кнопку начать вы попадаете на первый этап собеседования с
            HR
          </p>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChooseGrade;
