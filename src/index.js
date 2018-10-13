import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Greeting />
      <h2>Mit React im Browser programmieren</h2>
      <div>
        <News />
      </div>
    </div>
  );
}

function Greeting() {
  return <h1>Moin</h1>;
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: null };
  }
  async componentDidMount() {
    const result = await axios(
      "https://newsapi.org/v2/top-headlines?country=de&apiKey=970a165001fa498da5971548f96955ca"
    );
    console.log(result.data);
    this.setState({ news: result.data });
  }

  render() {
    if (this.state.news) {
      const content = this.state.news.articles.map((article, i) => (
        <div key={i}>
          <div>
            <b>{article.publishedAt}</b>
            <h1>{article.title}</h1>
            <h2>{article.description}</h2>
            <p>{article.content}</p>
            <hr />
          </div>
        </div>
      ));
      return <div>{content}</div>;
    } else return null;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
