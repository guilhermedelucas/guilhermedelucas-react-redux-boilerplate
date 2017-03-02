import React from 'react';
import { connect } from 'react-redux';
import { addToCart, clearCartError, fetchCart, removeFromCart, updateQuantity } from '../actions/cartActions';
import { Link } from 'react-router';
import NavBar from './NavBar';

function mapStateToProps(state) {
    return {
        articlesOnCart: state.cart.articlesOnCart,
        articlesOnServerCart: state.cart.articlesOnServerCart,
        fetched: state.cart.fetched,
        success: true
    }
}

export class Checkout extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        !this.props.fetched ? this.props.dispatch(fetchCart()) : null
    }

    addtoCart(article, articlesOnCart){
        this.props.dispatch(addToCart(article, articlesOnCart))
    }

    updateQuantity(article, articlesOnCart){
        this.props.dispatch(updateQuantity(article, articlesOnCart))
    }

    removeFromCart(article, articlesOnCart) {
        this.props.dispatch(removeFromCart(article, articlesOnCart))
    }



    render() {
        const { articlesOnServerCart, success, articlesOnCart } = this.props;
        const totalArticlesOnCart = articlesOnServerCart.lines.reduce((a, b) => {return a + +b.quantity}, 0);
        const picturesOfArticles = [];
        articlesOnServerCart.lines.map((item) => {
             articlesOnCart.lines.map((el) => {
                if (item.sku == el.sku){
                    picturesOfArticles.push( { sku: el.sku, image: el.image })
                }
            })
        })
        if (!totalArticlesOnCart){
            return (
                <div className='container'>
                    <NavBar />
                    <div className="row">
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 catalog-item text-center'>
                            EMPTY CART
                        </div>
                    </div>
                </div>
                )
        } else {
            return (
                <div className='container'>
                    <NavBar />
                    <div className="row">
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 catalog-item'>
                            { totalArticlesOnCart > 0 ? <h4 className="light-text">Shopping cart <span style={{fontWeight: "normal"}}>{totalArticlesOnCart}</span> items</h4> : null }
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 catalog-item'>
                            {
                                articlesOnServerCart.lines.map((item) => {
                                    return (
                                    <div>
                                        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 checkout-item'>
                                            <div className="flex-row">
                                                <Link to={"/article/" + item.sku}><img src={
                                                    picturesOfArticles.findIndex(el => item.sku == el.sku) != -1 ? picturesOfArticles[picturesOfArticles.findIndex(el => item.sku == el.sku)].image : "../../img/placeholder.jpg"
                                                } height="70px" className="image-cart"/></Link>
                                                <div className="cart-item-name">
                                                    <Link to={"/article/" + item.sku}><h1 className="light-text">{item.name}</h1></Link>
                                                    <h5>Unity = €{item.price.amount}</h5>
                                                    <p style={{cursor: "pointer"}} onClick={() => {this.removeFromCart(item.sku, articlesOnCart)}}>Remove from cart</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 checkout-item'>
                                            <div className="pull-right">
                                                <div className="flex-row button-align">
                                                    { item.quantity == undefined ? <button className="button-cart" disabled> - </button> : <button className="button-cart" onClick={() => this.updateQuantity(item.sku, articlesOnCart)}> - </button>}
                                                    <h1 style={{whiteSpace: "pre"}}> { item.quantity } </h1>
                                                    <button className="button-cart" onClick={() => this.addtoCart(item.sku, articlesOnCart)}> + </button>
                                                </div>
                                                <h5>Total = €{item.lineTotal.amount}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 catalog-item'>
                            <div className="pull-right checkout-total">
                                <h3> Total: €{articlesOnServerCart.lines.reduce((a, b) => {return a + +b.lineTotal.amount}, 0).toFixed(2)}  </h3>
                                <button className="button-checkout button"> checkout </button>
                                <Link to="/"><button className="button-checkout button"> Continue shopping </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                )
        }
    }
}

export default connect(mapStateToProps)(Checkout);
