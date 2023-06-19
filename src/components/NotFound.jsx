import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

function NotFound() {
  return (
    <div className={styles["notfound"]}>
      <h2>Page not found!</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
}

export default NotFound;
