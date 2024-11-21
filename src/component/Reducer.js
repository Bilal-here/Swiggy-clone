import { createSlice } from "@reduxjs/toolkit";


let obj = {
    cartItems : []
}

let slice = createSlice ({

    name : 'cart',
    initialState : obj ,
    reducers : {
        addToCart : (state , action)=>{
           state.cartItems.push(action.payload)
        },
        removeFromCart : (state , action)=>{
            state.cartItems.splice(state.cartItems.i ,1)
        }
    }
})
export const {addToCart ,removeFromCart} = slice.actions
export default slice.reducer    