import { useState } from "react";
import styles from "./search.module.css";
import { Link } from "react-router-dom";
import { useAuthorData } from "../hooks/useAuthorData";

function Search() {
  const [search, setSearch] = useState("");
  const authors = useAuthorData(search);

  return (
    <div className={styles["search"]}>
      <h1 className={styles["title"]}>AUTHORS</h1>
      <h2 className={styles["subtitle"]}>Search for an Author</h2>
      <div className={styles["search"]}>
        <input
          type="text"
          placeholder="Enter Your Author Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles["authors"]}>
        {authors.map((author) => (
          <Link
            to={`${author}/1`}
            className={styles["authorLink"]}
            key={author}
          >
            <h3 className={styles["authorName"]}>{author}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
