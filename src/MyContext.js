
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import  { createContext, useContext } from 'react';


// const myContext = createContext();


// const MyContext = (props) => {

//   const [language ,setLanguage] = useState("english");
//   const [isHindi , setIsHindi] = useState(false);
//   const hindiLanguage = ()=>{
//     setLanguage ("hindi")
//   }
//   const englishLanguage = ()=>{
//     setLanguage("english")
//   }

//   useEffect(() =>{
//     if(language==="english") setIsHindi(false);
//     else if(language==="hindi") setIsHindi(true);
//   },[language]);

//   return (
//     <myContext.Provider value={{language,isHindi,setLanguage,hindiLanguage,englishLanguage}}>{props.children}</myContext.Provider>
//   )
// };

// export default MyContext;

// export const MyContextState = () => {
//    return useContext(myContext)
// }


import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import  { createContext, useContext } from 'react';


const myContext = createContext();


const MyContext = ({children}) => {

  const [language ,setLanguage] = useState("English");
  const [isHindi , setIsHindi] = useState(false);
  

  useEffect(() =>{
    if(language==="English") setIsHindi(false);
    else if(language==="Hindi") setIsHindi(true);
  },[language]);

  return (
    <myContext.Provider value={{language,isHindi,setLanguage}}>{children}</myContext.Provider>
  )
};

export default MyContext;

export const MyContextState = () => {
   return useContext(myContext)
}