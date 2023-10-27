export interface Login {
  code: number;
  message: string;
  data: {
    twoFA: boolean;
  };
}
