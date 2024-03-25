import { LuMenuSquare } from "react-icons/lu";

// eslint-disable-next-line react/prop-types
export default function HomeLayout({children}){
    return(
        <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 right-0 cursor-pointer mt-2 ml-2">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
               <div className="drawer-content">
                <label htmlFor="my-drawer">

                <LuMenuSquare
                 size={'32px'}
                 className="cursor-pointer"
                />
                   
                </label>
               </div> 
               <div className="drawer-side">
                 <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                 <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  
                   <li><a>View All Tickets</a></li>
                   <li><a>Dashboard</a></li>

                  <li className="absolute bottom-8 w-3/4">
                     <div className="w-full flex justify-center items-center ">
                         <button className="btn btn-primary  px-2 py-1 rounded-md font-semibold w-3/4 ">Login</button>
                         <button className="btn btn-secondary px-2 py-1 rounded-md font-semibold w-3/4 ">SignUp</button>
                     </div>
                  </li>
                 </ul>
               </div>
        </div>
        <div className="flex align-start justify-center">
            <div className="w-3/4">
             { children}
            </div>
        </div>
     </div>
    );
}