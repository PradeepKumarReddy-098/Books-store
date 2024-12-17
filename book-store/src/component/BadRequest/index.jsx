import { useNavigate } from 'react-router-dom'
import './index.css'

const BadRequest = () => {
    const navigate=useNavigate()
    return(
        <div className='bad-request'>
            <h1>Page not found</h1>
            <button onClick={()=>navigate('/')}>GO Home</button>
        </div>
    )
}

export default BadRequest