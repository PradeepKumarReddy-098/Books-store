import { useEffect, useState } from "react"
import { InfinitySpin } from 'react-loader-spinner'
import { IoFilter } from "react-icons/io5";
import Book from "../Book"
import './index.css'

const Home = () =>{
    const [allbooks,setAllbooks] = useState([])
    //const [loader,setLoader] =useState(false)
    const [searchValue,setSearchValue] = useState('')
    const [filterValue,setFilterValue] = useState('All')
    
    useEffect(()=>{
        const fetchBooksData=async()=>{
            try{
               
                const fetchData= await fetch('https://book-store-backend-plyv.onrender.com/books')
                const data = await fetchData.json()
                setAllbooks(data.books)
            }catch(err){
                console.log('error',err)
            }
        }
    fetchBooksData()
    },[])

    const getFilteredArr = () => {
        let newFilteredArr=allbooks
        if (filterValue === 'All') {
            return allbooks
        }
        newFilteredArr = allbooks.filter((each) => each.genre === filterValue);
        return newFilteredArr
    }
    
    const getSearchArr = (filteredArr) =>{
        if (searchValue){
            const value=searchValue.toLowerCase()
            const newFilteredArr = filteredArr.filter(each=>each.Title.toLowerCase().includes(value) || each.author.toLowerCase().includes(value))
            return newFilteredArr;
        }
        return filteredArr
    }

    const displaybooks=(searchArr)=>{
        return(
            <ul className="books-container">
            {searchArr.map(each=>(
                <Book each={each} key={each.BookID} />
            ))}
            {searchArr.length===0 && <div className="empty-books">
                <h1>No Books Avaliable.....</h1>
                </div>}
        </ul>
    )}

    const searchAndFilter = ()=>(
        <div className="filters">
            <input type="search" placeholder="Search Book or Author name" onChange={(e)=>{setSearchValue(e.target.value)}} className="search-item" />
            <div className="genre-filters">
                <IoFilter size={30} />
                <select value={filterValue} onChange={(e)=>setFilterValue(e.target.value)}>
                    <option value='All'>All Genre</option>
                    <option value='Fantasy'>Fantasy</option>
                    <option value='Science Fiction'>Science Fiction</option>
                    <option value='Mystery'>Mystery</option>
                    <option value='Thriller'>Thriller</option>
                    <option value='Romance'>Romance</option>
                    <option value='Historical Fiction'>Historical Fiction</option>
                    <option value='Horror'>Horror</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Drama'>Drama</option>
                    <option value='Non-Fiction'>Non-Fiction</option>
                </select>
            </div>
        </div>
    )

    const filteredArr=getFilteredArr()
    const searchArr=getSearchArr(filteredArr)
    return(
        <div>
            {searchAndFilter()}
            <p className="note">Note: Click on the book to view full details</p>
            {displaybooks(searchArr)}
        </div>
    )
}

export default Home