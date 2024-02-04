import { PropsWithChildren } from "react";
import s from "./Header.module.scss";
import { NavLink, useSearchParams } from "react-router-dom";

type LinkProps = {
  to: string;
};

export const SupportLink = ({ to, children }: PropsWithChildren<LinkProps>) => {
  const [searchParams] = useSearchParams();
  const handleClassName = (): string => {
    const cls = [s.link];
    if (searchParams.get("support")) cls.push(s.active);
    return cls.join(" ");
  };

  return (
    <NavLink to={to} className={handleClassName}>
      {children}
    </NavLink>
  );
};
