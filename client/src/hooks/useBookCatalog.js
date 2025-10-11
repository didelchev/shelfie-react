import { useMemo, useState } from "react";
import { filters } from "../utils/bookFilters";

export const useBookCatalog = (books) => {
    const [query, setQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState('none');
    const [categoryCriteria, setCategoryCriteria ] = useState([])
    const [ratings, setRatings] = useState(0)


    const searchHandler = (e) => setQuery(e.target.value.toLowerCase());
    const sortHandler = (e) => setSortCriteria(e.target.value)
    const sortByRatingHandler = (e) =>setRatings(Number(e.target.value))
    const categoryHandler = (e) => {
    const toggledCategory = e.target.value;

    if(e.target.checked && !categoryCriteria.includes(toggledCategory)){

      setCategoryCriteria([...categoryCriteria, toggledCategory])

    }else if(!e.target.checked && categoryCriteria.includes(toggledCategory)){
      
      let updatedCategories = categoryCriteria.filter(category => category !== toggledCategory)

      setCategoryCriteria(updatedCategories)
    }
        }
    const resetHandler = () => {
        setQuery('');
        setSortCriteria('none')
        setCategoryCriteria([])
        setRatings(0);
     }

     const displayBooks = useMemo(() => {
        let currentBooks = books

        currentBooks = filters.search(currentBooks, query)
        
        currentBooks = filters.categorize( currentBooks, categoryCriteria)
        
        currentBooks = filters.sortByRating(currentBooks, ratings)
        
        return filters.sort(currentBooks, sortCriteria)

     },[books,query,sortCriteria,categoryCriteria,ratings])


     return {
        displayBooks,
        query, sortCriteria, categoryCriteria, ratings, 
        searchHandler, sortHandler, categoryHandler, sortByRatingHandler, resetHandler
     }
    
}