import React, { Component } from 'react';
import logo from './beer.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <PageTitle />
        </header>
        <IpaList />
      </div>
    );
  }
}

class PageTitle extends Component {
    render() {
        return (<h1>IPA API!</h1>);
    };
}

class IpaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
        }
    }

    componentDidMount() {
        fetch('https://api.punkapi.com/v2/beers')
        .then(response => response.json())
        .then(data => this.setState({ beers: data }))
    }

    render() {
        const arrList = this.state.beers.map((beer, index) => <IpaListElement id={beer.id} name={beer.name} tagline={beer.tagline} />);

        return (
            <div>
                {arrList.length?arrList:"Loading..."}
            </div>
        );
    };
}

class IpaListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            tagline: props.tagline,
            id: props.id,
            description: null,
        }
    }

    fetchBeerDetails(beerId) {
        if (this.state.description) {
            this.setState({
                description: null,
            })
        } else {
            this.setState({
                description: 'Loading...',
            })

            fetch('https://api.punkapi.com/v2/beers/'+beerId)
            .then(response => response.json())
            .then(data => this.setState({
                description: data[0].description,
            }))
        }
    }

    render() {
        const beer = this.state;
        return (
            <div>
                <div onClick={() => this.fetchBeerDetails(beer.id)}><strong>{beer.name}</strong> {beer.tagline?' - ' + beer.tagline:''}</div>
                <div className="BeerDescription">{beer.description}</div>
            </div>

        );
    };
}

export default App;
