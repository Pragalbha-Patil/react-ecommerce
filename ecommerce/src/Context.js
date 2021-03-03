import React, {
    Component
} from 'react'

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        shirts: [],
        detailProduct: null
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

    addToCart = (id, size) => {
        console.log("Shirt of id "+id+" added to cart.");
        alert("Shirt of size "+size+" added to cart.");
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