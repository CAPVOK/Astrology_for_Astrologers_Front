import { FC } from "react";
import "./PlanetsTable.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { IPlanet } from "../../core/api/planets/typing";

export interface IPlanetsTableProps {
  dataRows: IPlanet[];
  deleteHandler: (id: number) => void;
  buttonLoadingId?: number;
}

export const PlanetsTable: FC<IPlanetsTableProps> = (props) => {
  const { dataRows, deleteHandler, buttonLoadingId } = props;

  const navigate = useNavigate();

  if (!dataRows || !dataRows.length)
    return (
      <div className="planet_table_empty">
        <h3>Отсутсвуют данные</h3>
      </div>
    );

  const statusColors = {
    удалена: "#e80909",
    активна: "#4eff26",
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors];
  };

  return (
    <div className="planet_table">
      <table>
        <thead>
          <tr>
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
              <td>{row.name}</td>
              <td>{row.color1}</td>
              <td>{row.color2}</td>
              <td style={{ color: getStatusColor(row.status) }}>
                {row.status}
              </td>

              <td className="table_manage_buttons">
                <Button
                  label="Подробнее"
                  style="info"
                  isFullWidth={true}
                  handler={() =>
                    navigate(`/planet/${row.planetId}`, {
                      state: { prevPage: "/", from: row.name },
                    })
                  }
                />
                <Button
                  label="Удалить"
                  style="error"
                  isFullWidth={true}
                  handler={() => deleteHandler(row.planetId)}
                  isLoading={row.planetId === buttonLoadingId}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
