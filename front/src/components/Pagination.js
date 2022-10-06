import React from 'react'

export default function Pagination({totalLines, linesPerPage, setCurrentPage, currentPage}) {

    let pageNumbers = [];
    
    // calculating the amount of pages
    for (let i = 1; i <= Math.ceil(totalLines / linesPerPage); i++) {
        pageNumbers.push(i)
    }

  return (
    <div className='pagination' >
    {
        pageNumbers.map(index => {
            return (
                <button className={index === currentPage? 'btn btn__active' : 'btn'} key={index} onClick={() => setCurrentPage(index)}>{index}</button>
            )
        })
    }
    </div>
  )
}
