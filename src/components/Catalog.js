import React from 'react';
import { connect } from 'react-redux';
import { fetchCatalog } from '../actions/catalogActions';
import { clearArticleError } from '../actions/articleActions'
import { addToCart, clearCartError, fetchCart } from '../actions/cartActions';
import { Link } from 'react-router';
import NavBar from './NavBar';


function mapStateToProps(state) {
    return {
        catalog: state.catalog.catalog,
        articlesOnCart: state.cart.articlesOnCart,
        fetched: state.cart.fetched,
        errorCatalog: state.catalog.errorCatalog,
        errorCart: state.cart.errorCart
    }
}
export class Catalog extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        !this.props.fetched ? this.props.dispatch(fetchCart()) : null;
        this.props.dispatch(fetchCatalog());
    }

    componentWillUnmount(){
        this.props.dispatch(clearCartError());
        this.props.dispatch(clearArticleError());
    }

    addToCart(article, articlesOnCart, image){
        this.props.dispatch(addToCart(article, articlesOnCart, image))
    }


    render() {
        const { catalog, articlesOnCart, errorCatalog, errorCart } = this.props;
        return(
            <div className='container'>
                <NavBar />
                <div className="row">
                    { catalog.map((item, i) => {
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 catalog-item" key={i}>
                                <Link to={"/article/" + item.sku}><img src={item.image} className="img-responsive"/></Link>
                                <h2 className="light-text catalog-item-name"><Link to={"/article/" + item.sku}>{item.name}</Link></h2>
                                <hr/>
                                {
                                    errorCart.skuError == item.sku ? <p>Sorry, an internal error happened. It was not possible to add this product to the cart.</p>
                                    :
                                    <div className="flex-space">
                                        <h5 className="light-text"><b>{item.price.amount}{ item.price.currency == "EUR" ? "€" : item.price.currency }</b></h5>
                                        { articlesOnCart.lines.findIndex(cart => cart.sku == item.sku) != -1 ?
                                            <div className="border-box">
                                                <span className="glyphicon" style={{fontSize: "15px"}}>&#xe013;</span>
                                            </div> :
                                            <div className="border-box" onClick={() => this.addToCart(item.sku, articlesOnCart, item.image)}>
                                                <h5 className="light-text no-padding"><span className="glyphicon" style={{fontSize: "15px"}}>&#xe116;</span>Add to cart</h5>
                                    </div>

                                    }
                                    </div>
                                }

                            </div>
                        )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Catalog);
