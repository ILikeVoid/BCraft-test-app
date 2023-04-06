import {createSlice} from "@reduxjs/toolkit";


const initialState = [{
    id: 1,
    name: "Samsung",
    category: "Smartphone",
    system: "ios",
    price: 20000,
    img: null as string | null | File
}]

export type ProductsType = typeof initialState


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        }
    }
})

export default productsSlice.reducer