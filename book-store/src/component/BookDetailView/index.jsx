import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './index.css'

const BookDetailView = ()=>{
    const {BookID} = useParams()
    const navigate = useNavigate();
    const [bookDetails,setbookDetails] = useState({})
    const [isUpdating,setIsUpdating] = useState(false)
    const [bookTitle,setBookTitle] = useState('')
    const [description,setDescription] = useState('')
    const [author,setAuthor] = useState('')
    const [genre,setGenre] = useState('Fantasy')
    const [date,setDate] = useState('')
    const [pages,setPages] = useState(100)
    const [imageUrl,setImageUrl] = useState('')

    console.log(bookDetails)

    useEffect(()=>{
        const fetchBookDetails=async()=>{
            try{
                const fetchData= await fetch(`https://book-store-backend-plyv.onrender.com/book/${BookID}`)
                const data = await fetchData.json()
                setbookDetails(data.book)
                setBookTitle(data.book.Title || '')
                setDescription(data.book.Description || '')
                setAuthor(data.book.author||'')
                setGenre(data.book.genre||'Fantasy')
                setDate(data.book.PublishedDate||'')
                setPages(data.book.pages||100)
                setImageUrl(data.book.imageUrl||'')
            }catch(error){
                console.log('error',error)
            }
        }
        fetchBookDetails()
    },[isUpdating])

    const deleteBook = async()=>{
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        }
        try{
            const request = await fetch(`https://book-store-backend-plyv.onrender.com/book/remove/${BookID}`,options)
            const response = await request.json()
            if (response.message === "Book deleted successfully"){
                navigate('/')
            }
            alert(response.message)
        }catch(error){
            console.log('error',error)
        }
    }

    const updateBook = async(e) => {
        e.preventDefault()
        if (!bookTitle || !description || !author || !genre || !date || !pages ||!imageUrl){
            alert('Some data fields are missing.Please fill all the fileds')
        }
        else{
            const data = {
                bookTitle,
                description,
                author:author.toLowerCase(),
                genre,
                date,
                pages,
                imageUrl
            }
            const options={
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)}
                try{
                    const postData = await fetch(`https://book-store-backend-plyv.onrender.com/books/update/${BookID}`,options)
                    const response = await postData.json()
                    alert(response.message,'Click on the same book which you updated to see the result')
                }catch(error){
                    console.log(error)
                }
        }
    }

    const updateBookDetails = () =>{
        return(
        <div className='updating-container'>
            <h2 className="heading-update">Update Book</h2>
            <form>
                <label htmlFor="book-title">Book title</label><br />
                <input type="text" placeholder="Book title" id="book-title" value={bookTitle} onChange={(e)=>setBookTitle(e.target.value)} required /><br />
                <label htmlFor="description">Description</label><br />
                <textarea rows={4} cols={45} id="description" value={description} onChange={(e)=>setDescription(e.target.value)} required ></textarea><br />
                <label htmlFor="author">Author</label><br />
                <input type="text" placeholder="Author Name" id="author" value={author} onChange={(e)=>setAuthor(e.target.value)} required  /><br />
                <label htmlFor="genre">Genre</label><br />
                <select value={genre} onChange={(e)=>setGenre(e.target.value)} id="genre">
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
                </select><br />
                <label id="date">Published Date</label><br />
                <input type="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)} required  /><br />
                <label htmlFor="number">Pages</label><br />
                <input type="number" id="number" value={pages} onChange={(e)=>setPages(e.target.value)} required  /><br />
                <label htmlFor="image">Image url</label><br />
                <input type="text" placeholder="Enter image url"  id="image" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required /><br />
                <button className="add-book-btn" onClick={updateBook}>update Book</button>
            </form>
            <button className='cancel-btn' onClick={()=>setIsUpdating(false)}>Cancel</button>
        </div>
        )
    }

    return(
        <div className='book-details-container'>
        {!isUpdating?<div className='book-details'>
            <img src={bookDetails.imageUrl} alt={bookDetails.Title} className='book-details-image' />
            <div className='book-details-data'>
                <h1 className='book-title'><span className='label-item'>Title: </span>{bookDetails.Title}</h1>
                <p><span className='label-item'>Description:</span>{bookDetails.Description?bookDetails.Description:'not avaliable'}</p>
                <p><span className='label-item'>Author:</span> {bookDetails.author}</p>
                <p><span className='label-item'>Genre:</span> {bookDetails.genre}</p>
                <p><span className='label-item'>Genre-Description:</span> {bookDetails.description}</p>
                <p><span className='label-item'>Published on:</span> {bookDetails.PublishedDate}</p>
                <p><span className='label-item'>Pages:</span> {bookDetails.Pages}</p>
                <button className='edit-btn' onClick={()=>setIsUpdating(true)}>Edit</button>
                <button className='delete-btn' onClick={deleteBook}>Delete</button>
            </div>
        </div>
        :
        (updateBookDetails())}
        </div>
    )
}

export default BookDetailView