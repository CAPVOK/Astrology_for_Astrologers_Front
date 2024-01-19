import { FC } from "react";
import "./PlanetsTable.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { IPlanet } from "../../core/api/planets/typing";
import { COLOR_PALETE, ROUTES } from "../../App.constants";
import unknownImage from "/images/unknown.png";

export interface IPlanetsTableProps {
  dataRows: IPlanet[];
  deleteHandler: (id: number) => void;
  addHandler: (id: number, name: string) => void;
  buttonLoadingId: number;
  isButtonTypeDelete: boolean;
}

export const PlanetsTable: FC<IPlanetsTableProps> = (props) => {
  const {
    dataRows,
    deleteHandler,
    buttonLoadingId,
    isButtonTypeDelete,
    addHandler,
  } = props;

  const navigate = useNavigate();

  if (!dataRows || !dataRows.length)
    return (
      <div className="planet_table_empty">
        <h3>Отсутсвуют данные</h3>
      </div>
    );

  const statusColors = {
    удалена: COLOR_PALETE.error,
    активна: COLOR_PALETE.success,
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors];
  };

  return (
    <div className="planet_table">
      <table>
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Цвет 1</th>
            <th>Цвет 2</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => (
            <tr key={row.planetId} className={"no_hover"}>
              <td className="planet_td">
                {!row.imageName || row.imageName.includes("unknown.png") ? (
                  <img src={unknownImage} alt="" />
                ) : (
                  <img src={row.imageName} alt={row.name} />
                )}
              </td>
              <td>{row.name}</td>
              <td style={{ color: row.color2 }}>{row.color1}</td>
              <td style={{ color: row.color2 }}>{row.color2}</td>
              <td style={{ color: getStatusColor(row.status) }}>
                {row.status}
              </td>

              <td>
                <div className="table_manage_buttons">
                  <Button
                    label="Добавить"
                    isFullWidth={true}
                    handler={() => addHandler(row.planetId, row.name)}
                    isLoading={
                      row.planetId === buttonLoadingId &&
                      isButtonTypeDelete === false
                    }
                  />
                  <Button
                    label="Подробнее"
                    style={COLOR_PALETE.info}
                    isFullWidth={true}
                    handler={() =>
                      navigate(`${ROUTES.PLANET}/${row.planetId}`, {
                        state: { prevPage: ROUTES.HOME, from: row.name },
                      })
                    }
                  />
                  <Button
                    label="Удалить"
                    style={COLOR_PALETE.error}
                    isFullWidth={true}
                    handler={() => deleteHandler(row.planetId)}
                    isLoading={
                      row.planetId === buttonLoadingId &&
                      isButtonTypeDelete === true
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
