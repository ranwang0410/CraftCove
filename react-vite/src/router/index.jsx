import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import UserShops from '../components/Shop'
import CreateShop from '../components/Shop/CreateShop';
import UpdateShop from '../components/Shop/UpdateShop'
import GetAllProduct from '../components/Product/product';
import ProductDetail from '../components/ProductDetail/ProductDetail';

import DeleteModal from '../components/DeleteModal/DeleteModal';
import UpdateProduct from '../components/Product/UpdateProduct';
import CreateProduct from '../components/Product/CreateProduct';
import GetProductByShopId from '../components/Product/GetProductByShopId';
import Cart from '../components/Cart/cart'
import ShopProductDetails from '../components/ProductDetail/ShopProductsDetails'
export const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout />,
    children: [
      {
        index: true,
        element:<GetAllProduct/>

      },
      {
        path:'/product/:productId',
        element:<ProductDetail/>
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
      },
      {
        path:'/shop/:shopId/products',
        element:<GetProductByShopId/>
      },
      {
        path:'/:shopId/products',
        element:<ShopProductDetails/>
      },
      {
        path:'/delete-product',
        element:<DeleteModal/>
      },
      {
        path:'/product/update/:productId',
        element:<UpdateProduct/>
      },
      {
        path:'/shop/:shopId/products/create-product',
        element:<CreateProduct/>
      },
      {
        path:'/carts',
        element:<Cart/>
      }

    ],
  },
]);
