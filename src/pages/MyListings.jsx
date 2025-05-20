import { useLoaderData } from "react-router"
import useAuth from "../contexts/AuthContext"

function MyListings() {
  const { user } = useAuth()
  const myListings = useLoaderData().filter((listing) => listing.userEmail === user.email)

  console.log(myListings)

  return (
    <div>MyListings</div>
  )
}

export default MyListings