const displayBooks = () => {
  const books = [
    {
      title: "Harry Potter",
      author: "J.K Rowling",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
    },
  ];

  const query = "";

  let filters = {
    searchFilter() {
      const searchedBooks = books.filter((book) => {
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      });
    },
    genreFilter() {
        
    },
    sortFilter() {
      let sortedBooks = [...filteredBooks];

      switch (sortCriteria) {
        case "title":
          sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "author":
          sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case "rating":
          sortedBooks.sort(
            (a, b) =>
              Number(b.ratings?.average || 0) - Number(a.ratings?.average || 0)
          );
          break;
        default:
      }

      return sortedBooks;
    },
  };
};
