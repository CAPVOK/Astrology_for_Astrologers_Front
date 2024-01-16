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

export interface IGetPlanetsResponse {
  constellationID: number;
  planets: IPlanet[];
}

export interface IGetPlanetByIdResponse {
  planet: IPlanet;
}

