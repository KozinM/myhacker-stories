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

  const [searchTerm, setSearchTerm] = useState("React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <Button />
      <hr />
      <List list={searchedStories} />
      {/* render the list here */}
      {/* this is how comments in JSX are made */}
    </div>
  );
};

export default App;

const List = (props) => {
  return (
    <ul>
      {console.log("App renders")}
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

const Item = (props) => {
  return (
    <li>
      {console.log("Item renders")}
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
  };
  return <button onClick={clickOnButtonHandler}>Clear console</button>;
};

const Search = (props) => {
  return (
    <div>
      {console.log("Search renders")}
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={props.searchTerm}
        onChange={props.onSearch}
      />
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  );
};
