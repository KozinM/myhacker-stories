import * as React from "react";

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

  /*   const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm')??"React");

  React.useEffect(()=>{
    localStorage.setItem('searchTerm',searchTerm);
  },[searchTerm]); */

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
        </InputWithLabel>
      <Button />
      <hr />
      <List list={searchedStories} />
      {/* render the list here */}
      {/* this is how comments in JSX are made */}
    </div>
  );
};

export default App;

const List = ({ list }) => {
  return (
    <ul>
      {list.map(({ objectID, ...item }) => (
        <Item key={objectID} {...item} />
      ))}
    </ul>
  );
};

const Item = ({ title, url, author, num_comments, points }) => {
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

const InputWithLabel = ({ id, value, onInputChange, children }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} type="text" value={value} onChange={onInputChange} />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};
