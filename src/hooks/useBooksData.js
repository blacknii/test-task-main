import { useEffect, useState } from "react";
import axios from "axios";

export function useBooksData(author) {
  const [books, setBooks] = useState([]);
  const [bookIDs, setBookIDs] = useState(new Set());
  const [startIndex, setStartIndex] = useState(0);

  //Fetching books data and make sure IDs are unique
  useEffect(() => {
    const fetchBooks = async () => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&startIndex=${startIndex}&maxResults=40`
        )
        .then((res) => {
          const newBooks = [];
          res.data.items.forEach((book) => {
            if (!bookIDs.has(book.id)) {
              newBooks.push({
                id: book.id,
                title: book.volumeInfo.title || "N/A",
                description: book.volumeInfo.description || "N/A",
                categories: book.volumeInfo.categories || ["N/A"],
                publisher: book.volumeInfo.publisher || "N/A",
                publishedDate: book.volumeInfo.publishedDate || "N/A",
                pageCount: book.volumeInfo.pageCount
                  ? book.volumeInfo.pageCount.toString()
                  : "N/A",
                language: book.volumeInfo.language || "N/A",
                snippet:
                  (book.searchInfo && book.searchInfo.textSnippet) || "N/A",
                thumbnail:
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail,
                author: book.volumeInfo.authors,
              });
              bookIDs.add(book.id);
            }
          });

          setBooks((prevBooks) => [...prevBooks, ...newBooks]);
          setBookIDs(bookIDs);
          setStartIndex((prevStartIndex) => prevStartIndex + newBooks.length);
        })
        .catch((err) => console.log(err));
    };

    fetchBooks();
  }, [startIndex, author, bookIDs]);

  return books;
}
