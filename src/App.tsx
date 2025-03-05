import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { FixedSizeList as List } from "react-window";
import { useFetch } from "./api/endpoints/test-api";
import "./App.css";

const App = () => {
  const { data, isLoading } = useFetch({
    swr: {
      onSuccess() {
        console.log("success");
        console.log(data?.data.matches);
      },
      onError() {
        console.log("errorbro");
      },
    },
  });

  // Обработка состояния загрузки и ошибок
  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // Если данных нет, отображаем пустой список
  if (!data?.data?.matches || data?.data?.matches?.length === 0)
    return <div>No data available</div>;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const match = data.data.matches[index];
    return (
      <div style={style} className="match-item">
        <div>{match.homeTeam.name}</div>
        <div>{match.time}</div>
      </div>
    );
  };

  return (
    <div className="main-page">
      <div>
        <h2 className="title">Match Tracker</h2>
      </div>
      <div className="match-list-container">
        <List
          height={window.innerHeight}
          width={window.innerWidth}
          itemCount={data?.data?.matches?.length}
          itemSize={50}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default App;
