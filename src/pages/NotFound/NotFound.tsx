import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import s from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <Container disableGutters maxWidth="xl">
      <Box
        height={"calc(93vh - 5.625rem - 1.25rem)"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid black"
      >
        <p className={s.error}>Ууупс,ошибка...</p>
        <p className={s["not-found"]}>404</p>
      </Box>
    </Container>
  );
};

export default NotFound;
