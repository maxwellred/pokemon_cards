import React, { Fragment, Component } from 'react';
import Card from './Card.js';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeArr: []
    };
  }

  // QUERY STRING
  // https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20

  // Remove local storage
  // localStorage.removeItem('myCat');
  // Clear all local storage
  // localStorage.clear();
  // setItem will also overwrite/update keys value given whats currently in there

  componentWillMount() {
    if (localStorage.getItem('pokeArr')) {
      // check reducer or localstorage
      console.log('getting from localstorage...');
      let parsedData = JSON.parse(localStorage.getItem('pokeArr'));
      this.setState({
        pokeArr: [...parsedData]
      });
    } else {
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
          console.log('fetching data...');
          return response.json();
        })
        .then(data => {
          console.log('setting local storage...');
          localStorage.setItem('pokeArr', JSON.stringify(data.results));
          this.setState({
            pokeArr: [...data.results]
          });
        });
    }
  }

  render() {
    return (
      <Fragment>
        <ul className="pokemon-ul">
          {this.state.pokeArr.map((ele, idx) => {
            return (
              <li key={idx} className="pokemon-li">
                {/* <a href={ele.url}>{ele.name}</a> */}
                <Card details={ele} />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}
