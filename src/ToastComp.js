// import Toast from "react-bootstrap/Toast";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import ToggleButton from "react-bootstrap/ToggleButton";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import  MyContextState  from "./MyContext";

// function ToastComp() {
//   const [radioValue, setRadioValue] = useState("1");
//   const navigate = useNavigate();
//   const{hindiLanguage,englishLanguage , language} = MyContextState();
//   const radios = [
//     { name: "English", value: "1" },
//     { name: "Hindi", value: "2" },
//   ];
//   const handleClick = (e,name) => {
//     e.preventDefault();
//     if(name.toLowerCase()==="hindi"){
//       hindiLanguage()
//     }
//     else{
//       englishLanguage()
//     }
//   };
//   return (
//     <Toast>
  
//       <Toast.Header></Toast.Header>
//       {console.log(language)}
//       <Toast.Body>
//         <ButtonGroup className=" me-2">
//           {radios.map((radio, idx) => (
//             <ToggleButton
//               key={idx}
//               id={`radio-${idx}`}
//               type="radio"
//               variant={idx % 2 ? "outline-success" : "outline-danger"}
//               name="radio"
//               value={radio.value}
//               checked={radioValue === radio.value}
//               onChange={(e) => setRadioValue(e.currentTarget.value)}
//               onClick={(e)=>handleClick(e,radio.name)}
//             >
//               {radio.name}
//             </ToggleButton>
//           ))}
//         </ButtonGroup>
//       </Toast.Body>
//     </Toast>
//   );
// }

// export default ToastComp;
