import { memo } from "react";
import React from "react";

function Header(props){
    return(
        <React.Fragment>
        <div className="flex flex-1 items-center"> 
        <input 
            className="py-5"
            onClick={props.allDone}
            type="checkbox">    
        </input>
      
        <input
            className="ml-2" 
            onChange={props.onChangeText} onKeyPress={props.onKeyPress} value={props.text}/>
            </div>
        </React.Fragment>   
    );

}

export default memo(Header);