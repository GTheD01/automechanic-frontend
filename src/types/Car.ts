interface CarBrand {
  id: string;
  name: string;
}

interface CarModel {
  id: string;
  name: string;
}

export interface Car {
  id: string;
  carBrand: CarBrand;
  year: number;
  model: CarModel;
}
