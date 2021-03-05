import React, {
    Component
} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fuse from "fuse.js";
import styled from 'styled-components';

var cartItemsID = "";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    // notify = (message) => toast(message);

    state = {
        shirts: [],
        detailProduct: null,
        cart: [],
        wishlist: [],
    }

    componentDidMount() {
        // fetch('https://www.prolicing.tech/get-shirts-data')
        // .then((response) => response.json())
        // .then(shirtsData => {
        //     this.setState({ shirts: shirtsData });
        // });
        this.getShirtsFromServer(true);
    }

    getShirtsFromServer(shouldRestoreCart) {
        console.log("Fetching data from server...");
        fetch('https://www.prolicing.tech/get-shirts-data')
        .then((response) => response.json())
        .then(shirtsData => {
            let tempProducts = [];
            shirtsData.forEach(element => {
                const singleItem = {
                    ...element
                };
                tempProducts = [...tempProducts, singleItem];
            });
            this.shuffle(tempProducts); // shuffles the array to avoid cliched views
            this.setState(() => {
                return {
                    shirts: tempProducts
                };
            }, () => {
                if(shouldRestoreCart) this.restoreCart();
            });
        });
    }

    shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product}
        })
    }

    clearCart = () => {
        this.setState(() => {
            return {cart: []}
        }, () => {
            localStorage.clear();
            this.getShirtsFromServer(false);
        })
    }

    removeItem = id => {
        let tempShirts = [...this.state.shirts];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempShirts.indexOf(this.getItem(id));
        let removedShirt = tempShirts[index];
        removedShirt.inCart = false;
        removedShirt.count = 0;
        removedShirt.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                shirts: [...tempShirts]
            }
        })
    }

    getItem = (id) => {
        const product = this.state.shirts.find(item => item.id === id);
        return product
    }

    updateCartState = (product, tempProduct) => {
        console.log("Update cart called");
        product.inCart = true;
        product.count++;
        product.total = product.price * product.count;
            
        this.setState(() => {
            return {shirts: tempProduct, cart: [...this.state.cart, product]};
        }, () => {
            console.log("Cart is updated");                
            console.log(this.state);
        })
    }

    incrementItem = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;

        this.setState(() => {
            return {cart: [...tempCart]};
        })
    }

    decrementItem = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;

        if(product.count === 0) {
            this.removeItem(id);
        }
        else {
            this.setState(() => {
                return {cart: [...tempCart]};
            })
        }
    }

    restoreCart = () => {
        var itemId = localStorage.getItem('itemID');
        if(itemId) {
            //console.log(typeof(itemId));
            itemId.replace(/['"]+/g, '')
            let array = itemId.replace('"', '').split(",");
            //console.log((array));
            array.forEach(item => {
                //console.log(parseInt(item));
                if(!isNaN(parseInt(item))) {
                    let tempProduct = [...this.state.shirts];
                    const index = tempProduct.indexOf(this.getItem(parseInt(item)));
                    //console.log(index);
                    const product = tempProduct[index];
                    //console.log("Product from localstorage: "+ product);
                    if(product) {
                        this.updateCartState(product, tempProduct);
                    }
                }
            });
            toast.info("Cart restored from previous session", { position: toast.POSITION.BOTTOM_RIGHT })
        }
    }

    handleFilters = (e) => {
        // e.preventDefault();
        console.log("Filters on");
        console.log(e);
        const brand = e.brand;
        var priceRange = e.price;
        var style = e.style;
        const shirts = [...this.state.shirts];
        
        // brand filter start
        const fuse = new Fuse(shirts, {
            keys: ["brand"],
        });
        const result = fuse.search(brand);
        const matches = [];
        if (!result.length) {
            //
        } else {
        result.forEach(({item}) => {
            matches.push(item);
            //console.log(matches);
        });
            // console.log(matches);
            // this.setState(() => {
            //     return {shirts: matches};
            // })
        }
        // brand filter ends

        // style filter starts
        const fuse1 = new Fuse(shirts, {
            keys: ["brand"],
        });
        
        if(style === "formal") style = "MensFormal";
        else style = "MensCasual";
        
        const result1 = fuse1.search(style);
        const matches1 = [];
        if (!result1.length) {
            //
        } else {
        result1.forEach(({item}) => {
            matches1.push(item);
            //console.log(matches);
        });
            // console.log(matches1);
            // this.setState(() => {
            //     return {shirts: matches1};
            // })
        }
        // style filter ends

        // price range filter starts
        let price = priceRange.split("-");
        let min = parseInt(price[0]);
        let max = price[1];
        if(max === "above") max = 99999;
        else max = parseInt(max);
        // console.log(min);console.log(max);

        // console.log("Price filter");
        // console.log(price);
        let shirtsFiltered = [];
        shirts.forEach(element => {
            if(element.price >= min && element.price <= max) {
                shirtsFiltered.push(element);
            }
        });
        // console.log("After filters");
        // console.log(matches);
        // console.log(matches1);
        // console.log(shirtsFiltered);

        var brandAndStyle = this.getMatch(matches, matches1);
        var brandStyleAndPrice = this.getMatch(brandAndStyle, shirtsFiltered);
        console.log(brandStyleAndPrice);
        if(brandStyleAndPrice.length) {
            this.setState(() => {
                return {shirts: brandStyleAndPrice};
            }, () => {
                toast.success("Filters applied!", { position: toast.POSITION.BOTTOM_RIGHT })
            });
        }
        else {
            this.setState(() => {
                return {shirts: []};
            }, () => {
                toast.success("No match found!", { position: toast.POSITION.BOTTOM_RIGHT })
            });
        }
    }

    getMatch(a, b) {
        var matches = [];
    
        for ( var i = 0; i < a.length; i++ ) {
            for ( var e = 0; e < b.length; e++ ) {
                if ( a[i] === b[e] ) matches.push( a[i] );
            }
        }
        return matches;
    }

    addToWishlist = (id) => {
        let tempProduct = [...this.state.shirts];
        let tempWishlist = [...this.state.wishlist];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        if(product) {
            product.wishlist = product.wishlist ? false : true;

            if(product.wishlist) {
                this.setState(() => {
                    return {wishlist: [...this.state.wishlist, product]};
                }, () => {
                    console.log("wishlist after update");
                    console.log(this.state.wishlist);
                })
                toast.success(product.title + " added to wishlist!", { position: toast.POSITION.BOTTOM_RIGHT })
            }
            else {
                tempWishlist = tempWishlist.filter(item => item.id !== id);
                this.setState(() => {
                    return {wishlist: [tempWishlist]};
                }, () => {
                    console.log("wishlist after update");
                    console.log(this.state.wishlist);
                })
                toast.info(product.title + " removed from wishlist!", { position: toast.POSITION.BOTTOM_RIGHT })
            }
        }
    }

    addToCart = (id, size) => {
        if(!size) size = 32;
        // console.log("Shirt of id "+id+" added to cart.");
        //alert("Shirt of size "+size+" added to cart.");
        

        let tempProduct = [...this.state.shirts];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        if(product) this.updateCartState(product, tempProduct);
        
        // save to localstorage
        // localStorage.setItem('itemID', id);
        if(cartItemsID === "") {
            cartItemsID = id;
        }
        else {
            cartItemsID = cartItemsID + ","+id;
        }
        localStorage.setItem("itemID", JSON.stringify(cartItemsID));
        //JSON.parse(localStorage.getItem("itemID"));
        
        toast.success("Added to cart!", { position: toast.POSITION.BOTTOM_RIGHT })
    }

    searchProducts = (query) => {
        const shirtsCopy = [...this.state.shirts];
        // this.setState(() => {
        //     return {shirts: shirtsCopy};
        // })
        
        if(!query.length) {
            this.setState(() => {
                return {shirts: shirtsCopy};
            })
        }
        else {
            console.log("Query: " + query);
            const shirts = [...this.state.shirts];
            const fuse = new Fuse(shirts, {
                keys: ["title", "brand"],
            });
            const result = fuse.search(query);
            const matches = [];
            if (!result.length) {
                this.setState(() => {
                    return {shirts: []};
                }, () => {
                    setTimeout(() => {
                        toast.info("No result found for your query, you can browse similar products here", { position: toast.POSITION.BOTTOM_RIGHT })
                        this.getShirtsFromServer(false);
                    }, 1500);
                })
            } else {
            result.forEach(({item}) => {
                matches.push(item);
                //console.log(matches);
            });
                console.log(matches);
                this.setState(() => {
                    return {shirts: matches};
                })
            }
        }
    }

    render() {
        return ( 
        <ProductContext.Provider value = {
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    clearCart: this.clearCart,
                    removeItem: this.removeItem,
                    decrementItem: this.decrementItem,
                    incrementItem: this.incrementItem,
                    searchProducts: this.searchProducts,
                    addToWishlist: this.addToWishlist,
                    handleFilters: this.handleFilters,
                    getShirtsFromServer: this.getShirtsFromServer,
                }
            }> 
            {
                this.props.children
            } 
            <ToastContainer />
        </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {
    ProductProvider,
    ProductConsumer,
};