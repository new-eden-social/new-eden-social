export interface ApiValidationError {
  property: string;
  constraints: {
    [type: string]: string;
  };
}
