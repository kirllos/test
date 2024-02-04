import { Box } from "@mui/material";
import s from "./Header.module.scss";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { HeaderLink } from "./HeaderLink";
import { SupportLink } from "./SupportLink";

const Header = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("support", "true");
  return (
    <header>
      <Box className={s.headerContainer}>
        <nav className={s.nav}>
          <NavLink className={s.link+' '+s.logo} to={"/"}>
            JunovNet
          </NavLink>
          <ul className={s["nav-list"]}>
            <li className={s["nav-item"]}>
              <HeaderLink to='/about'>о нас</HeaderLink>
            </li>
            <li className={s["nav-item"]}>
              <SupportLink to={`${pathname}?${newSearchParams.toString()}`}>
                поддержка
              </SupportLink>
            </li>
          </ul>
        </nav>
      </Box>
    </header>
  );
};

export default Header;
