import { useState } from "react";
import "./Forms.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Forms = () => {

    const [formSubmit,setFormSubmit] = useState(false)
    const [formErr,setFormErr] = useState({})
    const [formData,setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    })

    const handleInputChange =(e)=>{
        let {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })
    }

    const formSubmitHandler =(e)=>{
        e.preventDefault()
        let errors = validate(formData)
        setFormErr(errors)

        let errKeyArr = Object.keys(errors)
        if (errKeyArr.length == 0) {
            setFormSubmit(true)
            toast('🦄 Wow so easy!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        }else{
            setFormSubmit(false)
        }
    }

    const validate =(data)=>{
        let error = {}
        if(data.firstName.trim() == ""){
            error.firstName = "Please enter your First Name"
        }
        if(data.lastName.trim() == ""){
            error.lastName = "Please enter your Last Name"
        }
        if(data.email.trim() == ""){
            error.email = "Please enter your Email"
        }
        if(data.phoneNumber.trim() == ""){
            error.phoneNumber = "Please enter your Phone Number"
        }
        if(data.phoneNumber.trim().length > 0 && data.phoneNumber.trim().length != 10){
            error.phoneNumber = "Please enter 10 digit Phone Number"
        }
        return error
    }


  return (
    <div className="form-container">
        <ToastContainer/>
        <form onSubmit={(e)=>{formSubmitHandler(e)}}>
          {formSubmit && <div className="success">
            <p>Registration Successful</p>
          </div>}
          <div className="field">
            <input type="text" name="firstName" placeholder="First Name" onChange={(e)=>{ handleInputChange(e)}}/>
            {formErr.firstName && <p className="error">{formErr.firstName}</p>}
          </div>
          <div className="field">
            <input type="text" name="lastName" placeholder="Last Name" onChange={(e)=>{handleInputChange(e)}}/>
            {formErr.lastName && <p className="error">{formErr.lastName}</p>}
          </div>
          <div className="field">
            <input type="email" name="email" placeholder="Email" onChange={(e)=>{handleInputChange(e)}}/>
            {formErr.email && <p className="error">{formErr.email}</p>}
          </div>
          <div className="field">
            <input type="number" name="phoneNumber" placeholder="Phone Number" onChange={(e)=>{handleInputChange(e)}}/>
            {formErr.phoneNumber && <p className="error">{formErr.phoneNumber}</p>}
          </div>
          <button type="submit" className="field">Submit</button>
        </form>
    </div>
  );
};

export default Forms;
