// React con el nombre que dejo esbuild: el juego usa i.default.createElement
// (el modulo en .default) e i.useState (las exportaciones copiadas arriba).
import React from "react";

export const i = { ...React, default: React };
