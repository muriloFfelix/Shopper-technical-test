import { ProductPriceUpdateProxy } from '../../pages/home/Home'
import ProductUpdateCard from '../product-update-card/ProductUpdateCard';
import './ProductUpdateList.css'

interface ProductUpdateListProps {
    productPriceUpdateList: ProductPriceUpdateProxy[]
}


function ProductUpdateList(props: ProductUpdateListProps) {
    let itemList: React.ReactNode[] = [];
    props.productPriceUpdateList.forEach((item, index) => {
        itemList.push(<ProductUpdateCard key={index} product={item} />)
    })

    return (
        <div>
            {itemList}
        </div>
    )
}

export default ProductUpdateList
