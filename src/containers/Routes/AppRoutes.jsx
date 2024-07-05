import {Routes, Route} from 'react-router-dom'
import Home from '../../Pages/Home';
import Category from '../../Pages/Category';
const AppRoutes = () =>{

    return(
      <Routes>
        <Route  path='/' element={<Category/>}/>
        <Route  path='/:categoryId' element={<Category/>}/>

      </Routes>
    );
}

export default AppRoutes