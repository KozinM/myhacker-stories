import * as React from "react";

const initialStories = [
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

const getAsyncStories = () => {
  const fetchResult=Math.random();
  if (fetchResult>=0.5) {
    return new Promise ((resolve)=>
    setTimeout(()=>resolve({data: {stories: initialStories}}), 
    3000
  )
  )}
  return Promise.reject((reject)=>
  setTimeout(()=>reject("It's an Error!"), 
  3000)
)
  
};


const App = () => {

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
  //custom hook
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  //React's state hooks
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(()=>{
    setIsLoading(true);

    //mocking fetch  
    getAsyncStories().then(result=>{
      setStories(result.data.stories);
      setIsLoading(false);
    })
    .catch(()=>{
      setIsError(true); 
      setIsLoading(false)
    });
  },[]);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story)=> {return item.objectID !== story.objectID});
    setStories(newStories);
  };
 
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
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
        </InputWithLabel>
      <Button />
      <hr />
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ):(
      <List 
        list={searchedStories}  
        onRemoveItem={handleRemoveStory}/>      
      )}
      {/* render the list here */}
      {/* this is how comments in JSX are made */}
    </div>
  );
};

export default App;

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item 
          key={item.objectID} 
          item ={item}
          onRemoveItem={onRemoveItem}
          />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
/*   const handleRemoveItem = () => {
    onRemoveItem(item);
  }; */

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button
          type="button"
          onClick={()=> onRemoveItem(item)}>
            Dismiss
        </button>
      </span>
    </li>
  );
};

const Button = () => {
  const clickOnButtonHandler = () => {
    console.clear();
  };
  return <button onClick={clickOnButtonHandler}>Clear console</button>;
};

const InputWithLabel = ({ id, value, onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();

  React.useEffect(()=>{
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input 
      ref={inputRef}
      id={id} 
      type="text" 
      value={value} 
      autoFocus={isFocused} 
      onChange={onInputChange} 
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};
