import React from 'react';

class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currency: '',
            StockSymbol: '',
            name: '',
            region: '',
            timezone: '',
            price: '',
            mess: '',
            change: '',
            changePercent: ''
        }
    }
    
    componentDidMount(){
        this.fetchStock();
    }

    fetchStock(){
        let message = "";
        const pointerToThis = this;
        let user_input = document.getElementById("f1");
        document.addEventListener("submit", (e) =>{
            let symbol  = user_input.elements[0].value;
            pointerToThis.setState({
                StockSymbol: symbol
            })

            const API_KEY = 'J5W0TA307Q3CMY2F';
            let API_Search  = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.StockSymbol}&apikey=${API_KEY}`;

            let API_Quote  = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.StockSymbol}&apikey=${API_KEY}`;

            fetch(API_Search)
                .then(
                    function(response){
                        return response.json();
                    }
                )
                .then(
                    function(data){
                        console.log(data)
                        if(data["bestMatches"] != null){
                            message="";
                            let name = data["bestMatches"][0]["2. name"];
                            let region = data["bestMatches"][0]["4. region"];
                            let timezone = data["bestMatches"][0]["7. timezone"];
                            let currency = data["bestMatches"][0]["8. currency"];
                            pointerToThis.setState({
                                name: name,
                                timezone: timezone,
                                region: region,
                                currency:  currency
                        
                            })
                        }
                        else {
                            message = "Exceed time to call API. Try again";
                        }
                        
                    }
                    
                )


            fetch(API_Quote)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data)
                    if(data["Global Quote"] != null){
                            message="";
                            let price = data["Global Quote"]["05. price"];
                                pointerToThis.setState({
                                    price: Number.parseFloat(price).toFixed(2)
                                })
                            let changePercent = data["Global Quote"]["10. change percent"];
                            pointerToThis.setState({
                                changePercent: "(" + Number.parseFloat(changePercent).toFixed(2) + "%)"
                            })
                            let change = data["Global Quote"]["09. change"];
                            pointerToThis.setState({
                                change:  Number.parseFloat(change).toFixed(2)
                            })
                    }else {
                        message = "Exceed time to call API. Try again";
                    }
                }
                
            )
        pointerToThis.setState({
            mess: message
    
        })

        e.preventDefault();
        })
    }



    render(){
        return(
            <div>
                <h4>DMIT2008 Assessment 1</h4>
                <h1>Stock Ticker App</h1>
                <h4>{this.state.name}  {this.state.StockSymbol}</h4>
                <p>{this.state.price} {this.state.currency} {this.state.change } {this.state.changePercent }</p>
                <p>{this.state.timezone} {this.state.region}</p>
                <p className="message">{this.state.mess}</p>
            </div>
        )
    }
}

export default Stock;