import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {API} from "../globle.js";

const LoginValidationSchema = yup.object({
   
    email:yup.string().required(),
    password:yup.string().required()
       
   });
  export function Login(){
    
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
           
            email:"",
            password:""
        },
   
        validationSchema:LoginValidationSchema,

       onSubmit:async (values)=>{
        console.log(values)
      const data = await fetch(`${API}/user/login`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
          //  .then(()=> navigate("/home"))
         
            const result = await data.json();
            console.log("Success",result);
            localStorage.setItem("token",result.token);//after login we set this token in localstorage
            navigate("/home");//if token verify it will navigate to mobiles page.
            //beacause it was protected by ProtectRoute..& its has some auth condtion..
           
          
       }
    });
     
    return(
        <div >
            <h3 className='register'>Login</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          
          <TextField id="outlined-basic" 
          label="Email" 
          variant="outlined"
          value={formik.values.email}
            onChange={formik.handleChange}
            name="email" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}/>

          <TextField id="outlined-basic" 
          label="Password" 
          variant="outlined"
          value={formik.values.password}
            onChange={formik.handleChange}
            name="password" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}/>
          <Button type="submit" variant="contained">submit</Button>
          </form>
        </div>
    )
 }
 