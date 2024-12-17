import { useState } from "react"
import './index.css'

const CreateBook = () =>{
    const [bookTitle,setBookTitle] = useState('')
    const [description,setDescription] = useState('')
    const [author,setAuthor] = useState('')
    const [genre,setGenre] = useState('Fantasy')
    const [date,setDate] = useState('')
    const [pages,setPages] = useState(100)
    const [imageUrl,setImageUrl] = useState('')
    const [message,setMessage] = useState('')

    const addNewBook = async(e) => {
        e.preventDefault()
        if (!bookTitle || !description || !author || !genre || !date || !pages ||!imageUrl){
            setMessage('*Some data fields are missing.Please fill all the fileds')
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
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)}
            try{
                const postData = await fetch('https://book-store-backend-plyv.onrender.com/books/add',options)
                const response = await postData.json()
                setAuthor('')
                setBookTitle('')
                setBookTitle('')
                setDescription('')
                setImageUrl('')
                setPages(100)
                setGenre('')
                setMessage(response.message)
            }catch(error){
                console.log(error)
            }
    }
    }


    return(
        <div className="add-book-container">
            <h2 className="heading">Add New Book</h2>
            {message&& <p className="message">{message}</p>}
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
                <button className="add-book-btn" onClick={addNewBook}>Add Book</button>
            </form>
        </div>
    )
}

export default CreateBook