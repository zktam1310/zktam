import React from "react"

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  let current_year: any = new Date()
  current_year = current_year.getFullYear()
  return (
    <>
      <main className="main">{children}</main>
      <footer className="footer">
        {current_year} 	&#169; the streets, alleys, corners of the bars
      </footer>
    </>
  )
}