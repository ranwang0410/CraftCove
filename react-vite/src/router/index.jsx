import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import UserShops from '../components/Shop'
import CreateShop from '../components/Shop/CreateShop';
import UpdateShop from '../components/Shop/UpdateShop'
export const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout />,
    children: [
      {
        path: "/",

      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:'/store',
        element:<UserShops/>
      },
      {
        path:'/create-shop',
        element:<CreateShop/>
      },
      {
        path:'/shop/update/:shopId',
        element:<UpdateShop/>
      }
    ],
  },
]);
