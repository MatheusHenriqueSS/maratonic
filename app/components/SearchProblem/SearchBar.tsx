import React from 'react';
import './SearchBar.css';
import { Problem } from "@prisma/client";

const SearchBar: React.FC = () =>{ 
    const [userList, setUserList] = React.useState<
        { name: string; age: number; designation: string }[] | undefined
    >(Problem);
    const [text, setText] = React.useState<string>('');

    const handleOnClick = () => {
        const findUsers =
          userList && userList?.length > 0
            ? userList?.filter((u) => u?.name === text)
            : undefined;
    
        console.log(findUsers);
    
        setUserList(findUsers);
    };

    return (
        <div>
          <div className="title">
            <h1>User Find</h1>
          </div>
          <div className="input__wrapper">
            <input
              type="text"
              placeholder="Search Problem"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setUserList(users);
              }}
            />
            <button disabled={!text} onClick={handleOnClick}>
              Search
            </button>
          </div>
    
          <div className="body">
            {userList && userList?.length === 0 && (
              <div className="notFound">No User Found</div>
            )}
    
            {userList &&
              userList?.length > 0 &&
              userList?.map((user) => {
                return (
                  <div className="body__item">
                    <h3>Name: {user?.name}</h3>
                    <p>Age: {user?.age}</p>
                    <p>Designation: {user?.designation}</p>
                  </div>
                );
              })}
          </div>
        </div>
      );
};

export default SearchBar;