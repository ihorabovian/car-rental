/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BodyType =
  | 'CABRIOLET'
  | 'COUPE'
  | 'HATCHBACK'
  | 'SEDAN'
  | 'SUV';

export type Brand =
  | 'AUDI'
  | 'BMW'
  | 'GARDEN_CAR'
  | 'GROCERY_CART'
  | 'HAIER'
  | 'HYUNDAI'
  | 'INVALID'
  | 'JEEP'
  | 'KIA'
  | 'MERCEDES'
  | 'TOYOTA'
  | 'VOLKSWAGEN';

export type Color =
  | 'BLACK'
  | 'BLUE'
  | 'GREEN'
  | 'GREY'
  | 'ORANGE'
  | 'RED'
  | 'SILVER'
  | 'WHITE';

export type CreateRentDto = {
  birthDate: string;
  carId: string;
  comment?: string | null | undefined;
  email: string;
  endDate: number;
  firstName: string;
  lastName: string;
  middleName?: string | null | undefined;
  phone: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: number;
};

export type Steering =
  | 'LEFT'
  | 'RIGHT';

export type Transmission =
  | 'AUTOMATIC'
  | 'MANUAL';

export type CreateCarRentMutationVariables = Exact<{
  input: CreateRentDto;
}>;


export type CreateCarRentMutation = { createCarRent: { success: boolean, reason: string | null, rent: { _id: string, startDate: number, endDate: number, pickupLocation: string, returnLocation: string, carInfo: { name: string } } } };

export type GetCarQueryVariables = Exact<{
  carId: string;
}>;


export type GetCarQuery = { getCar: { data: { id: string, name: string, brand: Brand, price: number, location: string, color: Color, bodyType: BodyType, steering: Steering, transmission: Transmission, media: Array<{ url: string, isCover: boolean }> } } };

export type GetCarsQueryVariables = Exact<{
  search?: string | null | undefined;
  brand?: Array<Brand> | Brand | null | undefined;
  bodyType?: Array<BodyType> | BodyType | null | undefined;
  steering?: Array<Steering> | Steering | null | undefined;
  transmission?: Array<Transmission> | Transmission | null | undefined;
  color?: Array<Color> | Color | null | undefined;
  minPrice?: number | null | undefined;
  maxPrice?: number | null | undefined;
  startDate?: number | null | undefined;
  endDate?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type GetCarsQuery = { getCars: { data: Array<{ id: string, name: string, price: number, transmission: Transmission, bodyType: BodyType, media: Array<{ url: string, isCover: boolean }> }> } };


export const CreateCarRentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCarRent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCarRent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"rent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLocation"}},{"kind":"Field","name":{"kind":"Name","value":"returnLocation"}},{"kind":"Field","name":{"kind":"Name","value":"carInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateCarRentMutation, CreateCarRentMutationVariables>;
export const GetCarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"carId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"carId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"carId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"steering"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isCover"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCarQuery, GetCarQueryVariables>;
export const GetCarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCars"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Brand"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bodyType"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BodyType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"steering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Steering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transmission"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Transmission"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"color"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Color"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCars"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"brand"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand"}}},{"kind":"Argument","name":{"kind":"Name","value":"bodyType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bodyType"}}},{"kind":"Argument","name":{"kind":"Name","value":"steering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"steering"}}},{"kind":"Argument","name":{"kind":"Name","value":"transmission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transmission"}}},{"kind":"Argument","name":{"kind":"Name","value":"color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"color"}}},{"kind":"Argument","name":{"kind":"Name","value":"minPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"bodyType"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isCover"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCarsQuery, GetCarsQueryVariables>;