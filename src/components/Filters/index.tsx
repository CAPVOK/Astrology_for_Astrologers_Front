import { FC } from "react";
import "./Filters.css";
import { CONST_STATUS } from "../../core/api/constellations/typing";
import { ChangeEvent } from "../../App.typing";
export interface IFiltersProps {
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (e: ChangeEvent) => void;
  selectedStatus: string;
  selectedStartDate: string;
  selectedEndDate: string;
  selectedName: string;
  isAdmin?: boolean;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export const Filters: FC<IFiltersProps> = (props) => {
  const {
    handleStatusChange,
    handleDateChange,
    selectedStatus,
    selectedStartDate,
    selectedEndDate,
    selectedName,
    isAdmin,
  } = props;

  const options: ISelectOption[] = [
    { label: "В процессе", value: CONST_STATUS.INPROGRESS },
    { label: "Отменено", value: CONST_STATUS.CANCELED },
    { label: "Завершено", value: CONST_STATUS.COMPLETED },
  ];

  return (
    <div className="filters">
      <div className="item">
        <p>Начало формирования:</p>
        <input
          type="date"
          name="startDate"
          value={selectedStartDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="item">
        <p>Конец формирования:</p>
        <input
          type="date"
          name="endDate"
          value={selectedEndDate}
          onChange={handleDateChange}
        />
      </div>
      {isAdmin && (
        <div className="item">
          <p>Название:</p>
          <input
          style={{backgroundColor: "#292929"}}
            type="text"
            name="constName"
            value={selectedName}
            onChange={handleDateChange}
          />
        </div>
      )}
      <div className="item">
        <p>Статус:</p>
        <select
          value={selectedStatus}
          name="status"
          onChange={handleStatusChange}
        >
          <option value="">Выберите статус</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
