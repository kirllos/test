import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Provider } from "react-redux";
import { store } from "../../store";
import { ProblemForm } from "../Modal";
import s from './AppWrapper.module.scss'

export function AppWrapper() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
      <ProblemForm />
    </Provider>
  );
}
