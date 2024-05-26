import { RouterProvider } from 'react-router-dom';
import router from '../feature/Routing/router';
import './App.css';
import AppWrapper from './AppWrapper';

const App = () => {
  return (
    <AppWrapper>
      <RouterProvider router={router}/>
    </AppWrapper>
  )
}

export default App
