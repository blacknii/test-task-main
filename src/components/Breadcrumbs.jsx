import { useLocation, Link } from "react-router-dom";
import styles from "./breadcrumbs.module.css";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  //Display breadcrumbs after the first page
  if (pathnames.length < 2) {
    return null;
  }

  return (
    <div className={styles["breadcrumbs"]}>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const decodedName = decodeURIComponent(name);

        return (
          <span key={name}>
            <Link to={routeTo}>{decodedName}</Link>
            {index < pathnames.length - 1 ? " / " : ""}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
