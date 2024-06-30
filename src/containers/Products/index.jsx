import { useEffect,useState } from "react";
import { getAllProducts } from "../../Api/indus";
import { List } from "antd";



const Product = () => {

    const [items,setItems]=useState([]);
    useEffect(()=>{
        getAllProducts().then(res=>{
                setItems(res.products)
        })
    },[])

    return (
        <div>
            <List renderItem={(product,index)=>{
                
            }}>
                dataSource={items}
            </List>
        </div>
    )

}

export default Product;