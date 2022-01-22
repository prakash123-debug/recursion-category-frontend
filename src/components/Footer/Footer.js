import React from 'react';
import '../Sidebar/Sidebar.styles';
import './FooterStyle.css';
import * as s from  './FooterStyle';

const Footer =(props)=>{
    return(
            <>
             <s.FooterContainer  backgroundImage={props.backgroundImage} isSidebarOpen={props.isSidebarOpen}  colorPalette={props.colorPalette}>
                <div className="FooterComponent">&copy;Copyright 2020. All Right Reserved</div>
            </s.FooterContainer>
   
            </>
      )
}
export default Footer;

