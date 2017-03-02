import React from 'react';
import { connect } from 'react-redux';
import { fetchArticle, clearArticleError } from '../actions/articleActions';
import { addToCart, updateQuantity, clearCartError, fetchCart } from '../actions/cartActions';
import { Link } from 'react-router';
import NavBar from './Navbar';


function mapStateToProps(state) {
    return {
        articlesOnCart: state.cart.articlesOnCart,
        article: state.article.article,
        errorCart: state.cart.errorCart,
        articleError: state.article.articleError
    }
}

export class Article extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        !this.props.fetched ? this.props.dispatch(fetchCart()) : null
        const sku = this.props.params.sku;
        this.props.dispatch(fetchArticle(sku));
    }

    componentWillUnmount() {
        this.props.dispatch(clearCartError());
        this.props.dispatch(clearArticleError());
    }

    addtoCart(article, articlesOnCart, image){
        this.props.dispatch(addToCart(article, articlesOnCart, image))
    }

    updateQuantity(article, articlesOnCart, image){
        this.props.dispatch(updateQuantity(article, articlesOnCart))
    }

    render() {
        const { article, fetched, articlesOnCart, articleError, errorCart } = this.props;
        const quantity = articlesOnCart.lines[articlesOnCart.lines.findIndex(item => item.sku == article.sku)] || 0;

        if (articleError) {
            return (
                <div className='container'>
                    <NavBar />
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 catalog-item'>
                        <h1>Sorry, an internal error happened!</h1>
                    </div>
                </div>
            )
        } else {
        return (
            <div className='container'>
                <NavBar />
                <div className='row'>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-xs-12 article-item">
                        <img src={article.image} className="img-responsive"/>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-xs-12 article-item-description article-item">
                        <h1>{article.name}</h1>
                        <div className="flex-row">
                            { quantity.quantity == undefined ? <button className="button-cart" disabled> - </button> : <button className="button-cart" onClick={() => this.updateQuantity(article.sku, articlesOnCart)}> - </button>}
                            <h1 style={{whiteSpace: "pre"}}> { quantity.quantity ? quantity.quantity : 0 } </h1>
                            <button className="button-cart" onClick={() => this.addtoCart(article.sku, articlesOnCart, article.image)}> + </button>
                        </div>
                        { errorCart.err ? <h3>Sorry, you cannot add this product to cart</h3> : null }
                        <h3>{article.price.amount} {article.price.currency}</h3>
                        <p dangerouslySetInnerHTML={{__html: article.description}} />
                    </div>
                </div>
            </div>
        )
        }
    }
}

export default connect(mapStateToProps)(Article);
