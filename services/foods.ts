import { foods } from "@/sampledata/foods";
import { Food } from "@/types";

export function getFoods(): Food[] {
  return foods;
}

export function getFoodById(id: string): Food | undefined {
  return foods.find((f) => f.id === id);
}

export function getFoodsByRestaurant(restaurantName: string): Food[] {
  return foods.filter((f) => f.restaurant === restaurantName);
}
