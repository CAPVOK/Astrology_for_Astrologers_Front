export interface IPlanetsConstellation {
  Id: number;
}

export interface IPlanet {
  Color1: string;
  Color2: string;
  Discovered: string;
  Distance: string;
  Id: 1;
  ImageName: string;
  Info: string;
  Mass: string;
  Name: string;
}

export interface IGetPlanetsResponse {
  constellation: IPlanetsConstellation;
  planets: IPlanet[];
}

export interface IGetPlanetByIdResponse {
  planet: IPlanet;
}
