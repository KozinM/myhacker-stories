import * as React from "react";
import { useState } from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const handleSearch = (event) => {
    console.log(event.target.value)
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} />
      <Button />
      <hr />
      <List list={stories} />
      {/* render the list here */}
      {/* this is how comments in JSX are made */}
    </div>
  );
};

export default App;

const List = (props) => {
  return (
    <ul>
      {console.log('App renders')}
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

const Item = (props) => {
  return (
    <li>
      {console.log('Item renders')}
      <span>
        <a href="{item.url}">{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
};

const Button = () => {
  const clickOnButtonHandler = () => {
    console.clear();
  }
  return (
    <button onClick={clickOnButtonHandler}>Clear console</button>
  );
}

const Search = (props) => {

const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearch(event);
  };

  return (
    <div>
      {console.log('Search renders')}
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />


      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};
