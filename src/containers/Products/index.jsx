import { useEffect,useState } from "react";
import { getAllProducts } from "../../Api/indus";
import { Card, List } from "antd";



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
                return <Card title={product.title}></Card>
            }}>
                dataSource={items}
            </List>
        </div>
    )

}

export default Product;