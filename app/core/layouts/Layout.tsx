import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"
import { Navbar } from "../components/Navbar"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-experiment"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Box as="main" py={4} px={8}>
        {children}
      </Box>
    </>
  )
}

export default Layout
