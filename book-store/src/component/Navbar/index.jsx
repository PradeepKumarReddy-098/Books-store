import { useState } from 'react'
import { Link } from 'react-router-dom';
import { SiBookstack } from "react-icons/si";
import { FaList } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import './index.css'

const Navbar = ()=>{
    const [displayNav,setDisplayNav]= useState(false);
    return(
        <>
        <nav className="navbar">
            <span className='title-icon'><SiBookstack size={20}/> Bookstore</span>
            <ul className='nav-link-list'>
            <Link to='/' className='link'>Home</Link>
            <Link to='/books/add' className='link'>Add Book</Link>
            <Link to='/' className='link'>All Books</Link>
                <li>About us</li>
            </ul>
        </nav>
        <nav className='sm-navbar'>
            <span className='title-icon'><SiBookstack size={20}/> Bookstore</span>
            <button className='nav-options' onClick={()=>setDisplayNav(!displayNav)}>{displayNav?<RxCross2 color='#000' size={20} />:<FaList color='#000' size={20}/>}</button>
            
            {displayNav &&
            <ul className='sm-nav-link-list'>
                <Link to='/' className='link'>Home</Link>
                <Link to='/books/add' className='link'>Add Book</Link>
                <Link to='/' className='link'>All Books</Link>
                <li>About us</li>
            </ul>
            }
        </nav>
        </>
    )
}

export default Navbar