import {
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

import { ThemeToggle } from "~/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Skeleton } from "~/components/ui/skeleton";
import { useFavorites } from "~/hooks/use-favorites";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "~/hooks/use-queries";
import { cn } from "~/lib/utils";
import { getSession } from "~/utils/auth";

const navLinkClassName = ({
  isActive,
}: {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}) =>
  cn(
    "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
    isActive && "bg-muted text-foreground"
  );

const mobileNavLinkClassName = ({
  isActive,
}: {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}) =>
  cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
    isActive && "bg-muted text-foreground"
  );

export function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!getSession();
  const { ids } = useFavorites();
  const { data: user, isPending } = useCurrentUserQuery();
  const logoutMutation = useLogoutMutation();
  const displayUser = user ?? getSession();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate("/auth"),
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <NavLink
          to="/"
          end
          className="font-heading text-base font-semibold tracking-tight"
        >
          Shop
        </NavLink>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={navLinkClassName}>
            <PackageIcon />
            Products
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/favorites" className={navLinkClassName}>
              <HeartIcon />
              Favorites
              {ids.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({ids.length})
                </span>
              )}
            </NavLink>
          )}

          <ThemeToggle />

          {isLoggedIn ? (
            <div className="ml-1 flex items-center gap-2">
              {isPending && !displayUser ? (
                <Skeleton className="h-8 w-28" />
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Avatar size="sm">
                    {displayUser?.image ? (
                      <AvatarImage
                        src={displayUser.image}
                        alt={displayUser.firstName ?? displayUser.username}
                      />
                    ) : null}
                    <AvatarFallback>
                      {(displayUser?.firstName?.[0] ??
                        displayUser?.username?.[0] ??
                        "U"
                      ).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-32 truncate text-sm font-medium">
                    {displayUser?.firstName ?? displayUser?.username}
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOutIcon />
                <span className="hidden md:inline">Log out</span>
              </Button>
            </div>
          ) : (
            <NavLink to="/auth" className={navLinkClassName}>
              <LogInIcon />
              Login
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Open menu" />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                <SheetClose
                  render={
                    <NavLink to="/" end className={mobileNavLinkClassName} />
                  }
                >
                  <PackageIcon className="size-4" />
                  Products
                </SheetClose>

                {isLoggedIn && (
                  <SheetClose
                    render={
                      <NavLink to="/favorites" className={mobileNavLinkClassName} />
                    }
                  >
                    <HeartIcon className="size-4" />
                    Favorites
                    {ids.length > 0 && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {ids.length}
                      </span>
                    )}
                  </SheetClose>
                )}

                {isLoggedIn ? (
                  <>
                    {displayUser && (
                      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                        <Avatar size="sm">
                          {displayUser.image ? (
                            <AvatarImage
                              src={displayUser.image}
                              alt={
                                displayUser.firstName ?? displayUser.username
                              }
                            />
                          ) : null}
                          <AvatarFallback>
                            {(displayUser.firstName?.[0] ??
                              displayUser.username?.[0] ??
                              "U"
                            ).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-sm font-medium">
                          {displayUser.firstName ?? displayUser.username}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-3"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOutIcon className="size-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <SheetClose
                    render={
                      <NavLink to="/auth" className={mobileNavLinkClassName} />
                    }
                  >
                    <LogInIcon className="size-4" />
                    Login
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
