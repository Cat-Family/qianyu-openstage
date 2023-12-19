import { MethodDirection } from '../types/method.type';

export interface Options extends RequestInit {
  method: MethodDirection;
}
