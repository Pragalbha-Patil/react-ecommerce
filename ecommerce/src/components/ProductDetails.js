import React, {Component} from 'react';
import {ProductConsumer} from '../Context';
import {Link} from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 

var images = [];

export default class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            size: 0,
            id: 0,
            photoIndex: 0,
            isOpen: false,
        }
    }

    setSize = (size) => {
        this.setState(() => {
            return {
                size: size
            };
        });
        console.log(this.state.size);
    }

    addItemsToCart = (size, id) => {
        this.setState(() => {
            return {
                size: size,
                id: id
            };
        });
        console.log(this.state.size);
        console.log(this.state.id);
    }

    addPhotosToArray = (img) => {
        images = [];
        let url = "https://www.prolicing.tech/";
        img = url + img;
        images.push(img);
        console.log("images: "+images);
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <ProductConsumer>
                {
                    value => {
                        const {id, title, price, brand, img, inCart} = value.detailProduct;
                        console.log(img);
                        let offer = Math.floor(Math.random() * 10) + 50;
                        let discount = Math.floor((offer * price) / 100);

                        img.forEach(element => {
                           this.addPhotosToArray(element); 
                        });
                        
                        // const renderImages = () => {
                        //     img.map(element => {
                        //         console.log(element);
                        //         return (
                        //             <img src={"https://www.prolicing.tech/"+element} className="img-fluid" alt="shirt" /> 
                        //         );
                        //     })
                        // }

                        return (
                            <div className="container py-5">
                                {/* title */}
                                <div className="row">
                                    <div className="col-10 mx-auto text-center text-blue my-5">
                                        <h1 style={{color: "var(--pink)"}}>{title}</h1>
                                    </div>
                                </div>
                                {/* end title */}

                                {/* product info */}
                                <div className="row">
                                    {/* shirt img */}
                                    <div className="col-10 mx-auto col-md-6 my-3">
                                        {/* {renderImages()} */}
                                        <img src={"https://www.prolicing.tech/"+img[0]} className="img-fluid" alt="shirt" onClick={() => this.setState({ isOpen: true })} /> 
                                        {isOpen && (
                                            <Lightbox
                                                mainSrc={images[photoIndex]}
                                                nextSrc={images[(photoIndex + 1) % images.length]}
                                                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                                onCloseRequest={() => this.setState({ isOpen: false })}
                                                onMovePrevRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                                })
                                                }
                                                onMoveNextRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + 1) % images.length,
                                                })
                                                }
                                            />
                                        )}
                                    </div>
                                    {/* shirt name */}
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                        <h2>Name: {title}</h2>
                                        <h4 className="text-title text-muted mt-3 mb-2">
                                            Offered by: <span className="text-uppercase"> {brand} </span>
                                        </h4>
                                        <hr />
                                        {/* price */}
                                        <h4>
                                            Price: <strong><span>  Rs. {discount}</span> </strong> <strike className="text-muted">Rs. {price}</strike>  <span className="text-pink ml-2">({offer}% off)</span>
                                        </h4>
                                        <p className="text-uppercase">
                                            Select size
                                        </p>
                                        <button className="dot m-2" id="32" onClick={() => this.setSize(32)} style={{
                                            outline: (this.state.size === 32) ? 'var(--pink) auto 5px' : '',
                                            color:  (this.state.size === 32) ? 'var(--pink)' : '',
                                            borderRadius: (this.state.size === 32) ? '20%' : '20%',
                                        }}>32</button>
                                        <button className="dot m-2" id="38" onClick={() => this.setSize(38)} style={{
                                            outline: (this.state.size === 38) ? 'var(--pink) auto 5px' : '',
                                            color:  (this.state.size === 38) ? 'var(--pink)' : '',
                                            borderRadius: (this.state.size === 38) ? '20%' : '20%',
                                        }}>38</button>
                                        <button className="dot m-2" id="40" onClick={() => this.setSize(40)} style={{
                                            outline: (this.state.size === 40) ? 'var(--pink) auto 5px' : '',
                                            color:  (this.state.size === 40) ? 'var(--pink)' : '',
                                            borderRadius: (this.state.size === 40) ? '20%' : '20%',
                                        }}>40</button>
                                        <button className="dot m-2" id="42" onClick={() => this.setSize(42)} style={{
                                            outline: (this.state.size === 42) ? 'var(--pink) auto 5px' : '',
                                            color:  (this.state.size === 42) ? 'var(--pink)' : '',
                                            borderRadius: (this.state.size === 42) ? '20%' : '20%',
                                        }}>42</button>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button className="cartBtn mt-4" onClick={() => value.addToCart(id, this.state.size)} disabled={(this.state.size === 0) ? true : false} style={{backgroundColor: (this.state.size === 0) ? '#EBEBE4' : "var(--pink)", cursor: (this.state.size === 0) ? 'auto' : "pointer"}}>
                                                <span>
                                                    <i className="fa fa-shopping-basket" /> {(this.state.size === 0) ? 'SELECT SIZE' : "Add to Cart"}
                                                </span>
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/">
                                                    <button className="btn btn-outline-dark mt-4">
                                                        <i className="fa fa-arrow-left" /> Go back
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </ProductConsumer>
        );
    }

}