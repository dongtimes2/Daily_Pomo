import { render, RenderOptions } from "@testing-library/react";

import { Providers } from "@/app/providers";

const customRender = (ui: React.ReactNode, options?: RenderOptions) => render(ui, { wrapper: Providers, ...options });

export { customRender as render };
export { screen } from "@testing-library/react";
