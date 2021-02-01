import { gql } from 'graphql-request'
import { client } from '../lib/client'
import { Image } from 'react-datocms'
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'
import { useQuerySubscription } from 'react-datocms'
import Head from 'next/head'

import Layout from '../components/layout'
import styles from '../styles/article.module.css'

export default function Home({ subscription, preview }) {
  const { data: { post } } = useQuerySubscription(subscription)
  if (!post) return null

  return (
    <Layout previewMode={preview}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <section className="bg-white shadow-md pt-12 p-8 pb-10 mb-20 rounded">
        <h1 className="text-5xl text-center font-bold">{post.title}</h1>
        <time className="block text-center py-3 text-gray-400">{format(parseISO(post._createdAt), 'MMMM do yyyy')}</time>
        <Image 
          className="w-16 h-16 mx-auto my-4 rounded-full border-4 border-blue-500" 
          data={post.author.avatar.responsiveImage} 
        />
        <article className={`${styles.post} max-w-screen-md mx-auto py-12`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const query = gql`
  {
    allPosts {
      slug
    }
  } 
`
  const data = await client(query)

  const paths = data?.allPosts.map(post => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params, preview }) {
  const queryStr = `query getPost($slug: String!) { 
    post(filter: { slug: { eq: $slug }}) {
      id
      slug
      title
      author {
        avatar {
          responsiveImage(
            imgixParams: {w: "64", h: "64"}
          ) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            bgColor
            base64
          }
        }
        name
      }
      content(markdown: true)
      _createdAt
    }
  } `

  const query = gql`${queryStr}`

  return {
    props: {
      subscription: preview
      ? {
        query: queryStr,
        preview,
        initialData: await client(query, { slug: params.slug }, preview),
        variables: { slug: params.slug },
        token: process.env.NEXT_API_TOKEN
      }
      : {
        enabled: false,
        initialData: await client(query, { slug: params.slug }, preview)
      },
      preview: preview ?? null
    },
  }
}