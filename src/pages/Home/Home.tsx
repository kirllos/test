import s from "./Home.module.scss";
import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg?react";

const Home = () => {
  return (
    <div className={s.root}>
      <Arrow className={s.icon} height="30px" width="30px" />
      <h1>Добро пожаловать друг :{")"}</h1>
      <p>
        Ты на сайте для тренировки собеседований. Здесь можно проверить свои
        навыки и опыт в прохождении собеседований. Если не все получится- не
        огорчайся, можно попробовать еще и еще или получить помощь опытных
        менторов.
      </p>
      <div className={s.info}>
        <h2 className={s.title}>
          <Arrow className={s["info-icon"]} height="30px" width="30px" />
          Как устроен наш сайт?
        </h2>
        <p>
          <span className={s["start-text"]}>У нас всё просто!</span> Для начала
          выбери профессию, затем кликни на нужный грейд и приступай к тесту.
          Читай внимательно вопрос и напиши свой ответ. Для проверки, сравни
          свой ответ с рекомендованным, который будет доступен после нажатия на
          кнопку “Ответить”. Собеседование проходит в несколько этапов: HR и
          технический. Если возникнут вопросы, наши специалисты всегда рады
          помочь.
        </p>
      </div>
      <div className={s["button-wrapper"]}>
        <NavLink to="/start" className={s.button}>
          начать тест
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
