import React from 'react'
import Link from 'next/link'

function Layout ({ children, previewMode }) {

  return (
    <>
    {previewMode ? (
      <div className="py-4 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-md text-green-400">Preview Enabled</h3>
            <a
              href="/api/exit-preview"
              className="bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold block p-2 px-3"
            >
              Exit Preview
            </a>
          </div>
        </div>
      </div>
    ) : null}
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mt-12 mb-4">
          <Link href="/">
              <a className="inline-block">
                <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  My Site
                </h2>
              </a>
          </Link>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout