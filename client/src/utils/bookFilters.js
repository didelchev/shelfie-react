export const filters = {
    search(booksArray, query){
        return booksArray.filter(book => {
            return (
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            )
        })
    },
    categorize(){

    },
    sort(){
    }
}