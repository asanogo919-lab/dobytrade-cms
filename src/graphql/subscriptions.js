/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onCreateArticle(filter: $filter) {
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
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onUpdateArticle(filter: $filter) {
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
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
    onDeleteArticle(filter: $filter) {
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
export const onCreateProduit = /* GraphQL */ `
  subscription OnCreateProduit($filter: ModelSubscriptionProduitFilterInput) {
    onCreateProduit(filter: $filter) {
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
export const onUpdateProduit = /* GraphQL */ `
  subscription OnUpdateProduit($filter: ModelSubscriptionProduitFilterInput) {
    onUpdateProduit(filter: $filter) {
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
export const onDeleteProduit = /* GraphQL */ `
  subscription OnDeleteProduit($filter: ModelSubscriptionProduitFilterInput) {
    onDeleteProduit(filter: $filter) {
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
