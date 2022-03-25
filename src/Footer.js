import { Link } from "react-router-dom";
import { memo } from "react";
import classNames from "classnames";
import { useLocation} from "react-router";

function Footer(props){
  const { pathname } = useLocation();
  
return(
  <div className="bg-white  py-5 sm:grid sm:grid-cols-5 sm:gap-x-0 text-center text-xs text-gray-500">
        
         <p className="text-center">{`${props.count} items left`}</p>
         <Link to = "/" className={classNames(pathname === "/" && "bg-white border-red-300 border")}> All </Link>
         <Link to = "/active" className={classNames(pathname === "/active" && "bg-white border-red-300 border")}> Active </Link>
         <Link to = "/completed" className={classNames(pathname === "/completed" && "bg-white border-red-300 border")}> Completed </Link>
        
         
        {/*         
         <button 
          className={props.mode === 'All' ? "border" : ""} 
          onClick={() => props.setMode('All')}>All</button>
       
         
        
         <button 
          className={props.mode === 'Active' ? "border" : ""} 
          onClick={() => props.setMode('Active')}>Active</button>
        

         
         <button 
          className={props.mode === 'Completed' ? "border" : ""} 
          onClick={() => props.setMode('Completed')}>Completed</button> 
         */}

         <button onClick={props.clearCompleted}> Clear</button>
         
        </div>
);
}

export default Footer;