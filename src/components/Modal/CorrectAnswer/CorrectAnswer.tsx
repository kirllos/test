import Box from "@mui/material/Box";
import CloseX from "../../../UI/CloseX";
import s from "./CorrectAnswer.module.scss";
import { Button, Modal } from "@mui/material";

interface ICorrectAnswerProps {
  open: boolean;
  handleClose: () => void;
  text: string;
}
const CorrectAnswer = ({ open, handleClose, text }: ICorrectAnswerProps) => {
  return (
    <Modal className={s.modal} open={open} onClose={handleClose}>
      <Box
        borderRadius={"10px"}
        sx={{ background: "#fff" }}
        className={s.container}
      >
        <Button className={s.close} onClick={handleClose}>
          <CloseX />
        </Button>
        <h4 className={s.title}>Правильный ответ:</h4>
        <Box className={s.description}>{text}</Box>
      </Box>
    </Modal>
  );
};

export default CorrectAnswer;
