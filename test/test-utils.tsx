import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";

type TestProvidersProps = {
  children: React.ReactNode;
  routerProps?: MemoryRouterProps;
};

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function TestProviders({
  children,
  routerProps,
}: TestProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    routerProps?: MemoryRouterProps;
  }
) {
  const { routerProps, ...renderOptions } = options ?? {};

  return render(ui, {
  wrapper: ({ children }) => (
      <TestProviders routerProps={routerProps}>{children}</TestProviders>
    ),
    ...renderOptions,
  });
}
