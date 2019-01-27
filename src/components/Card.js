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
    let pokeName = this.props.name;
    if (
      localStorage.getItem('pokemonCardDetails') &&
      JSON.parse(localStorage.getItem('pokemonCardDetails'))[pokeName]
    ) {
      console.log('getting POKEMON CARD from localstorage...');
      let parsedData = JSON.parse(localStorage.getItem('pokemonCardDetails'))[pokeName];
      // take previous state and over write it
      // this is wrong? need to use the function version of setState to overwrite it?
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
              let newPokeCard = {
                [this.props.name]: this.state
              };

              // IF pokemonCardDetails exists in local storage but the card doesnt, add it
              if (localStorage.getItem('pokemonCardDetails')) {
                console.log('setting POKEMON CARD in local storage...');
                let parsedLocalDetails = JSON.parse(localStorage.getItem('pokemonCardDetails'));
                parsedLocalDetails = { ...parsedLocalDetails, ...newPokeCard };
                localStorage.setItem('pokemonCardDetails', JSON.stringify(parsedLocalDetails));

                // ELSE IF the pokemonCardDetails key doesnt exist in localStorage then make it and then add the card to it
              } else {
                console.log('setting LIST and POKEMON CARD in local storage...');
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
                  <ul className="container poke-move-list">
                    {this.state.moves.map(ele => {
                      return (
                        <li>
                          <p>{ele.move.name}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </section>
      </Fragment>
    );
  }
}

// {/* <div className="container poke-move-text">
//  <h3>Move Title</h3>
//  <p>{/* {this.props.} */}</p>
// </div> */}
