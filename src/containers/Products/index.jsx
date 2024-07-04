import { useEffect,useState } from "react";
import { addToCart, getAllProducts } from "../../Api/indus";
import { Card, List,Image, Typography, Badge,Rate, Button } from "antd";



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
               
                
                return (
                <Badge.Ribbon className="itemCardBadge" text={product.discountPercentage} color="pink">
                <Card 
                    className="itemCard"
                    title={product.title} 
                            key={index}
                            cover={<Image className="itemCardImage" src={product.thumbnail}/>}
                            actions = {[
                                <Rate allowHalf disabled value={product.rating} />,
                               <AddToCardButton items ={product}/> 
                            ]}
                            >

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
                             </Badge.Ribbon>
    )}}
            dataSource={items}>
            </List>
        </div>
    )

}
const AddToCardButton = ({items}) =>{
    
    const addProductToCart = () => {
        addToCart(items.id).then(res => {
            message.success(`${items.title} has been added to cart!`);
        })
    }
    return(
 <Button type="link" 
        onClick={()=>{
            addProductToCart()
            console.log("working")
        }}
    >Add to Cart</Button>
    );
}
export default Product;