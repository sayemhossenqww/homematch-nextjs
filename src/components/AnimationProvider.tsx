"use client";

import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function AnimationProvider() {
  useGSAPAnimations();
  return null; // renders nothing — purely triggers animations
}
