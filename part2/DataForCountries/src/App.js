import React, { useState, useEffect } from 'react';
import { getSearch } from './request';
const App = () => {
  const [cityName, setCityName] = useState('');
  const [cityList, setCityList] = useState([]);
  const [newList, setNewList] = useState([]);
  // TODO
  const handleChangeClick = (e) => {
    setCityName(e.target.value);
    console.log(e.target.vaule);
    console.log(cityName);
    let searchRegex = new RegExp(cityName, 'i');
    cityList.filter((cityItem) => {
      if (searchRegex.test(cityItem.name)) {
        setNewList(newList.concat(cityItem));
      }
      return true;
    });
    console.log(newList);
  };
  useEffect((cityName, handleChangeClick) => {
    if (cityName) {
      handleChangeClick();
    }

    getSearch().then((data) => {
      setCityList(data);
    });
  }, []);

  return (
    <div>
      <div>
        fiind countries: <input value={cityName} onChange={handleChangeClick} />
      </div>
      <p>too many matches ,specify another filter</p>
      <ul>
        <li>1</li>
      </ul>
      <div>{/* 详细信息 */}</div>
    </div>
  );
};

export default App;
