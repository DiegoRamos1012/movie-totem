"use client";

import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function ProfileButton() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Link to="/profile">
      <Button variant="ghost" className="text-white hover:bg-white/5">
        Perfil
      </Button>
    </Link>
  );
}
