import { restaurants } from "@/sampledata/restaurants";
import { Restaurant } from "@/types";

export function getRestaurants(): Restaurant[] {
  return restaurants;
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getRestaurantByName(name: string): Restaurant | undefined {
  return restaurants.find((r) => r.restroName === name);
}
