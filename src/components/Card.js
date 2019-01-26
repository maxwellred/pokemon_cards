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
    // this.bgImg = this.bgImg.bind(this);
    // this.importAll = this.importAll.bind(this);
  }
  componentWillMount() {
    // using this props we need to get moves
    // const pathToImgs = require.context('../assets/backgrounds', true, /\.png$/);

    fetch(`${this.props.details.url}`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        // TODO: in order to handle the function call for webImgPath do i need to change this setState to a function / the function call is breaking the program

        this.setState({
          id: data.id,
          name: data.name,
          hp: data.base_experience,
          type: data.types[0].type.name,
          height: data.height,
          weight: data.weight,
          moves: [...data.moves],
          image: data.sprites.front_default
          //   webImgPath: assets(`./${data.types[0].type.name}.png`, true)
        });
      });
  }

  render() {
    // console.log('ASSETS: ', assets.keys());

    //TODO need to make

    // const imgPath = assets(`./${this.state.type}.png`, true);
    const imgPath = assets(`./water.png`, true);
    // console.log('NNNNNNNNNNN: ', imgPath);

    return (
      <Fragment>
        <section className="wrapper">
          <section
            className="container card-wrapper"
            style={{ backgroundImage: `url(${imgPath})` }}
          >
            {/* <section
            className="container card-wrapper"
            style={{ backgroundImage: `url(${this.state.webImgPath})` }}
          > */}
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
