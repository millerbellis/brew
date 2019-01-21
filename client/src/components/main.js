import React, {useState, useEffect, useContext, useReducer, usePrevious} from 'react';
//prettier ignore
import {Container, Box, Heading, Card, Image,Text, SearchField, Icon, Spinner } from 'gestalt';
import Strapi from "strapi-sdk-javascript/build/main";
import {Link} from 'react-router-dom';
import TodosContext from '../context';
import todosReducer from '../reducer';
import Loader from './loader';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
export default function Main() {
const [brands, setBrands] = useState([])
const [searchTerm, setSearchTerm] = useState('')
const [loadingBrands, setLoadingBrands] = useState(true)
const [cbrand, setCBrand] = useState('test')


const initstate = useContext(TodosContext)
const [state, dispatch] = useReducer(todosReducer, initstate)
const user = cbrand;
     useEffect(()  => {
        setCBrand('testing')
         getData();
         dispatch({
            type:"SET_USER",
            payload: user
        });
        
    },[])

    
    

    const getData = async () => {
        try {
            const {data} = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query {
                        brands {
                         _id
                         name
                         description
                         image {
                           url
                         }
                       }
                       }`
                }
            });
            setBrands(data.brands)
            setLoadingBrands(false)
         } catch (err){
            console.error(err)
            setLoadingBrands(false)
         }
    }


    const  handleChange = ({value}) => {
        setSearchTerm(value)
    }

    const filterBrands = (brand, search) => {
        return brand.filter(bran => {
            return bran.name.toLowerCase().includes(search.toLowerCase()) ||
             bran.description.toLowerCase().includes(search.toLowerCase())
        })
    }

  
    return(
    <>
        <Container>
            {/* brands search field */}
            <Box display="flex" justifyContent="center" marginTop={4}>
            <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={handleChange}
            value={searchTerm}
            placeholder="Search Brands"
            />
            <Box margin={3}>
                <Icon icon="filter" color={searchTerm ? 'orange' : 'gray'}
                size={20}
                accessibilityLabel="Filter"
                />
            </Box>
            </Box>
            {/* Brands sectoin */}

            <Box
            display="flex"
            justifyContent="center"
            marginBottom={2}
            >
            <Heading color="midnight" size="md">
                Brew Brands
            </Heading>
            </Box>

            {/* brands */}
            <Box
            dangerouslySetInlineStyle={{
                __style: {
                    backgroundColor: '#d6c8ec'
                }
            }}
            shape="rounded"
            wrap
            display="flex"
            justifyContent="around"
            >
                {filterBrands(brands, searchTerm).map(brand => (
                    <Box
                    paddingY={4}
                    width={200}
                    margin={2}
                    key={brand._id}
                    >
                        <Card
                        image={ <Box height={200} width={200}>
                            <Image
                            fit="cover"
                            alt="brand"
                            naturalHeight={1}
                            naturalWidth={1}
                            src={`${apiUrl}${brand.image.url}`}
                            />
                        </Box>}
                        >
                        <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                        <Text bold size="xl" >{brand.name}</Text>
                        <Text>{brand.description}</Text>
                        <Text bold size="xl">
                        <TodosContext.Provider value={{state, dispatch, user}}>
                        <Link onClick={() => setCBrand(brand._id)} to={`/${brand._id}`}>See brews</Link>
                        </TodosContext.Provider>
                        </Text>
                        </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
           {loadingBrands && <Loader/>}
        </Container>
      </>
    )
}