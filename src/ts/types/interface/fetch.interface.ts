import { MethodDirection } from "../types/method.types";

export interface Options extends RequestInit {
  method: MethodDirection;
}