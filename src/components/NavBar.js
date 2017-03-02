import React from 'react';
import { connect } from 'react-redux';
import { checkout } from '../actions/cartActions'
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
      articlesOnServerCart: state.cart.articlesOnServerCart,
    }
}
export class NavBar extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        const { articlesOnServerCart } = this.props;
        const totalItemsOnCart = articlesOnServerCart.lines.reduce(function (a,b) {return a + +b.quantity}, 0);

    return (
        <div className="row navbar">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <Link to="/"><img src='../img/logoAcme.jpg' height="50px"/></Link>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <Link to="/checkout/cart" className="pull-right cart-icon"><span className="glyphicon" style={{fontSize: "17px"}}>&#xe116;</span><p>{totalItemsOnCart || 0}</p></Link>
            </div>
        </div>
        )
    }
}

export default connect(mapStateToProps)(NavBar);
