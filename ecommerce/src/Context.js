import React, {
    Component
} from 'react'

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        shirts: [],
        detailProduct: null,
        cart: []
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

    getItem = (id) => {
        const product = this.state.shirts.find(item => item.id === id);
        return product
    }

    restoreCart = () => {
        const itemId = localStorage.getItem('itemID');
        if(itemId) {
            console.log(itemId);
            let tempProduct = [...this.state.shirts];
            console.log("tempproducts: " + tempProduct);
            const index = tempProduct.indexOf(this.getItem(parseInt(itemId)));
            console.log(index);
            const product = tempProduct[index];
            console.log("Product from localstorage: "+ product);
            if(product) {
                product.inCart = true;
                product.count++;
                product.total = product.price * product.count;
    
                this.setState(() => {
                    return {shirts: tempProduct, cart: [...this.state.cart, product]};
                }, () => {
                    console.log("Cart restored from localstorage:");
                    //alert("Cart restored");
                    console.log(this.state);
                })
            }
        }
    }

    addToCart = (id, size) => {
        if(!size) size = 32;
        console.log("Shirt of id "+id+" added to cart.");
        //alert("Shirt of size "+size+" added to cart.");
        

        let tempProduct = [...this.state.shirts];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count++;
        product.total = product.price * product.count;

        localStorage.setItem('itemID', id);

        this.setState(() => {
            return {shirts: tempProduct, cart: [...this.state.cart, product]};
        }, () => {
            console.log(this.state);
        })
    }

    render() {
        return ( 
        <ProductContext.Provider value = {
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart
                }
            }> 
            {
                this.props.children
            } 
        </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {
    ProductProvider,
    ProductConsumer
};