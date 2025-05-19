import { useLoaderData } from "react-router"

function AddListing() {
    const featuredData = useLoaderData()
    console.log(featuredData)
  return (
    <div>AddListing</div>
  )
}

export default AddListing