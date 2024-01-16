export interface IPlanetsConstellation {
  Id: number;
}

export interface IPlanet {
  planetId: number;
  name: string;
  discovered: string;
  mass: string;
  distance: string;
  info: string;
  color1: string;
  color2: string;
  status: string;
  imageName: string;
}

export interface ICreatePlanetRequest {
  name: string;
  discovered: string | null;
  mass: string | null;
  distance: string | null;
  info: string | null;
  color1: string;
  color2: string;
}

export interface IGetPlanetsResponse {
  constellationID: number;
  planets: IPlanet[];
}

export interface IGetPlanetByIdResponse {
  planet: IPlanet;
}
