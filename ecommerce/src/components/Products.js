import React, {Component} from 'react';
import {ProductConsumer} from '../Context';
import Product from './Product';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
            [name]: value
        });

        //console.log("Current state");
        console.log(this.state);
    };

    render() {
        return (
            <React.Fragment>
                <div id="outer-container">
                    <div id="sidebar">
                        <h4 style={{color: "var(--pink)", textAlign: "center"}}>Filters</h4>
                        <hr />
                        <ProductConsumer>
                            {
                                (value) => {
                                    return (
                                        <form id="filtersForm" onSubmit={(e) => {e.preventDefault(); value.handleFilters(this.state)}}>
                                            <div className="filters">
                                                    <h6>Style</h6>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="style" value="formal" onChange={this.handleChange} required />
                                                        <label class="form-check-label" >
                                                            Formals
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="style" value="casual"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            Casuals
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="filters">
                                                    <h6>Price range</h6>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="price" value="500-1000"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            500-1000
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="price" value="1000-2000"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            1000-2000
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="price" value="2000-3000"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            2000-3000
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="price" value="3000-above"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            3000 & above
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="filters">
                                                    <h6>Brand</h6>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="brand" value="MensFormal"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            MensFormal
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="brand" value="MensCasual"  onChange={this.handleChange} required  />
                                                        <label class="form-check-label" >
                                                            MensCasual
                                                        </label>
                                                    </div>
                                                    <hr />
                                                    <button type="submit" className="cartBtn">
                                                        Apply
                                                    </button>
                                                </div>
                                        </form>
                                    );
                                }
                            }
                        </ProductConsumer>
                    </div>
                    <div id="content">
                        <div className="row py-5">
                            <ProductConsumer>
                                {
                                    (value) => {
                                        //console.log(value);
                                        return value.shirts.map(shirt => {
                                            return <Product key={shirt.id} shirt={shirt} />
                                        })
                                    }
                                }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        
        );
    }

}