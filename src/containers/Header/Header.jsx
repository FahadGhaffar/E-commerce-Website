import {HomeFilled ,ShoppingCartOutlined} from "@ant-design/icons"
import {Badge, Drawer, InputNumber, Menu, Table, Typography} from "antd"
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

       <Typography.Title>Aamir Store </Typography.Title>
       <AppCart/>
    
       </div>);




}

const AppCart = () => {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
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
                        onClick={(value) =>{
                            // console.log("value " +value)

                          setCartItem( (pre) =>
                               pre.map((cart)=>{
                                
                                if(record.id === cart.id){

                                    // cart.total = cart.price * parseInt(value);
                                    console.log(cart)
                                    cart.total = 6;
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
             </Drawer>
        </div>
   );
}

export default AppHeader;