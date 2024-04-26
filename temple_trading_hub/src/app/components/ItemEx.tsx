import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import { motion, useAnimation } from 'framer-motion';
import styles from "../Styles/ItemEx.module.css"
import '@fontsource/inter/300.css'; // 300 represents the font weight
import '@fontsource/jua/400.css';
import Image from 'next/image';

interface ItemProps {
    imageUrl: string; // Prop for the image URL
    item_name: string;// prop for the items name
    item_condition: string;// prop for the condition of the item
}

const ItemEx: React.FC<ItemProps> = ({ imageUrl, item_name, item_condition }) =>{

   
    
    return(
        <div className={styles.item}>
           {/* Display the image */}
           <Image src={imageUrl} alt="Item Image" width={200} height={200} /> 
           <div className={styles.item_info}>
                {item_name}
           </div>
           <div className={styles.item_info}>
                {item_condition}
           </div>
        </div>
    );

}

export default ItemEx;