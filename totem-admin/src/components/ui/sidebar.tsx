"use client";

import * as React from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "w-64 shrink-0 border-r bg-sidebar p-4 text-sidebar-foreground shadow-sm",
        "flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ title = "Cinemania" }: { title?: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-10 w-10 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
        CT
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">
          Painel administrativo
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  to,
  children,
  className,
  ...props
}: NavLinkProps & { to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          className
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

function SidebarFooter({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-auto text-xs text-muted-foreground">{children}</div>
  );
}

export { Sidebar, SidebarItem, SidebarHeader, SidebarFooter };
