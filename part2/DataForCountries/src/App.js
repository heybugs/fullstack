import React, { useState, useEffect } from 'react';
import { getSearch, getWeather } from './request';
import { Content } from './components/Content';
import { CityList } from './components/CityList';
const App = () => {
  const [cityName, setCityName] = useState('');
  const [cityList, setCityList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [isShowTips, setShowTips] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);
  const [isShowCity, setShowCity] = useState(false);
  const [curWeather, setCurWeather] = useState({});
  const handleChangeClick = (e) => {
    setCityName(e.target.value);
    let arr = [];
    arr = cityList.filter((item) => {
      return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });

    if (arr.length === 1) {
      setNewList(arr);
      setShowTips(false);
    } else if (arr.length > 1 && arr.length <= 10) {
      setNewList(arr);
      setShowTips(false);
    } else if (arr.length > 10) {
      setNewList([]);
      setShowTips(true);
    } else {
      setNewList([]);
    }
  };
  useEffect(() => {
    getSearch().then((data) => {
      setCityList(data);
    });
  }, []);

  const handleShowClick = (item) => {
    setCurrentCity(item);
    setShowCity(true);
    getWeather(item.name).then((res) => {
      setCurWeather(res.current);
    });
  };

  return (
    <div>
      <div>
        find countries: <input value={cityName} onChange={handleChangeClick} />
      </div>
      {isShowTips ? <p>too many matches ,specify another filter</p> : ''}
      <div>
        {newList.length === 1 ? (
          <Content cityItem={newList[0]} curWeather={curWeather} />
        ) : (
          <div>
            <CityList newList={newList} handleShowClick={handleShowClick} />
            {isShowCity ? (
              <Content cityItem={currentCity} curWeather={curWeather} />
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
