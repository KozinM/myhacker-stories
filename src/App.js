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

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm')??"React");

  React.useEffect(()=>{
    localStorage.setItem('searchTerm',searchTerm);
  },[searchTerm]);

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

const List = ({list}) => {
  return (
    <ul>
      {list.map(({objectID, ...item}) => (
        <Item 
        key={objectID} 
        {...item}
        />
      ))}
    </ul>
  );
};

const Item = ({
  title,
  url,
  author,
  num_comments,
  points,
}) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
};

const Button = () => {
  const clickOnButtonHandler = () => {
    console.clear();
  };
  return <button onClick={clickOnButtonHandler}>Clear console</button>;
};

const Search = ({searchTerm, onSearch}) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearch}
      />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};
