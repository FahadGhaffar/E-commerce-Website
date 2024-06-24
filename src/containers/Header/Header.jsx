import {HomeFilled} from "@ant-design/icons"
import {Menu} from "antd"



const AppHeader = () => {
 
    return ( 
        <div className="appHeader">
       
       <Menu
       mode="horizontal"
       items={
        [
            {
                label: <HomeFilled/>,
                key: "home",
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
    
       </div>);

}

export default AppHeader;