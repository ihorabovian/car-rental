/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCar($carId: String!) {\n    getCar(carId: $carId) {\n      data {\n        id\n        name\n        brand\n        price\n        location\n        color\n        bodyType\n        steering\n        transmission\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n": typeof types.GetCarDocument,
    "\n  query GetCars(\n    $search: String\n    $brand: [Brand!]\n    $bodyType: [BodyType!]\n    $steering: [Steering!]\n    $transmission: [Transmission!]\n    $color: [Color!]\n    $minPrice: Float\n    $maxPrice: Float\n    $startDate: Float\n    $endDate: Float\n    $limit: Float\n  ) {\n    getCars(\n      search: $search\n      brand: $brand\n      bodyType: $bodyType\n      steering: $steering\n      transmission: $transmission\n      color: $color\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n      startDate: $startDate\n      endDate: $endDate\n      limit: $limit\n    ) {\n      data {\n        id\n        name\n        price\n        transmission\n        bodyType\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n": typeof types.GetCarsDocument,
};
const documents: Documents = {
    "\n  query GetCar($carId: String!) {\n    getCar(carId: $carId) {\n      data {\n        id\n        name\n        brand\n        price\n        location\n        color\n        bodyType\n        steering\n        transmission\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n": types.GetCarDocument,
    "\n  query GetCars(\n    $search: String\n    $brand: [Brand!]\n    $bodyType: [BodyType!]\n    $steering: [Steering!]\n    $transmission: [Transmission!]\n    $color: [Color!]\n    $minPrice: Float\n    $maxPrice: Float\n    $startDate: Float\n    $endDate: Float\n    $limit: Float\n  ) {\n    getCars(\n      search: $search\n      brand: $brand\n      bodyType: $bodyType\n      steering: $steering\n      transmission: $transmission\n      color: $color\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n      startDate: $startDate\n      endDate: $endDate\n      limit: $limit\n    ) {\n      data {\n        id\n        name\n        price\n        transmission\n        bodyType\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n": types.GetCarsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCar($carId: String!) {\n    getCar(carId: $carId) {\n      data {\n        id\n        name\n        brand\n        price\n        location\n        color\n        bodyType\n        steering\n        transmission\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCar($carId: String!) {\n    getCar(carId: $carId) {\n      data {\n        id\n        name\n        brand\n        price\n        location\n        color\n        bodyType\n        steering\n        transmission\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCars(\n    $search: String\n    $brand: [Brand!]\n    $bodyType: [BodyType!]\n    $steering: [Steering!]\n    $transmission: [Transmission!]\n    $color: [Color!]\n    $minPrice: Float\n    $maxPrice: Float\n    $startDate: Float\n    $endDate: Float\n    $limit: Float\n  ) {\n    getCars(\n      search: $search\n      brand: $brand\n      bodyType: $bodyType\n      steering: $steering\n      transmission: $transmission\n      color: $color\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n      startDate: $startDate\n      endDate: $endDate\n      limit: $limit\n    ) {\n      data {\n        id\n        name\n        price\n        transmission\n        bodyType\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCars(\n    $search: String\n    $brand: [Brand!]\n    $bodyType: [BodyType!]\n    $steering: [Steering!]\n    $transmission: [Transmission!]\n    $color: [Color!]\n    $minPrice: Float\n    $maxPrice: Float\n    $startDate: Float\n    $endDate: Float\n    $limit: Float\n  ) {\n    getCars(\n      search: $search\n      brand: $brand\n      bodyType: $bodyType\n      steering: $steering\n      transmission: $transmission\n      color: $color\n      minPrice: $minPrice\n      maxPrice: $maxPrice\n      startDate: $startDate\n      endDate: $endDate\n      limit: $limit\n    ) {\n      data {\n        id\n        name\n        price\n        transmission\n        bodyType\n        media {\n          url\n          isCover\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;