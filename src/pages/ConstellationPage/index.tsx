import "./ConstellationPage.css";
import { FC } from "react";
import { BreadCrumbs, Loader, PlanetCard } from "../../components";
import { CONST_STATUS } from "../../core/api/constellations/typing";
import { Container } from "react-bootstrap";
import { IPlanetCardProps } from "../../components/PlanetCard/typing";
import { Button } from "../../components/Button";
import { useConstellationPage } from "./useConstellationPage";
import { COLOR_PALETE, ROUTES } from "../../App.constants";

export const ConstellationPage: FC = () => {
  const {
    getDate,
    getStatusColor,
    handlePlanetDelete,
    hadleChangeFormData,
    convertToCalendarDate,
    handleUpdateConstellation,
    handleDeleteConstellation,
    handleConstellationChangeStatus,
    deleteButtonLoading,
    isEditButtonActive,
    breadCrumbsProps,
    formButtonLoading,
    constellationData,
    planetLoading,
    statusLabel,
    formData,
    id,
  } = useConstellationPage();

  const isDeletePlanetActive = !constellationData?.formationDate;
  const isFormButtonActive =
    constellationData &&
    !!constellationData.planets?.length &&
    !formButtonLoading;

  return (
    <div className="constellation_page">
      <BreadCrumbs {...breadCrumbsProps} />
      {constellationData ? (
        <>
          <div className="constellation_content">
            <div className="info">
              <h3>Название:</h3>
              <input
                type="text"
                onChange={hadleChangeFormData}
                name="name"
                value={formData.name}
              />
            </div>
            <div className="info">
              <h3>Дата начала:</h3>
              <input
                type="date"
                onChange={hadleChangeFormData}
                name="startDate"
                value={convertToCalendarDate(formData.startDate)}
              />
            </div>
            <div className="info">
              <h3>Дата конца:</h3>
              <input
                type="date"
                onChange={hadleChangeFormData}
                name="endDate"
                value={convertToCalendarDate(formData.endDate)}
              />
            </div>
            <div className="info">
              <h3>Статус:</h3>
              <p style={{ color: getStatusColor(constellationData.status) }}>
                {statusLabel[constellationData.status]}
              </p>
            </div>
            <div className="info">
              <h3>Дата создания:</h3>
              <p>
                {getDate(
                  constellationData?.creationDate || ""
                ).toLocaleDateString()}
              </p>
            </div>
            {constellationData?.formationDate && (
              <div className="info">
                <h3>Дата формирования:</h3>
                <p>
                  {getDate(
                    constellationData?.formationDate || ""
                  ).toLocaleDateString()}
                </p>
              </div>
            )}
            {constellationData?.confirmationDate && (
              <div className="info">
                <h3>Дата завершения:</h3>
                <p>
                  {getDate(
                    constellationData?.confirmationDate || ""
                  ).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          {!constellationData.formationDate && (
            <>
              <div className="constellation_buttons">
                <Button
                  isLoading={!isEditButtonActive}
                  style={COLOR_PALETE.info}
                  handler={handleUpdateConstellation}
                  label="Изменить"
                />
                <Button
                  handler={() =>
                    handleConstellationChangeStatus(CONST_STATUS.INPROGRESS)
                  }
                  isLoading={!isFormButtonActive}
                  label="Сформировать"
                />{" "}
                <Button
                  style={COLOR_PALETE.error}
                  isLoading={deleteButtonLoading}
                  label="Удалить"
                  handler={handleDeleteConstellation}
                />
              </div>
            </>
          )}
          {constellationData && !!constellationData.planets?.length ? (
            <Container className="planets" id="planets">
              {constellationData.planets.map((planet, index) => {
                const props: IPlanetCardProps = {
                  id: planet.id,
                  name: planet.name,
                  color1: planet.color1,
                  color2: planet.color2,
                  imageName: planet.imageName,
                  isAuth: isDeletePlanetActive,
                  isDeleteMode: isDeletePlanetActive,
                  loadingId: planetLoading,
                  handler: () =>
                    handlePlanetDelete(Number(planet.id), planet.name),
                  fromPage: `${ROUTES.CONSTELLATIONS}/${id}`,
                };
                return <PlanetCard key={index} {...props} />;
              })}
            </Container>
          ) : (
            <Container className="d-flex justify-content-center mt-4 mb-5">
              <h2>Пока тут нет планет</h2>
            </Container>
          )}
        </>
      ) : (
        <div className="constellation_loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
