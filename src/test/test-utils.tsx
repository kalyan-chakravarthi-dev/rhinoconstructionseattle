import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface WrapperOptions {
  route?: string;
  routerProps?: MemoryRouterProps;
}

function createWrapper({ route = "/", routerProps }: WrapperOptions = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={[route]} {...routerProps}>
            {children}
          </MemoryRouter>
        </I18nextProvider>
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: WrapperOptions & Omit<RenderOptions, "wrapper">
) {
  const { route, routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ route, routerProps }),
    ...renderOptions,
  });
}

export { render };
export { default as userEvent } from "@testing-library/user-event";
export { screen, within, waitFor } from "@testing-library/react";
