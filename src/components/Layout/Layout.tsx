import s from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div className={s.root}>{children}</div>;
};

export default Layout;
