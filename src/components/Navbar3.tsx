import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Box,
  Building2,
  ChevronRight,
  FileText,
  Heart,
  Home,
  MapPin,
  Menu,
  Phone,
  Sofa,
  Trash2,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface PrestationLink {
  title: string;
  icon: string;
  href: string;
}

const ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  building: Building2,
  "truck-delivery": Truck,
  truck: Truck,
  box: Box,
  sofa: Sofa,
  heart: Heart,
  trash: Trash2,
  "file-description": FileText,
  home: Home,
};

interface Navbar3Props {
  currentPath: string;
  logoSrc: string;
  brandName: string;
  phone: string;
  phoneLink: string;
  services: PrestationLink[];
  regionalCities: PrestationLink[];
  longDistanceRoutes: PrestationLink[];
  className?: string;
}

const mobileMenuTransition = { duration: 0.22, ease: [0.32, 0.72, 0, 1] as const };

const mobilePanelVariants = {
  initial: (direction: number) => ({ x: direction === 0 ? 0 : direction > 0 ? "100%" : "-100%" }),
  animate: { x: 0 },
  exit: (direction: number) => ({ x: direction === 0 ? 0 : direction > 0 ? "-100%" : "100%" }),
};

function PrestationRow({ title, icon, href }: PrestationLink) {
  const Icon = ICONS[icon] ?? MapPin;
  return (
    <a
      href={href}
      className="group flex items-center gap-2.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-foreground/70 transition-colors group-hover:bg-border">
        <Icon className="size-3.5" aria-hidden="true" />
      </span>
      <span>{title}</span>
    </a>
  );
}

const Navbar3 = ({
  currentPath,
  logoSrc,
  brandName,
  phone,
  phoneLink,
  services,
  regionalCities,
  longDistanceRoutes,
  className,
}: Navbar3Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<"prestations" | null>(null);
  const [menuDirection, setMenuDirection] = useState(0);

  const isActive = (href: string) => {
    const path = href.split("#")[0] || "/";
    return path === currentPath || (path !== "/" && currentPath.startsWith(path));
  };
  const isPrestationsActive = ["/prestations", "/services", "/lieu-intervention"].some(isActive);

  const openSubmenu = () => {
    setMenuDirection(1);
    setSubmenu("prestations");
  };

  const closeSubmenu = () => {
    setMenuDirection(-1);
    setSubmenu(null);
  };

  const toggleMobileMenu = () => {
    if (open) {
      setMenuDirection(0);
      setOpen(false);
      setSubmenu(null);
      return;
    }
    setMenuDirection(0);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const docEl = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = docEl.style.overflow;
    body.style.overflow = "hidden";
    docEl.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBodyOverflow;
      docEl.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-4 py-0 sm:px-6">
        <a href="/" className="shrink-0 py-3 transition-opacity hover:opacity-80" aria-label={brandName}>
          <img src={logoSrc} alt={brandName} className="h-10 w-auto" loading="eager" decoding="async" />
        </a>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={cn(
                  "relative flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                  isActive("/") ? "bg-primary/8 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                Accueil
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(isPrestationsActive && "bg-primary/8 text-primary")}
              >
                Prestations
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex items-start divide-x divide-border p-5">
                  <div className="w-max pr-6">
                    <div className="mb-3 flex items-center justify-between gap-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Nos services
                      </p>
                      <a href="/services" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Voir tout
                      </a>
                    </div>
                    <ul className="space-y-0.5">
                      {services.map((s) => (
                        <li key={s.href}>
                          <PrestationRow {...s} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-max px-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Occitanie
                    </p>
                    <ul>
                      {regionalCities.map((c) => (
                        <li key={c.href}>
                          <PrestationRow {...c} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-max pl-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Longue distance
                    </p>
                    <ul>
                      {longDistanceRoutes.map((r) => (
                        <li key={r.href}>
                          <PrestationRow {...r} />
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/prestations"
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                    >
                      Toutes les prestations
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { label: "Galerie", href: "/galerie" },
              { label: "Avis", href: "/reviews" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  href={href}
                  className={cn(
                    "relative flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                    isActive(href) ? "bg-primary/8 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phoneLink}`}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            {phone}
          </a>
          <Button asChild>
            <a href="/devis">
              Devis gratuit
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Button variant="outline" size="icon" aria-label="Menu principal" aria-expanded={open} onClick={toggleMobileMenu}>
            {!open && <Menu className="size-4" aria-hidden="true" />}
            {open && <X className="size-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 top-16.25 z-40 flex flex-col overflow-hidden border-t border-border bg-background lg:hidden"
          >
            {submenu && (
              <div className="relative z-10 shrink-0 border-b border-border bg-background px-4 py-3">
                <Button variant="outline" onClick={closeSubmenu}>
                  <ChevronRight className="size-4 rotate-180" aria-hidden="true" />
                  Retour
                </Button>
              </div>
            )}
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="sync" custom={menuDirection} initial={false}>
                <motion.div
                  key={submenu ?? "root"}
                  custom={menuDirection}
                  variants={mobilePanelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={mobileMenuTransition}
                  className="absolute inset-0 flex h-full w-full flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain bg-background will-change-transform"
                >
                  {!submenu && (
                    <>
                      <a
                        href="/"
                        className={cn(
                          "border-b border-border px-6 py-5 text-[0.95rem] font-medium",
                          isActive("/") ? "bg-primary/10 text-primary" : "text-foreground/80"
                        )}
                      >
                        Accueil
                      </a>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center border-b border-border px-6 py-5 text-left text-[0.95rem] font-medium transition-colors hover:bg-muted",
                          isPrestationsActive ? "bg-primary/10 text-primary" : "text-foreground/80"
                        )}
                        onClick={openSubmenu}
                      >
                        <span className="flex-1">Prestations</span>
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </button>
                      {[
                        { label: "Galerie", href: "/galerie" },
                        { label: "Avis", href: "/reviews" },
                        { label: "Contact", href: "/contact" },
                      ].map(({ label, href }) => (
                        <a
                          key={href}
                          href={href}
                          className={cn(
                            "border-b border-border px-6 py-5 text-[0.95rem] font-medium",
                            isActive(href) ? "bg-primary/10 text-primary" : "text-foreground/80"
                          )}
                        >
                          {label}
                        </a>
                      ))}
                      <div className="mx-6 mt-auto flex flex-col gap-3 py-10">
                        <a
                          href={`tel:${phoneLink}`}
                          className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground"
                        >
                          <Phone className="size-4 text-primary" aria-hidden="true" />
                          {phone}
                        </a>
                        <a
                          href="/devis"
                          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm"
                        >
                          Devis gratuit
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </>
                  )}

                  {submenu === "prestations" && (
                    <>
                      <div className="px-6 pb-2 pt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Nos services
                      </div>
                      {services.map((s) => (
                        <a key={s.href} href={s.href} className="flex items-center gap-3 border-b border-border px-6 py-4 text-sm text-foreground/80">
                          {(() => {
                            const Icon = ICONS[s.icon] ?? MapPin;
                            return <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />;
                          })()}
                          {s.title}
                        </a>
                      ))}

                      <div className="px-6 pb-2 pt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Occitanie
                      </div>
                      {regionalCities.map((c) => (
                        <a key={c.href} href={c.href} className="flex items-center gap-3 border-b border-border px-6 py-4 text-sm text-foreground/80">
                          {(() => {
                            const Icon = ICONS[c.icon] ?? MapPin;
                            return <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />;
                          })()}
                          {c.title}
                        </a>
                      ))}

                      <div className="px-6 pb-2 pt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Longue distance
                      </div>
                      {longDistanceRoutes.map((r) => (
                        <a key={r.href} href={r.href} className="flex items-center gap-3 border-b border-border px-6 py-4 text-sm text-foreground/80">
                          {(() => {
                            const Icon = ICONS[r.icon] ?? MapPin;
                            return <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />;
                          })()}
                          {r.title}
                        </a>
                      ))}

                      <a
                        href="/prestations"
                        className="mx-6 my-8 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm"
                      >
                        Toutes les prestations
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Navbar3 };
