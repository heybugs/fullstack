export const CityList = ({ newList, handleShowClick }) => {
  return (
    <ul>
      {newList.map((item) => {
        return (
          <div key={item.name}>
            <p>
              <li>{item.name}</li>
              <button onClick={() => handleShowClick(item)}>show</button>
            </p>
          </div>
        );
      })}
    </ul>
  );
};
