import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppRouter } from './router/AppRouter'
import 'react-toastify/dist/ReactToastify.css';


function MarvelLPApp() {

  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer theme="dark" />
    </BrowserRouter>
  )
}

export default MarvelLPApp
