import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Product from './components/Product'
import SideBar from './components/SideBar'
import Login from './components/Login'
import SignUp from './components/SIgnUp'
import AddItem from './components/admin/AddItem'
import Banner from './components/Banner/Banner'
import ChangeProduct from './components/ChangeProduct'




function App() {


  useEffect(()=>{
    // to get token from the url
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
    if(token){
      localStorage.setItem('token', token);
      window.location.href = '/'; // Redirect to home page or another route if needed
    }
  },[])

  return (
    <>
      <div className="w-full h-auto">
        {/* <h2 className='text-3xl text-center p-4 font-bold'>Admin Dashboard</h2> */}
        <div className="flex h-full  sticky top-0  flex-row gap-4 justify-around">
          <SideBar />
          <div className="w-full  bg-gray-100">
            <div className=" rounded ">

              <Routes>
                <Route exact path="/" element={<Product />} />
                <Route exact path="/banner" element={<Banner />} />
                <Route exact path="/add" element={<AddProduct />} />
                {/* <Route exact path="/update/:_id" element={<UpdateProduct />} /> */}
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
