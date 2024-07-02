import { useEffect,useState } from "react";
import { getAllProducts } from "../../Api/indus";
import { Card, List,Image } from "antd";



const Product = () => {

    const [items,setItems]=useState([]);
    useEffect(()=>{
        getAllProducts().then(res=>{
                setItems(res.products)
                // console.log(res)
        })
    },[])

    return (
        <div>
            <h1>products</h1>
            <List renderItem={(product,index)=>{
               

                return <Card title={product.title} 
                            id={index}
                            cover={<Image src={product.thumbnail}/>}></Card>
            }}
            dataSource={items}>
               
            </List>
        </div>
    )

}

export default Product;