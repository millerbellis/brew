import React, {useState, useEffect, useContext, useReducer, usePrevious} from 'react';
import {Box, Text, Heading, Image, Button} from 'gestalt'
import {NavLink} from 'react-router-dom';
import {getToken, clearCart, clearToken} from '../utils/index'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


export default function UnAuthNav() {
    const [auth, setAuth] = useState(false);
    const [isOpen, setNav] = useState(false);
    const toggle = () => {
        setNav(!isOpen)
      }
useEffect(() => {
    let a = getToken() !== null ? true : false;
    setAuth(a)
},[])

const handleSignout = () => {
    clearCart()
    clearToken()
    window.location.href='/'
}
    return(
        <>
    {!auth ? (
        <>
      
        <Navbar color="dark" dark expand="md">
        
        <NavLink activeClassName="active" exact  to="/">
            <Box display="flex" alignItems="center">
            <Box margin={1} height={20} width={20}>
            <Image 
            src="./icons/logo.svg"
            alt="brewhaha logo"
            naturalHeight={1}
            naturalWidth={1}
            />
            </Box>
                <Heading size="xs" color="orange">
                    BrewHaha
                </Heading>
            </Box>
            </NavLink>
            
<NavbarToggler onClick={toggle} />
<Collapse isOpen={isOpen} navbar>
    <Nav className="ml-auto" navbar>
            <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signup">
                 <Text size='xl' color="white">Broadcasting Info</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signup">
                 <Text size='xl' color="white">Internet News Facts</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signup">
                 <Text size='xl' color="white">About us</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signup">
                 <Text size='xl' color="white">Contact us</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signin">
                 <Text size='xl' color="white">Sign In</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/signup">
                 <Text size='xl' color="white">Sign Up</Text>
             </NavLink>
             
      

   
    </Nav>
  </Collapse>
</Navbar>
      </>
    
    ):(
        <>
         <Navbar color="dark" dark expand="md">
        
         <NavLink activeClassName="active" exact  to="/">
             <Box display="flex" alignItems="center">
             <Box margin={1} height={20} width={20}>
             <Image 
             src="./icons/logo.svg"
             alt="brewhaha logo"
             naturalHeight={1}
             naturalWidth={1}
             />
             </Box>
                 <Heading size="xs" color="orange">
                     BrewHaha
                 </Heading>
             </Box>
             </NavLink>
             
<NavbarToggler onClick={toggle} />
<Collapse isOpen={isOpen} navbar>
     <Nav className="ml-auto" navbar>

   
    
             {/* {Sign in link} */}
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/checkout">
                 <Text size='xl' color="white">Checkout</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/checkout">
                 <Text size='xl' color="white">Checkout</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/checkout">
                 <Text size='xl' color="white">Checkout</Text>
             </NavLink>
             <NavLink style={{marginRight:'12px', marginTop:'10px'}} activeClassName="active" to="/checkout">
                 <Text size='xl' color="white">Checkout</Text>
             </NavLink>
             <Button 
             color='transparent'
             text="Sign Out"
             onClick={handleSignout}
             
           
             />
       
 
    
     </Nav>
   </Collapse>
 </Navbar>
       
        </>
    )}
       </>
    )
}