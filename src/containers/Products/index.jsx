import { useEffect,useState } from "react";
import { addToCart, getAllProducts,getProductsByCategory } from "../../Api";
import { Card, List,Image, Typography, Badge,Rate, Button, message, Spin, Select } from "antd";
import { useParams } from "react-router-dom";


const Product = () => {
    const [loading, setLoading] = useState(false)
    const parms = useParams()
    const [items,setItems]=useState([]);
    const [sortOrder, setSortOrder] = useState('az')
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

    const getsortedItems = () =>{
        const sortedItems = [...items]

        sortedItems.sort((a,b)=>{

            if(sortOrder === 'az'){
                return a.title > b.title ? 1 : a.title === b.title ? 0 : -1
            }
            else  if(sortOrder === 'za'){
                return a.title < b.title ? 1 : a.title === b.title ? 0 : -1
            } 
            else  if(sortOrder === 'lowHigh'){
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1
            }
            else  if(sortOrder === 'highLow'){
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1
            }

            
        })
        return sortedItems;
    }
    if(loading) {
        return <Spin spinning/>
    }

    return (
        <div className="productsContainer">
            {/* <h1>products</h1> */}
            
            <div>
            <Typography.Text>View Items Sorted By:</Typography.Text>
                <Select 
                onChange={( value)=>{
                setSortOrder(value)
                }}
                defaultValue={'az'}
                options={[{
                    
                    label:'Alphabetically A-Z',
                    value: 'az'
                },
                {

                    label:'Alphabetically Z-A',
                    value: 'za'
                },
                {

                    label:'Price Low to High',
                    value: 'lowHigh'
                },
                {

                    label:'Price High to Low',
                    value: 'highLow'
                }

                
                ]}></Select>
            </div>
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
            dataSource={getsortedItems()}>
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