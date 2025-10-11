export const filters = {
    search(booksArray, query){
        return booksArray.filter(book => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            )
        })
    },
    categorize(booksArray, categoryCriteria){
         if (categoryCriteria.length === 0){
            return booksArray
        } 

        return booksArray.filter(book => book.genre.some(genre => categoryCriteria.includes(genre)))
            
    },
    sort(booksArray, sortCriteria){

    let sortedBooks = [...booksArray];

    switch (sortCriteria) {
      case "title":
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
         sortedBooks.sort((a, b) => Number(b.ratings?.average || 0) - Number(a.ratings?.average || 0)); 
         break;
      default:
        }

        return sortedBooks
    },
    sortByRating(booksArray, rating){

        if(!rating){
            return booksArray
        }

        const sortedBooks = booksArray.filter(book => Number(book.ratings.average) === rating);

        console.log(sortedBooks)
        return sortedBooks
    }
}
