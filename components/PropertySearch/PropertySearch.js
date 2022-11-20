import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import queryString from "query-string"
import { Pagination } from "./Pagination"
import { Results } from "./Results"

export const PropertySearch = () => {
  const [properties, setProperties] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const pageSize = 3
  const router = useRouter()

  // handle search.
  const search = async () => {
    const { page } = queryString.parse(window.location.search)

    const response = await fetch(`/api/search`,{
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || 1 ),
      }),
    })
    const data = await response.json()
    console.log(data)
    setProperties(data.properties)
    setTotalResults(data.total)
  }
  // Load search results on page load.
  useEffect(() => {
    search();
  }, []);

  const handlePageClick = async (pageNumber) => {
    await router.push(`${router.query.slug.join("/")}?page=${pageNumber}`,null, {shallow: true,})
    search()
  }




  return (
  <div>
    <Results properties={properties} />
    <Pagination onPageClick={handlePageClick} totalPages={Math.ceil(totalResults / pageSize)} />
  </div>
  )
}
