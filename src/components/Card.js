import React, { Fragment, Component } from 'react';
import assets from '../assets/assets';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      hp: 0,
      type: '',
      height: '',
      weight: '',
      moves: [],
      move_description: '',
      image: '',
      bgImgs: ['fire', 'water', 'electric', 'fighting', 'grass', 'psychic', 'special'],
      webImgPath: ''
    };
  }
  componentWillMount() {
    // have to getItem by pokemon number passed by name from props
    // change this to check if INSIDE the localstorage parent object pokemonDetails the key of this.props.name exists then get that
    let pokeName = this.props.name;
    console.log('POKE NAME: ', pokeName);
    // undefined on reload so its not saving it
    // console.log('POKE NAME in local: ', localStorage.getItem('pokemonCardDetails').pokeName);

    // TODO: handle when its the first time of calling and there isnt a pokemonCardDetails list in localstorage at all

    // see if the list exists and then see if the key were looking for exists in it
    if (
      localStorage.getItem('pokemonCardDetails') &&
      localStorage.getItem('pokemonCardDetails').pokeName
    ) {
      // if (localStorage.getItem('pokemonCardDetails')) {
      console.log('getting POKEMON CARD from localstorage...');
      let parsedData = JSON.parse(localStorage.getItem('pokemonCardDetails').pokeName);
      this.setState({ ...parsedData });
    } else {
      fetch(`${this.props.details.url}`)
        .then(results => {
          return results.json();
        })
        .then(data => {
          let bgType = data.types[0].type.name;
          if (data.types[0].type.name === 'poison' || data.types[0].type.name === 'bug') {
            bgType = 'grass';
          }
          if (data.types[0].type.name === 'flying') {
            bgType = 'fire';
          }
          if (data.types[0].type.name === 'normal') {
            bgType = 'fighting';
          }

          this.setState(
            {
              id: data.id,
              name: data.name,
              hp: data.base_experience,
              type: data.types[0].type.name,
              height: data.height,
              weight: data.weight,
              moves: [...data.moves],
              image: data.sprites.front_default,
              webImgPath: assets(`./${bgType}.png`, true)
            },
            () => {
              //   console.log('setting POKEMON CARD in local storage...');
              // after state has been set, create a new obj to set into local storage so we can grab that the next time around and not have to make an API call
              let newPokeCard = {
                [this.props.name]: this.state
              };
              //   console.log('New Poke Card: ', newPokeCard);
              // IF pokemonCardDetails exists in local storage but the card doesnt, add it
              if (localStorage.getItem('pokemonCardDetails')) {
                console.log('setting POKEMON CARD in local storage...');

                let parsedLocalDetails = JSON.parse(localStorage.getItem('pokemonCardDetails'));
                parsedLocalDetails = { ...parsedLocalDetails, ...newPokeCard };
                localStorage.setItem('pokemonCardDetails', JSON.stringify(parsedLocalDetails));

                console.log(
                  'POKE NAME in local: ',
                  localStorage.getItem('pokemonCardDetails').pokeName
                );

                // else if the pokemonCardDetails key doesnt exist in localStorage then make it and add the card to it
              } else {
                console.log('setting POKEMON CARD in local storage...');
                // dont need spread operator?
                localStorage.setItem('pokemonCardDetails', JSON.stringify(newPokeCard));
              }
            }
          );
        });
    }
  }

  render() {
    // webpack require.context
    // console.log('ASSETS: ', assets.keys());

    return (
      <Fragment>
        <section className="wrapper">
          <section
            className="container card-wrapper"
            style={{ backgroundImage: `url(${this.state.webImgPath})` }}
          >
            <article className="container card-container">
              <div className="container card-header">
                <h2>{this.state.name}</h2>
                <p>{this.state.hp}HP</p>
              </div>
              <img src={this.state.image} alt="charizard picture" />
              <div className="container pokemon-details">
                <p className="poke-type">{this.state.type.toUpperCase()} Pokemon</p>
                <p className="poke-height">Length: {this.state.height}</p>
                <p className="poke-weight">Weight: {this.state.weight}lbs</p>
              </div>
              <div className="container move-container">
                <div className="container poke-move">
                  <div className="container poke-move-text">
                    {/* make this a ul with li items */}
                    <h3>Move Title</h3>
                    <p>{/* {this.props.} */}</p>
                  </div>
                  <p>100</p>
                </div>
              </div>
            </article>
          </section>
        </section>
      </Fragment>
    );
  }
}
