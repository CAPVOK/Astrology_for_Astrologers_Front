import { FC } from "react";
import "./ConstellationTable.css";
import {
  CONST_STATUS,
  IConstellation,
} from "../../core/api/constellations/typing";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { COLOR_PALETE, ROUTES } from "../../App.constants";

export interface IConstellationTableProps {
  dataRows: IConstellation[] | undefined | null;
  isAdmin?: boolean;
  completeHandler?: (id: number, status: CONST_STATUS) => void;
  buttonLoadingId?: number;
  buttonLoadingStatus?: CONST_STATUS;
}

export const ConstellationTable: FC<IConstellationTableProps> = (props) => {
  const {
    dataRows,
    isAdmin,
    completeHandler,
    buttonLoadingId,
    buttonLoadingStatus,
  } = props;

  const navigate = useNavigate();

  if (!dataRows || !dataRows.length)
    return (
      <div className="stella_table_empty">
        <h3>Отсутсвуют данные</h3>
      </div>
    );

  const statusLabel = {
    created: "черновик",
    canceled: "отменено",
    inprogress: "в прогрессе",
    deleted: "удалено",
    completed: "подтверждено",
  };
  const statusColors = {
    created: COLOR_PALETE.lightGray,
    canceled: COLOR_PALETE.error,
    inprogress: COLOR_PALETE.white,
    deleted: COLOR_PALETE.error,
    completed: COLOR_PALETE.success,
  };

  const getNormalDate = (date: string) => {
    if (date === "") return "Отсутствует";
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  const getNormalDateTime = (date: string) => {
    if (date === "") return "Отсутствует";
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };
  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors];
  };

  const handleRowClick = (id: number) => {
    if (isAdmin) return;
    navigate(`${ROUTES.CONSTELLATIONS}/${id}`, {
      state: { prevPage: ROUTES.CONSTELLATIONS },
    });
  };

  const isCancelButtonLoading = buttonLoadingStatus === CONST_STATUS.CANCELED;
  const isCompleteButtonLoading =
    buttonLoadingStatus === CONST_STATUS.COMPLETED;

  return (
    <div className="stella_table">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата подтверждения</th>
            <th>Статус</th>
            {isAdmin && <th>Создатель</th>}
            {isAdmin && <th>Модератор</th>}
            {isAdmin && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row) => (
            <tr
              key={row.id}
              style={{ cursor: isAdmin ? "" : "pointer" }}
              onClick={() => handleRowClick(row.id)}
              className={isAdmin ? "no_hover" : ""}
            >
              <td>{row.name}</td>
              <td>{getNormalDate(row.startDate)}</td>
              <td>{getNormalDate(row.endDate)}</td>
              <td>{getNormalDateTime(row.creationDate)}</td>
              <td
                style={{
                  color: row.formationDate
                    ? COLOR_PALETE.white
                    : COLOR_PALETE.lightGray,
                }}
              >
                {getNormalDateTime(row.formationDate || "")}
              </td>
              <td
                style={{
                  color: row.confirmationDate
                    ? COLOR_PALETE.white
                    : COLOR_PALETE.lightGray,
                }}
              >
                {getNormalDateTime(row.confirmationDate || "")}
              </td>
              <td style={{ color: getStatusColor(row.status) }}>
                {statusLabel[row.status]}
              </td>
              {isAdmin && <td>{row.fullName}</td>}
              {isAdmin && (
                <td
                  style={{
                    color: row.moderatorName
                      ? COLOR_PALETE.white
                      : COLOR_PALETE.lightGray,
                  }}
                >
                  {row.moderatorName || "Отсутствует"}
                </td>
              )}
              {isAdmin && completeHandler && (
                <td className="table_manage_buttons">
                  <Button
                    label="Подбробнее"
                    style={COLOR_PALETE.info}
                    isFullWidth={true}
                    handler={() =>
                      navigate(`${ROUTES.CONSTELLATIONS}/${row.id}`, {
                        state: { prevPage: ROUTES.CONSTELLATIONS },
                      })
                    }
                  />

                  <Button
                    label="Подтвердить"
                    style={COLOR_PALETE.success}
                    isFullWidth={true}
                    handler={() =>
                      completeHandler(row.id, CONST_STATUS.COMPLETED)
                    }
                    isLoading={
                      (isCompleteButtonLoading && row.id === buttonLoadingId) ||
                      row.status !== CONST_STATUS.INPROGRESS
                    }
                  />
                  <Button
                    label="Отменить"
                    style={COLOR_PALETE.error}
                    isFullWidth={true}
                    handler={() =>
                      completeHandler(row.id, CONST_STATUS.CANCELED)
                    }
                    isLoading={
                      (isCancelButtonLoading && row.id === buttonLoadingId) ||
                      row.status !== CONST_STATUS.INPROGRESS
                    }
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
