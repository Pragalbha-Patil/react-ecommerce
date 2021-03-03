import React, {Component} from 'react';
import {ProductConsumer} from '../Context';
import Product from './Product';

export default class Products extends Component {

    render() {
        return (
            <React.Fragment>
                <div class="content">
                    <div className="sidenav">
                        <a href="#">Filter</a>
                        <a href="#">Services</a>
                        <a href="#">Clients</a>
                        <a href="#">Contact</a>
                    </div>

                    <div class="main">
                        {/* <ul>
                            {this.state.shirts.map((shirt) => (
                                <li key={shirt.id}>{shirt.title}</li>
                            ))}
                        </ul> */}
                        <div className="py-5">
                            <div className="row">
                                <ProductConsumer>
                                    {
                                        (value) => {
                                            console.log(value);
                                            return value.shirts.map(shirt => {
                                                return <Product key={shirt.id} shirt={shirt} />
                                            })
                                        }
                                    }
                                </ProductConsumer>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        
        );
    }

}