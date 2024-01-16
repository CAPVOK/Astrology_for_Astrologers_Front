export interface IPlanetCardProps {
  id: number | string;
  name: string;
  color1: string;
  color2: string;
  imageName: string;
  isAuth: boolean;
  isDeleteMode?: boolean;
  fromPage?: string;
  loadingId?: number;
  handler?: () => void;
}
