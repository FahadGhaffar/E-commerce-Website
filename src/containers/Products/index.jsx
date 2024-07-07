import { useEffect,useState } from "react";
import { addToCart, getAllProducts,getProductsByCategory } from "../../Api";
import { Card, List,Image, Typography, Badge,Rate, Button, message, Spin } from "antd";
import { useParams } from "react-router-dom";


const Product = () => {
    const [loading, setLoading] = useState(false)
    const parms = useParams()
    const [items,setItems]=useState([]);
    useEffect(()=>{
        setLoading(true);
        (parms?.categoryId 
            ? getProductsByCategory(parms.categoryId) 
            : getAllProducts() 
        ).then(res=>{
                setItems(res.products);
                console.log(res);

        setLoading(false);
        })
       
    },[parms]);
    if(loading) {
        return <Spin spinning/>
    }

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
    const [loading, setLoading] = useState(false)
    const addProductToCart = () => {
        setLoading(true)
        addToCart(items.id).then(res => {
            message.success(`${items.title} has been added to cart!`);
           setLoading(false)
        })
    }
    return(
 <Button type="link" 
        onClick={()=>{
            addProductToCart()
            
        }}
        loading={loading}
    >Add to Cart</Button>
    );
}
export default Product;