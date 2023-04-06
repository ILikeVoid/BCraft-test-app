import React from "react";
import s from "./ProductsPage.module.scss"
import {useAppSelector} from "../../redux/hooks";

const ProductsPage = () => {
    const products = useAppSelector(state => state.product)
    return (
        <div className={s.products}>
            {products.map(p =>
                <div>
                    <div>

                    </div>
                </div>)}
        </div>
    )
}

export default ProductsPage