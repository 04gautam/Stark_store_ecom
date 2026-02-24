import { Link } from "react-router-dom";
function Error404Page() {
  return ( <>
  
  <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-300">Page Not Found</p>

      <Link to="/" className="mt-6 inline-block px-6 py-3 bg-white  hover:text-white rounded-lg hover:bg-orange-500  transition-colors duration-300">
        Go Back Home
      </Link>
    </div>

   
    
   
  </div>
  
  </> );
}

export default Error404Page;