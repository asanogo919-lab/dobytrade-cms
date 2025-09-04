/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      titre
      contenu
      produitId
      statut
      createdAt
      validatedAt
      publishedAt
      produit {
        id
        nom
        description
        prix
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titre
        contenu
        produitId
        statut
        createdAt
        validatedAt
        publishedAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduit = /* GraphQL */ `
  query GetProduit($id: ID!) {
    getProduit(id: $id) {
      id
      nom
      description
      prix
      articles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProduits = /* GraphQL */ `
  query ListProduits(
    $filter: ModelProduitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProduits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nom
        description
        prix
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const articlesByProduitId = /* GraphQL */ `
  query ArticlesByProduitId(
    $produitId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articlesByProduitId(
      produitId: $produitId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        titre
        contenu
        produitId
        statut
        createdAt
        validatedAt
        publishedAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
