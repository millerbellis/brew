import React, {useState, useEffect, useContext, useReducer, usePrevious} from 'react';
import { BarLoader} from 'react-spinners'
import TodosContext from '../context';
import {Link} from 'react-router-dom';
import {Box, Heading, Text, Card, Button, Image, Mask, IconButton} from 'gestalt';
import {calculatePrice, setCart, getCart} from '../utils/index'
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
export default function Brews() {
    const [urlParam, seturlParam] = useState('');
    const [brews, setBrews] = useState([])
    const [brand, setBrand] = useState('')
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
       getData()
    },[])

    const getData = async () => {
        const url = window.location.pathname.substr(1);
        seturlParam(url)
        try {
           
            const {data} = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query {
                        brand(id: "${url}") {
                        _id
                        name
                        brews {
                          _id
                          name
                          description
                          image{
                            url
                          }
                          price
                          
                          
                        }
                      }
                    }`
                }
            });
           setBrews(data.brand.brews)
           setBrand(data.brand.name)
           setCartItems(getCart())
         } catch (err){
            console.error(err)
           
         }
    }

    const addToCart = (brew) => {
        const alreadyInCart = cartItems.findIndex(item => item._id === brew._id);

        if(alreadyInCart === -1) {
            const updatedItems = cartItems.concat({
                ...brew,
                quantity: 1
            })
            setCartItems(updatedItems);
            setCart(updatedItems);
            
            
        } else {
            const updatedItems = [...cartItems];
            updatedItems[alreadyInCart].quantity += 1;
            setCartItems(updatedItems );
            setCart(updatedItems)
        }
    }
   
    const deleteItemFromCart = (itemid) => {
        const filteredItems = cartItems.filter(item => item._id !== itemid)
        setCartItems(filteredItems);
        setCart(filteredItems)
    }
    
    return(
      
        <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
            __style: {
                flexWrap: 'wrap-reverse'
            }
        }}
        >
        <Box
        display="flex"
        direction="column"
        alignItems="center"
        >
            <Box margin={2} >
                <Heading color="orchid">{brand}</Heading>
            </Box>

            <Box
            dangerouslySetInlineStyle={{

                __style: {
                    backgroundColor: '#bdcdd9'
                }
            }}
            wrap
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
            >
            {brews.map(brew => (
              <Box
              paddingY={4}
              width={210}
              margin={2}
              key={brew._id}
              >
                  <Card
                  image={ <Box height={250} width={200}>
                      <Image
                      fit="cover"
                      alt="brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brew.image.url}`}
                      />
                  </Box>}
                  >
                  <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                  <Box marginBottom={2}>
                  <Text bold size="xl" >{brew.name}</Text>
                  </Box>
                  <Text>{brew.description}</Text>
                  <Text color="orchid">${brew.price}</Text>
                  <Box marginTop={2}>
                  <Text bold size="xl">
                
                  <Button onClick={() => addToCart(brew)} color="blue" text="Add to Cart" />
              
                  </Text>
                  </Box>
                  </Box>
                  </Card>
              </Box>
               
              
            ))}
            </Box>

        </Box>

        {/* user cart */}
        <Box alignSelf="end" marginTop={2} marginLeft={8}>
            <Mask shape="rounded" wash>
            <Box display="flex" direction="column" alignItems="center" padding={2}>
                <Heading align="center" size="sm"> Your Cart</Heading>
                <Text color="gray" italic>
                    {cartItems.length} Items Selected
                </Text>

                {/* cart items */}
                {cartItems.map(item => (
                    <Box key={item._id} display="flex" alignItems="center">
                        <Text>
                            {item.name} x {item.quantity} - {(item.quantity * item.price).toFixed(2)}
                        </Text>
                        <IconButton 
                        accessibilityLabel="Delete Item"
                        icon="cancel"
                        size="sm"
                        iconColor="red"
                        onClick={() => deleteItemFromCart(item._id)}
                        />
                    </Box>
                ))}
                <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                    <Box margin={2}>
                    {cartItems.length === 0 && (
                        <Text color="red">Please select some items </Text>
                    )}
                    </Box>
                    <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                    <Text>
                        <Link to="/checkout">Checkout</Link>
                    </Text>
                </Box>
            </Box>
            </Mask>
        </Box>



        </Box>
    )
    
}