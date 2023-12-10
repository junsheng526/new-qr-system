export type DishModel = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderModel = {
  tableNumber: string;
  finished: boolean;
  orders: {
    ordertime: Date;
    dishes: DishModel;
  }[];
};
