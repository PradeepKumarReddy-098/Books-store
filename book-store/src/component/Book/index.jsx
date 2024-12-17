import {Link} from 'react-router-dom'
import './index.css'

const Book = ({each})=>{
    const {BookID,Title,imageUrl,genre,author}=each
    //console.log(Title)
    return(
        <li key={BookID} className="book-item" >
            <Link to={`book/${BookID}`} className='link-item'>
            <img src={imageUrl} alt={Title} className='book-image' />
            <div>
                <h4>Title: {Title}</h4>
                <p>Author: {author}</p>
                <p>Genre: {genre}</p>
            </div>
            </Link>
        </li>
    )
}

export default Book