export interface CarBrand {
  id: string;
  name: string;
}

export interface CarModel {
  id: string;
  name: string;
}

export interface Car {
  id: string;
  carBrand: CarBrand;
  year: number;
  model: CarModel;
  version: string;
}

export interface CarDataProps {
  year: string;
  brandName: CarBrand["name"];
  modelName: CarModel["name"];
  version: string;
}
