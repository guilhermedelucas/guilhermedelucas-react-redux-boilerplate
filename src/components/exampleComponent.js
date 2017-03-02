import React from 'react';
import { connect } from 'react-redux';
import { fetch } from '../actions/exampleActions';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
        example: state.example.example,
    }
}

export class HelloWorld extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.dispatch(fetch())
    }

    render() {
        const { example } = this.props;

            return (
                <div className='container'>
                    Hello { example };
                </div>
                )
        }
    }
}

export default connect(mapStateToProps)(HelloWorld);
