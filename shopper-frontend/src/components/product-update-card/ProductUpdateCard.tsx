import { ProductPriceUpdateProxy } from '../../pages/home/Home'
import './ProductUpdateCard.css'

interface ProductUpdateCardProps {
    product: ProductPriceUpdateProxy
}

function ProductUpdateCard(props: ProductUpdateCardProps) {

    return (
        <div className={'card ' + (props.product.errors?.length === 0 ? 'approved' : 'rejected')}>
            <h3>
                {props.product.name ?? 'SEM PRODUTO'}
            </h3>
            <div>
                Código: {props.product.product_code}
            </div>
            <div>
                Preço atual: {props.product.current_price}
            </div>
            <div>
                Novo Preço: {props.product.new_price}
            </div>
            {
                props.product.errors?.length !== 0 ? (<div>
                    <h3>Erros: </h3>{props.product.errors!.map(e => <div>{e}</div>)}
                </div>) : (null)
            }
        </div>
    )
}

export default ProductUpdateCard
