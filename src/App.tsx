import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { FixedSizeList as List } from "react-window";
import { useFetch } from "./api/endpoints/test-api";

const MatchList = () => {
  const { data, error, isLoading } = useFetch({
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
  if (error) return <div>Error: {error.message}</div>;

  // Если данных нет, отображаем пустой список
  if (!data?.data?.matches || data?.data?.matches?.length === 0)
    return <div>No data available</div>;

  // Компонент для рендеринга отдельного элемента в списке
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
    <div className="match-list-container">
      <List
        height={400}
        itemCount={data?.data?.matches?.length} // Количество элементов
        itemSize={50} // Размер одного элемента
        width="100%" // Ширина списка
      >
        {Row}
      </List>
    </div>
  );
};

export default MatchList;
