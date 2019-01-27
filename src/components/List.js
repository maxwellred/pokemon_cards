import React, { Fragment, Component } from 'react';
import Card from './Card.js';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  // QUERY STRING to add next and previous page and how many search results per page functionality
  // https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20

  // Remove local storage
  // localStorage.removeItem('myCat');
  // Clear all local storage
  // localStorage.clear();
  // setItem will also overwrite/update keys value given whats currently in there

  componentWillMount() {
    // TODO:
    // update this so it adds to the pokemonList after visiting new pages so if the person goes back it will grab the data from localstorage not make the API calls

    if (localStorage.getItem('pokemonList')) {
      // check reducer or localstorage
      console.log('getting LIST from localstorage...');
      let parsedData = JSON.parse(localStorage.getItem('pokemonList'));
      this.setState({
        pokemonList: [...parsedData]
      });
    } else {
      // change to its own function so that compoWillMount,nextPage, and prevPage and access it
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
          console.log('fetching LIST data...');
          return response.json();
        })
        .then(data => {
          console.log('setting LIST in local storage...');
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
          // update this to continually build the list per page view and grab from that
          this.setState({
            pokemonList: [...data.results]
          });
        });
    }
  }

  nextPage() {
    console.log('NEXT PAGE');
  }

  previousPage() {
    console.log('PREVIOUS PAGE');
  }

  render() {
    return (
      <Fragment>
        <div className="page-buttons">
          <button onClick={this.nextPage}>Next</button>
          <button onClick={this.previousPage}>Previous</button>
        </div>
        <ul className="pokemon-ul">
          {this.state.pokemonList.map((ele, idx) => {
            return (
              <li key={idx} className="pokemon-li">
                {/* <a href={ele.url}>{ele.name}</a> */}
                <Card name={ele.name} details={ele} />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}
