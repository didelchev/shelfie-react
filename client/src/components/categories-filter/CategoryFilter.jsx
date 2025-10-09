import React from 'react'

const CategoryFilter = () => {
    const categories = ["fiction","fantasy","biography","science fiction","business","classics","psychology","mystery","nonfiction","romance"]

  return (
    <>
        {categories.map(genre => (
             <label key={genre}>
                  <input type="checkbox" className="genre" value={genre} /> {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </label>
        ))}
    </>
  )
}

export default CategoryFilter