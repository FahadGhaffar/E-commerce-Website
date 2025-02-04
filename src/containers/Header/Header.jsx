import {HomeFilled ,ShoppingCartOutlined} from "@ant-design/icons"
import {Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, message, Table, Typography} from "antd"
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
       <Typography.Title> Store </Typography.Title>
       <Menu
       className="appMenu"
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

    const  onConfirmOrder = (value)=> {

        console.log({value});   
       setCartDrawerOpen(false)
       setCheckoutDrawerOpen(false)
       message.success("Your Order has been placed")
    
    } 
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

                <Form onFinish={onConfirmOrder}>

                    <Form.Item 
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full name..."
                        }
                    ]}
                    
                    label='Full Name' name="full_name">

                        <Input placeholder="Enter your full name..."/>
                    </Form.Item>
                    <Form.Item 
                     rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please enter your email ..."
                        }
                    ]}
                    label='Email' name="your_email">

                        <Input placeholder="Enter your email..."/>
                    </Form.Item>
                    <Form.Item 
                     rules={[
                        {
                            required: true,
                            message: "Please enter your Address..."
                        }
                    ]}
                    label='Address' name="your_address">

                        <Input placeholder="Enter your address..."/>
                    </Form.Item>

                    <Form.Item>
                        <Checkbox>Cash On Delivery </Checkbox>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Confirm Order</Button>
                </Form>

             </Drawer>
        </div>
   );
}

export default AppHeader;