import React, {useState, useEffect, useContext, useReducer, usePrevious} from 'react';
import {Container, Box, Button, Heading, Text, TextField, Toast} from 'gestalt';
import { withRouter } from 'react-router'
import {setToken} from '../utils/index'
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
export default function Signin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)
 const handleSubmit = async event => {
      event.preventDefault();
      if(isFormEmpty()) {
          showToast('Fill in all fields!')
          return;
      }
     
      //sign up user
      try {
          setLoading(true);
        const response = await strapi.login(username, password)
        setLoading(false);
        setToken(response.jwt);
        console.log(response);
        window.location.href="/"
      }catch(err) {
        setLoading(false);
        showToast(err.message)
      }
  }

  



  const isFormEmpty = () => {
    return !username || !password
  }

  const showToast = (tm) => {
    setToast(true)
    setToastMessage(tm)
    setTimeout(() => setToast(false), 5000)
  }
    return(
    <Container>
        <Box
        dangerouslySetInlineStyle={{
            __style: {
                backgroundColor: '#d6a3b1'
            }
        }}
        margin={4}
        padding={4}
        shape="rounded"
        display="flex"
        justifyContent="center"
        >
        <form onSubmit={handleSubmit} style={{display:'inlineBlock', textAlign:'center', maxWidth: 450}}>
            <Box marginBottom={2} display="flex" direction="column" alignItems="center" >
            <Heading color="midnight" >Welcome back!</Heading>
            </Box>
            <Box>
            <TextField id="username" name="username" type="text" placeholder="username"  onChange={event => setUsername(event.value)}/>
            <TextField id="password" type="password" name="password" placeholder="password" onChange={event => setPassword(event.value)}/>

            <Button disabled={loading} inline color="blue" text="Submit" type="submit"/>
            </Box>

        </form>

        </Box>
       {toast ? (
       <Box
       dangerouslySetInlineStyle={{
       __style: {
           bottom:250,
           left:"50%",
           transform: "translateX(-50%)"
       }
       }}
       position="fixed"
       >
       <Toast color="orange" text={toastMessage}  />
       </Box>
       ) : ('')} 
 
    </Container>
    )
}