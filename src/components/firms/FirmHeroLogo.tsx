"use client";

import { useState } from "react";

interface Props {
  src: string;
  name: string;
}

export default function FirmHeroLogo({ src, name }: Props) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <span style={{ fontSize: 18, fontWeight: 900, color: "#1a2a3a" }}>
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={{ width: 52, height: 52, objectFit: "contain" }}
      onError={() => setErr(true)}
    />
  );
}
