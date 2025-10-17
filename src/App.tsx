import react from 'react'
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import FeedbackList from './components/feedback/FeedbackList';
import Header from './components/header/Header';
import FeedbackForm from './components/feedback/FeedbackForm';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
    <Toaster position='top-right' />
    
    <BrowserRouter>

            <Header /> 

    <Routes>

      <Route path='/' element={ <> <FeedbackList />    </>} />
      <Route path='/form' 
              element={ 
                  <> 
              <div className='bg-gray-600 min-h-screen py-10'>     
                    <FeedbackForm /> 
                 </div>    
                     </> 
                 } 
              />


    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
