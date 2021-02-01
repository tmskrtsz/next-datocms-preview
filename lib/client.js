import { GraphQLClient } from 'graphql-request'

export async function client(query, vars = {}, preview) {
  const endpoint = preview 
  ? 'https://graphql.datocms.com/preview'
  : 'https://graphql.datocms.com/'


  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_API_TOKEN}`
    }
  })

  try {
    const data = await graphQLClient.request(query, vars)

    return data
  } catch (e) {
    console.log(e)
  }
}