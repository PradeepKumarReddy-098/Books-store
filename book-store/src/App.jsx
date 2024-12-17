import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import BookDetailView from './component/BookDetailView';
import CreateBook from './component/CreateBook';
import BadRequest from './component/BadRequest';
import './app.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/book/:BookID" element={<BookDetailView />} />
        <Route exact path='/books/add' element={<CreateBook />} />
        <Route path='*' element={<BadRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;