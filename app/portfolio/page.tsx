"use client";

import React, { Suspense } from "react";
import ServicesContent from "./ServicesContent";

function Services() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  );
}

export default Services;