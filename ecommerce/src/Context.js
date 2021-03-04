import React, {
    Component
} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var cartItemsID = "";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    // notify = (message) => toast(message);

    state = {
        shirts: [],
        detailProduct: null,
        cart: [],
    }

    componentDidMount() {
        // fetch('https://www.prolicing.tech/get-shirts-data')
        // .then((response) => response.json())
        // .then(shirtsData => {
        //     this.setState({ shirts: shirtsData });
        // });
        
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
                this.restoreCart();
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
        })
    }

    removeElementFromCart(e) {
        console.log("in remove cart");
        console.log(e);
        var array = [...this.state.cart]; // make a separate copy of the array
        const index = array.indexOf(this.getItem(e));
        if (index !== -1) {
          array.splice(index, 1);
          this.setState(() => {
            return {cart: array};
          });
          console.log("element removed");
          console.log(this.state.cart);
        }
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

    restoreCart = () => {
        // let array = [...this.state.shirts];
        // if(array) {
        //     array.forEach(element => {
        //         //console.log(element);
        //         console.log("here one");
        //         console.log(typeof(element));
        //         if(element.inCart) {
        //             console.log("here two");
        //             console.log("inCart is set for element: ");
        //             console.log(element);
        //             let tempProduct = [...this.state.shirts];
        //             const index = tempProduct.indexOf(element);
        //             const product = tempProduct[index];
        //             if(product) this.updateCartState(product, tempProduct);
        //         }
        //         else {
        //             console.log("oops")
        //         }
        //     });
        // }
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
            toast.success("Cart restored from previous session", { position: toast.POSITION.BOTTOM_RIGHT })
        }
        // if(itemId) {
        //     console.log(itemId);
        //     let tempProduct = [...this.state.shirts];
        //     console.log("tempproducts: " + tempProduct);
        //     const index = tempProduct.indexOf(this.getItem(parseInt(itemId)));
        //     console.log(index);
        //     const product = tempProduct[index];
        //     console.log("Product from localstorage: "+ product);
        //     if(product) {
        //         product.inCart = true;
        //         product.count++;
        //         product.total = product.price * product.count;
    
        //         this.setState(() => {
        //             return {shirts: tempProduct, cart: [...this.state.cart, product]};
        //         }, () => {
        //             toast.success("Cart restored from previous session", { position: toast.POSITION.BOTTOM_RIGHT })
        //             //console.log(this.state);
        //         })
        //     }
        // }
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

    render() {
        return ( 
        <ProductContext.Provider value = {
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    clearCart: this.clearCart,
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
    ProductConsumer
};