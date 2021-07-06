import React, { Component } from "react";

class Search extends Component {
  state = {
    Name: "",
    List: [],
    info: [],
    Found: false,
  };

  async fetchResults() {
    const url = `https://api.jikan.moe/v3/search/${this.props.type}?q=${this.state.animeName}&page=1`;
    let data = await fetch(url);
    data = await data.json();
    let List = [];
    for (let i = 0; i < 5; i++) {
      List.push({
        title: data.results[i].title,
        mal_id: data.results[i].mal_id,
      });
    }
    this.setState({ List });
  }

  handleChange = async (event) => {
    this.setState({
      animeName: event.target.value,
    });
    if (event.target.value.length > 3) {
      await this.fetchResults();
    }
  };

  getData = async (event) => {
    const url = `https://api.jikan.moe/v3/${this.props.type}/${event.target.id}`;
    let data = await fetch(url);
    let info = await data.json();
    info = {
      mal_id: info.mal_id,
      title: info.title,
      synopsis: info.synopsis,
      score: info.score,
      image: info.image_url,
    };
    this.setState({ info, Found: true });
  };

  render() {
    return (
      <div>
        <input
          placeholder={this.props.type}
          onChange={this.handleChange}
        ></input>
        {this.state.List.map((Name) => (
          <div>
            <button onClick={this.getData} id={Name.mal_id}>
              {Name.title}
            </button>
          </div>
        ))}
        {this.state.Found ? (
          <div>
            <div>{this.state.info.mal_id}</div>
            <div>{this.state.info.title}</div>
            <div>{this.state.info.score}</div>
            <div>{this.state.info.synopsis}</div>
            <img src={this.state.info.image} alt=""></img>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Search;
