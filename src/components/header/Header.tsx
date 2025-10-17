import React from 'react'
import { useNavigate , useLocation  } from 'react-router-dom'




const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();



    const HandleButtonClick = () => {

        if (location.pathname === '/form') {
        navigate('/');

        } else {
            navigate('/form')
        }
        
    };



  return (


    <div className='p-10 bg-red-600 text-white font-bold '>

    <div className='flex justify-center'>
      <h1 className='text-4xl' > Client Feedback Dashboard </h1>
    </div>
    <div className='flex justify-end'>
      <button 
            onClick={HandleButtonClick}
            className='bg-green-500 rounded-lg p-2 cursor-pointer  '
            >
              {location.pathname === '/form' ?  'Back to Home' : 'Add Client'}
      </button>
    </div>
    </div>



  )
}

export default Header