import React, {useState, useEffect, useContext, useReducer, usePrevious} from 'react';
import { BarLoader} from 'react-spinners'
import {Box} from 'gestalt';
export default function Loader() {
    
    return(
        <Box
        position="fixed"
        dangerouslySetInlineStyle={{
            __style: {
                bottom: 300,
                left: '50%',
                transform: "translateX(-50%)"
            }
        }}
        >
    <BarLoader color="darkorange" size={25} margin="3px"/>
      </Box>
    )
}