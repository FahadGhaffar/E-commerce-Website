import { Typography } from "antd";



const AppFooter = () => {
 
    return (
        <div className="appFooter">
    
    
       <Typography.Link href="https://www.google.com/" target={"_blank"}>Privacy Policy</Typography.Link>
       <Typography.Link href="https://www.google.com/" target={"_blank"}>Term & Condition</Typography.Link>
       <Typography.Link href="https://www.google.com/" target={"_blank"}>Return Policy</Typography.Link>
       <Typography.Link href="tel:123456789" target={"_blank"}>+12345679</Typography.Link>

       </div>
    );

}

export default AppFooter;