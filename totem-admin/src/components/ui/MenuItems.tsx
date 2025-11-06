"use client"

// MenuItems: simple navigation links (no external navigation-menu dependency)
import { Link } from "react-router-dom"


export function NavigationMenuDemo() {
  return (
    <nav className="flex flex-wrap gap-2 items-center">
      <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        Home
      </Link>
      <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        Docs
      </Link>
      <Link to="/docs/installation" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        Installation
      </Link>
      <Link to="/docs/primitives/typography" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        Typography
      </Link>
    </nav>
  )
}

// simple demo links rendered above
