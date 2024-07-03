import { useEffect,useState } from "react";
import { getAllProducts } from "../../Api/indus";
import { Card, List,Image, Typography } from "antd";



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
            <List 
            grid={{column:3}}            
            renderItem={(product,index)=>{
               
                
                return <Card 
                    className="itemCard"
                    title={product.title} 
                            key={index}
                            cover={<Image className="itemCardImage" src={product.thumbnail}/>}>


                                <Card.Meta 
                                title={
                                <Typography.Paragraph>
                                    Price : ${product.price} {" "}

                                    <Typography.Text  type="danger" delete>
                                        ${parseFloat( 
                                            product.price+ 
                                            (product.price* product.discountPercentage)/100)
                                            .toFixed(2)}
                                    </Typography.Text>
                                    </Typography.Paragraph>}
                                    
                                    description = {<Typography.Paragraph ellipsis={{row:2, expandable:true, symbol:'more'}}>{product.description}</Typography.Paragraph>}

                                    
                                    ></Card.Meta>
                            </Card>
            }}
            dataSource={items}>
            </List>
        </div>
    )

}

export default Product;