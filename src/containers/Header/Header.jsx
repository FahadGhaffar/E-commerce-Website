import {HomeFilled ,ShoppingCartOutlined} from "@ant-design/icons"
import {Badge, Button, Drawer, Form, Input, InputNumber, Menu, Table, Typography} from "antd"
import {  useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCart } from "../../Api"


const AppHeader = () => {

    const navigate = useNavigate()
      const onMenuClick = (item) =>{
           navigate( `/${item.key}`)
      }
    return ( 
        <div className="appHeader">
       
       <Menu
       mode="horizontal"
       onClick={onMenuClick}
       items={
        [
            {
                label: <HomeFilled/>,
                key: "",
            },
            {
                label: "Men",
                key: "men",
                children:[
                    {
                        label: "Men's Shirts",
                        key: "mens-shirts"
                    },
                    {
                        label: "Men's Shoes",
                        key: "mens-shoes"
                    },
                    {
                        label: "Men's Watches",
                        key: "mens-watches"
                    }

                ]
            },
            {
                label: "Women",
                key: "women",
                children:[
                    {
                        label:"Women's Shoes",
                        key: "womens-shoes",
                    },
                    {
                        label:"Women's Dresses",
                        key: "womens-dresses",
                    },
                    {
                        label:"Women's Watches",
                        key: "womens-watches",
                    },
                    {
                        label:"Women's Bags",
                        key: "womens-bags",
                    },
                    {
                        label:"Women's Jewellery",
                        key: "womens-jewellery",
                    },
                ]
            },
            {
                label: "Fragrances",
                key: "fragrances",
            }
        ]
       }
       
       
       />

       <Typography.Title> Store </Typography.Title>
       <AppCart/>
    
       </div>);




}

const AppCart = () => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [CheckoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    
    const [cartItem, setCartItem] = useState([])
    useEffect(() => {
      getCart().then ( res => {
    
        setCartItem(res.products)
      }) 
    }, [])
   return( <div>
       <Badge onClick={ () =>{
        setCartDrawerOpen(true)
       }}  count={7} className="shoppingCartOutlined" >
        <ShoppingCartOutlined />
        </Badge>
        <Drawer open={cartDrawerOpen} onClose={ () => {

            setCartDrawerOpen(false)
        }}
        title= "Your Cart"
        contentWrapperStyle={{width:500}}
        >
            <Table 
            pagination={false}
            columns={[{
                title:'Title',
                dataIndex: 'title'
            },
            {
                title:'Price',
                dataIndex: 'price',
                render:(value )=>{
                    return <span>${value}</span>
                },
            },
            {
                title:'Quantity',
                dataIndex: 'quantity',
                render: (value,record) =>{
                        return( 
                        <InputNumber 
                        min={0} 
                        defaultValue={value}  
                        onChange={(value) =>{
                        

                          setCartItem( (pre) =>
                               pre.map((cart)=>{
                                
                                if(record.id === cart.id){

                                    cart.total = cart.price * value;
                                    
                                  
                                }
                                return cart 
                            })
                        );
                        }}
                        
                        ></InputNumber>
                    )
                },


            },
            {
                title:'Total',
                dataIndex: 'total',
                render:(value )=>{
                    return <span>${value}</span>
                },
            }
            
            ]}
            
            dataSource={cartItem}

            summary={(data)=>{
               const total = data.reduce((pre,current) =>{
                            return pre+current.total
                },0)
                return <span>Total : {total}</span>
            }}
            />
            <Button onClick={()=>{
                          setCheckoutDrawerOpen(true)
            }} type="primary">Check Your Cart</Button>
             </Drawer>

             <Drawer open={CheckoutDrawerOpen} onClose={()=> {
                setCheckoutDrawerOpen(false)
             }} 
             title="Confirm Order"
             >

                <Form>

                    <Form.Item label='Full Name' name="full_name">

                        <Input placeholder="Enter your full name..."/>
                    </Form.Item>
                    <Form.Item label='Email' name="your_email">

                        <Input placeholder="Enter your email..."/>
                    </Form.Item>
                    <Form.Item label='Address' name="your_address">

                        <Input placeholder="Enter your address..."/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Confirm Order</Button>
                </Form>

             </Drawer>
        </div>
   );
}

export default AppHeader;