import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {API} from "../globle.js";

const RegisterValidationSchema = yup.object({
    username:yup.string().required(),
    email:yup.string().required(),
    password:yup.string().required()
       
   });
  export function Register(){
    
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:""
        },
   
        validationSchema:RegisterValidationSchema,

       onSubmit:(values)=>{
        console.log(values)
        fetch(`${API}/user/register`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"content-type": "application/json"},
      
           }).then(()=> navigate("/"))
       }
    });
     
    return(
        <div >
            <h3 className='register'>Register</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          <TextField id="outlined-basic" 
          label="Username" 
          variant="outlined" 
          value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.username && formik.errors.username}
            helperText={formik.touched.username && formik.errors.username ? formik.errors.username : null}/>

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
 