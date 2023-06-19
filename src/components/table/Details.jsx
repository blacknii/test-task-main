import PropTypes from "prop-types";
import styles from "./details.module.css";
import defaultCover from "../../assets/default_cover.jpg";

function Details(props) {
  const showInfo = (index) => {
    const book = props.BooksData.find((row) => row.id === index);
    if (!book)
      return (
        <div className={styles["book-empty"]}>
          <h2>Select a row for more information</h2>
        </div>
      );

    return (
      <div className={styles["book-info"]}>
        <img
          src={book.thumbnail || defaultCover}
          alt={book.title}
          className={styles["book-image"]}
        />
        <div className={styles["book-details"]}>
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
          <p>
            <strong>Page Count:</strong> {book.pageCount}
          </p>
          <p>
            <strong>Language:</strong> {book.language}
          </p>
          <p>
            <strong>Categories:</strong> {book.categories}
          </p>
          <p>
            <strong>Snippet:</strong> {book.snippet}
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
        </div>
      </div>
    );
  };

  return <div className={styles["info"]}>{showInfo(props.bookId)}</div>;
}

Details.propTypes = {
  bookId: PropTypes.string,
  BooksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.array,
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      pageCount: PropTypes.string,
      language: PropTypes.string,
      categories: PropTypes.array,
      snippet: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default Details;
