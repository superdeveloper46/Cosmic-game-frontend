import React from "react"

import { Button, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomeButton = () => {
  return (
    <Link to="/">
      <Button 
        className="rounded-circle m-2 p-0"
        style={{
          border: 0,
          background: 'none',
          width: '80px',
          height: '80px',
        }}
      >
        <Image src="/images/v2/game-ui/Home.png" fluid/>
      </Button>
    </Link>
  )
}

export default HomeButton