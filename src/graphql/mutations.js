/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
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
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
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
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
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
export const createProduit = /* GraphQL */ `
  mutation CreateProduit(
    $input: CreateProduitInput!
    $condition: ModelProduitConditionInput
  ) {
    createProduit(input: $input, condition: $condition) {
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
export const updateProduit = /* GraphQL */ `
  mutation UpdateProduit(
    $input: UpdateProduitInput!
    $condition: ModelProduitConditionInput
  ) {
    updateProduit(input: $input, condition: $condition) {
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
export const deleteProduit = /* GraphQL */ `
  mutation DeleteProduit(
    $input: DeleteProduitInput!
    $condition: ModelProduitConditionInput
  ) {
    deleteProduit(input: $input, condition: $condition) {
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
