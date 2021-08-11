import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Main = styled.main`
  color: #232129;
  font-family: -apple-system, Roboto, sans-serif, serif;
  padding: 96px;
`
const Heading = styled.h1`
  margin-bottom: 64px;
  margin-top: 0;
  max-width: 320px;
`
const Paragraph = styled.p`
  margin-bottom: 48px;
`
const Code = styled.code`
  background-color: #FFF4DB;
  border-radius: 4;
  color: #8A6534;
  font-size: 1.25rem;
  padding: 4px;
`

const NotFoundPage = () => {
  return (
    <Main>
      <title>Not found</title>
      <Heading>Page not found</Heading>
      <Paragraph>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <Code>src/pages/</Code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </Paragraph>
    </Main>
  )
}

export default NotFoundPage
