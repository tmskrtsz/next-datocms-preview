import { gql } from 'graphql-request'
import { client } from '../lib/client'
import Link from 'next/link'
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'
import { Image } from 'react-datocms'

import Layout from '../components/layout'

export default function Home({ data }) {
  return (
    <Layout>
      <div className="flex flex-wrap">
        {data.map(post => (
          <div className="w-1/2 p-4" key={post.id}>
            <Link href={`/${post.slug}`}>
              <a className="bg-white hover:bg-gray-50 block rounded-md shadow-md p-4">
                <article>
                  {post.banner ? <Image className="rounded" data={post.banner.responsiveImage} /> : null}
                  <time className="py-4 block text-gray-400">{format(parseISO(post._createdAt), 'MMMM do yyyy')}</time>
                  <h3 className="text-3xl font-bold">{post.title}</h3>
                </article>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {

  const query = gql`
    {
      allPosts {
        id
        slug
        title
        _createdAt
        banner {
          responsiveImage(
            imgixParams: { maxW: 480 }
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
      }
    } 
  `

  const data = await client(query)

  return {
    props: { 
      data: data?.allPosts ?? []
    },
  }
}