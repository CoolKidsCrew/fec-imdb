import React from "react";
import axios from "axios";
import MovieEntry from "./MovieEntry.jsx";
import styles from "../../static/styles/styles.css";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //SDC Testing only//
      movieIndex: Math.floor(Math.random() * (999999 - 1)) + 1,
      //SDC Testing only end//
      data: []
    };
    this.fetchAll = this.fetchAll.bind(this);
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    // axios.get(`/suggested/api/${this.state.movieIndex}`).then(data => {
    axios.get(`http://13.57.169.8:9000/suggested/api/${this.state.movieIndex}`).then(data => {
        console.log("Data fetched:", data);
      let movies = data.data;
      this.setState({
        data: movies
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h4 className={styles.header}>Suggested movies:</h4>
        <div className={styles.list}>
          {this.state.data.map((movie, i) => {
            return <MovieEntry key={"movie_" + i} movie={movie} />;
          })}
        </div>
      </div>
    );
  }
}

export default MovieList;
