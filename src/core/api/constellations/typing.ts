export interface IConstellation {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  creationDate: string;
  formationDate: string | null;
  confirmationDate: string | null;
  status: CONST_STATUS;
  moderatorName: string;
  fullName: string;
}

export enum CONST_STATUS {
  CREATED = "created",
  INPROGRESS = "inprogress",
  CANCELED = "canceled",
  DELETED = "deleted",
  COMPLETED = "completed",
}

export interface IConstPlanet {
  id: string;
  name: string;
  color1: string;
  color2: string;
  imageName: string;
}

export interface IGetConstellationsParams {
  startFormationDate: string;
  endFormationDate: string;
  constellationStatus: string;
}

export interface IUpdateConstellationFormProps {
  name: string;
  startDate: string;
  endDate: string;
}

export interface IConstWithPlanets extends IConstellation {
  planets: IConstPlanet[];
}

export interface IGetConstellationsResponse {
  constellations: null | IConstellation[];
}

export interface IGetConstellationByIdResponse {
  constellation: IConstWithPlanets;
}
