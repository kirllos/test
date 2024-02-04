import Box from "@mui/material/Box";
import { CloseX } from "../../../UI";
import s from "./ProblemForm.module.scss";
import { Dialog } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import emailRegex from "email-regex";

type FormData = {
  email: string;
  text: string;
};

const ProblemForm = () => {
  const fullScreen = useMediaQuery("(max-width: 425px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: {
      errors: { email, text },
    },
    reset,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: { email: "", text: "" },
  });

  const open = searchParams.has("support");

  const onSubmit = (data: FormData) => {
    //TODO send form data on backend endpoint
    console.log(data);
  };

  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("support");
    setSearchParams(newSearchParams);
    reset();
    clearErrors();
  };

  return (
    <Dialog
      scroll="body"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <Box className={s.container} sx={{ background: "#fff" }}>
        <button className={s.close} onClick={handleClose}>
          <CloseX />
        </button>
        <h4 className={s.title}>{fullScreen && "Уупс..."}Возникла проблема?</h4>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("email", {
                required: "Обязательное поле",
                validate: (value) =>
                  emailRegex({ exact: true }).test(value)
                    ? undefined
                    : "Некорректный email",
              })}
              className={s.email}
              placeholder="введите ваш e-mail"
            />
            <div className={s.error}>{email?.message}</div>
          </div>

          <div className={s["textarea-wrapper"]}>
            <textarea
              {...register("text", {
                required: "Обязательное поле",
                maxLength: {
                  value: 500,
                  message: "Максимальная длина 500 символов",
                },
              })}
              className={s.textarea}
              placeholder="опишите вашу проблему"
            />
            <div className={s.error}>{text?.message}</div>
          </div>

          <button type="submit" className={s.sendButton}>
            отправить
          </button>
        </form>
      </Box>
    </Dialog>
  );
};

export default ProblemForm;
