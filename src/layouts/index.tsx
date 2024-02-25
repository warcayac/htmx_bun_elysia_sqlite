export default function Layout({ children } : { children: JSX.Element }) {
  return (
    <>
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
        <link href="public/style.css" rel="stylesheet" type="text/css" />
      </head>
      
      <body class="bg-gray-800">
        {children}
      </body>
    </>
  )
}