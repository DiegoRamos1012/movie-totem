"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/movies", label: "Filmes" },
  { to: "/screenings", label: "Sessões" },
  { to: "/theaters", label: "Salas" },
  { to: "/tickets", label: "Ingressos" },
  { to: "/snacks", label: "Alimentos" },
  { to: "/admin", label: "Administração" },
];

export function Navbar() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center justify-center w-full bg-transparent text-white px-3 py-2">
        {items.flatMap((item, idx) => {
          const elems = [
            <NavigationMenu.Item key={item.to}>
              <NavigationMenu.Link asChild>
                <Link
                  to={item.to}
                  className="text-sm font-medium text-white-800"
                >
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>,
          ];

          if (idx < items.length - 1) {
            elems.push(
              <span
                key={`sep-${idx}`}
                aria-hidden
                className="mx-2 text-sm text-white-500"
              >
                |
              </span>
            );
          }

          return elems;
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
