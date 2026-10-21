(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5061],
  {
    50065: function (e, t, a) {
      (Promise.resolve().then(a.bind(a, 12228)),
        Promise.resolve().then(a.t.bind(a, 65878, 23)),
        Promise.resolve().then(a.t.bind(a, 72972, 23)),
        Promise.resolve().then(a.bind(a, 73446)),
        Promise.resolve().then(a.bind(a, 20015)),
        Promise.resolve().then(a.bind(a, 14345)),
        Promise.resolve().then(a.bind(a, 21201)),
        Promise.resolve().then(a.bind(a, 72397)),
        Promise.resolve().then(a.bind(a, 66596)),
        Promise.resolve().then(a.bind(a, 38447)),
        Promise.resolve().then(a.bind(a, 13732)),
        Promise.resolve().then(a.bind(a, 9778)),
        Promise.resolve().then(a.bind(a, 40710)));
    },
    99376: function (e, t, a) {
      "use strict";
      var s = a(35475);
      (a.o(s, "permanentRedirect") &&
        a.d(t, {
          permanentRedirect: function () {
            return s.permanentRedirect;
          },
        }),
        a.o(s, "redirect") &&
          a.d(t, {
            redirect: function () {
              return s.redirect;
            },
          }),
        a.o(s, "usePathname") &&
          a.d(t, {
            usePathname: function () {
              return s.usePathname;
            },
          }),
        a.o(s, "useRouter") &&
          a.d(t, {
            useRouter: function () {
              return s.useRouter;
            },
          }),
        a.o(s, "useSearchParams") &&
          a.d(t, {
            useSearchParams: function () {
              return s.useSearchParams;
            },
          }));
    },
    67442: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return l;
        },
      });
      var s = a(57437),
        r = a(93448);
      function l(e) {
        let {
          children: t,
          className: a,
          delay: l = 0,
          direction: n = "up",
        } = e;
        return (0, s.jsx)("div", {
          className: (0, r.cn)(
            "up" === n
              ? "animate-slide-up"
              : "left" === n
                ? "animate-slide-in-left"
                : "right" === n
                  ? "animate-slide-in-right"
                  : "animate-fade-in",
            a,
          ),
          style: {
            animationDelay: "".concat(l, "ms"),
            animationFillMode: "both",
          },
          children: t,
        });
      }
    },
    73446: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return u;
        },
      });
      var s = a(57437),
        r = a(44971),
        l = a(33145),
        n = a(27648),
        i = a(48055),
        c = a(31338),
        o = a(82741),
        d = a(53907),
        x = a(93448),
        m = a(38706);
      function u(e) {
        let { car: t, index: a } = e,
          u = t.images[0] || "/images/cars/placeholder.jpg",
          h = (0, m.T)("common"),
          p = (0, m.T)("booking");
        return (0, s.jsxs)("div", {
          className:
            "card group overflow-hidden hover:-translate-y-1 transition-transform duration-200",
          children: [
            (0, s.jsxs)("div", {
              className:
                "relative h-44 sm:h-52 md:h-56 bg-white overflow-hidden",
              children: [
                (0, s.jsx)("div", {
                  className: "absolute inset-[10%]",
                  children: (0, s.jsx)("div", {
                    className: "relative w-full h-full",
                    children: (0, s.jsx)(l.default, {
                      src: u,
                      alt: h("carImageAlt", { name: t.name }),
                      fill: !0,
                      priority: void 0 !== a && a < 3,
                      className:
                        "object-contain transition-transform duration-500 group-hover:scale-105",
                      sizes:
                        "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                    }),
                  }),
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent",
                }),
                t.featured &&
                  (0, s.jsx)("div", {
                    className: "absolute top-3 left-3",
                    children: (0, s.jsxs)("span", {
                      className:
                        "badge bg-brand-orange-dark text-white text-xs",
                      children: [
                        (0, s.jsx)(i.Z, { className: "w-3 h-3 mr-1 inline" }),
                        h("popular"),
                      ],
                    }),
                  }),
                !t.available &&
                  (0, s.jsx)("div", {
                    className:
                      "absolute inset-0 bg-black/40 flex items-center justify-center",
                    children: (0, s.jsx)("span", {
                      className:
                        "bg-white text-dark font-semibold px-4 py-2 rounded-full text-sm",
                      children: h("unavailable"),
                    }),
                  }),
                (0, s.jsx)("div", {
                  className: "absolute top-3 right-3",
                  children: (0, s.jsx)("span", {
                    className: "badge bg-brand-blue text-white",
                    children: t.category,
                  }),
                }),
                (0, s.jsx)("div", {
                  className: "absolute bottom-3 left-3",
                  children: (0, s.jsx)("span", {
                    className:
                      "badge bg-yellow-500 text-white text-xs font-bold tracking-wide",
                    children: "Mod\xe8le 2025 et +",
                  }),
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "p-5",
              children: [
                (0, s.jsxs)("div", {
                  className: "mb-3",
                  children: [
                    (0, s.jsx)("h3", {
                      className: "font-bold text-dark text-lg leading-tight",
                      children: t.name,
                    }),
                    (0, s.jsxs)("p", {
                      className: "text-gray-400 text-sm",
                      children: [t.brand, " ", t.model],
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className:
                    "flex items-center flex-wrap gap-3 text-sm text-gray-500 mb-4",
                  children: [
                    (0, s.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, s.jsx)(c.Z, {
                          className: "w-4 h-4 text-brand-blue",
                        }),
                        h("seats", { count: t.seats }),
                      ],
                    }),
                    (0, s.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, s.jsx)(o.Z, {
                          className: "w-4 h-4 text-brand-blue",
                        }),
                        t.fuel,
                      ],
                    }),
                    (0, s.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, s.jsx)(d.Z, {
                          className: "w-4 h-4 text-brand-blue",
                        }),
                        t.transmission.slice(0, 4),
                        ".",
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)("div", {
                  className: "pt-4 border-t border-gray-100",
                  children: [
                    (0, s.jsxs)("div", {
                      className: "flex items-baseline gap-1 mb-3",
                      children: [
                        (0, s.jsx)("span", {
                          className: "text-sm font-bold text-gray-500 mr-1",
                          children: h("aPartirDe"),
                        }),
                        (0, s.jsx)("span", {
                          className: "text-2xl font-bold text-brand-orange",
                          children: (0, x.T4)(t.pricePerDay),
                        }),
                        (0, s.jsx)("span", {
                          className: "text-gray-400 text-sm",
                          children: h("perDay"),
                        }),
                      ],
                    }),
                    (0, s.jsxs)("div", {
                      className: "flex gap-2",
                      children: [
                        (0, s.jsxs)("a", {
                          href: "https://wa.me/"
                            .concat(x.NY.replace(/\D/g, ""), "?text=")
                            .concat(
                              encodeURIComponent(
                                p("waMessage", {
                                  name: t.name,
                                  price: (0, x.T4)(t.pricePerDay),
                                }),
                              ),
                            ),
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "flex items-center justify-center gap-1.5 flex-1 text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 ".concat(
                              t.available
                                ? "bg-green-700 hover:bg-green-800 text-white hover:-translate-y-0.5"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none",
                            ),
                          children: [
                            (0, s.jsx)(r.Z, { className: "w-4 h-4" }),
                            "WhatsApp",
                          ],
                        }),
                        (0, s.jsx)(n.default, {
                          href: "/cars/".concat(t.slug),
                          className:
                            "flex items-center justify-center gap-1.5 flex-1 text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 ".concat(
                              t.available
                                ? "bg-brand-blue text-white hover:bg-brand-blue-light hover:-translate-y-0.5"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none",
                            ),
                          children: h("details"),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
    36825: function (e, t, a) {
      "use strict";
      a.d(t, {
        M: function () {
          return l;
        },
      });
      var s = a(57437),
        r = a(93448);
      function l(e) {
        let { label: t, title: a, subtitle: l, center: n = !0 } = e;
        return (0, s.jsxs)("div", {
          className: (0, r.cn)("mb-12", n && "text-center"),
          children: [
            t &&
              (0, s.jsx)("span", {
                className:
                  "inline-block text-brand-orange-dark font-semibold text-sm uppercase tracking-widest mb-3 animate-slide-up opacity-0",
                style: { animationFillMode: "forwards" },
                children: t,
              }),
            (0, s.jsx)("h2", {
              className: "section-title animate-slide-up opacity-0",
              style: { animationDelay: "100ms", animationFillMode: "forwards" },
              children: a,
            }),
            l &&
              (0, s.jsx)("p", {
                className: (0, r.cn)(
                  "section-subtitle animate-slide-up opacity-0",
                  n && "mx-auto",
                ),
                style: {
                  animationDelay: "200ms",
                  animationFillMode: "forwards",
                },
                children: l,
              }),
          ],
        });
      }
    },
    44971: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return r;
        },
      });
      var s = a(57437);
      function r(e) {
        let { className: t = "w-5 h-5" } = e;
        return (0, s.jsx)("svg", {
          className: t,
          viewBox: "0 0 24 24",
          fill: "currentColor",
          xmlns: "http://www.w3.org/2000/svg",
          children: (0, s.jsx)("path", {
            d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
          }),
        });
      }
    },
    20015: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return o;
        },
      });
      var s = a(57437),
        r = a(27648),
        l = a(88399),
        n = a(25763),
        i = a(67442),
        c = a(38706);
      function o() {
        var e;
        let t = (0, c.T)("aboutSection"),
          a = [
            { value: t("yearsVal"), label: t("years") },
            { value: t("ratingVal"), label: t("rating") },
            { value: t("reviewsVal"), label: t("reviews") },
            { value: t("availabilityVal"), label: t("availability") },
          ];
        return (0, s.jsx)("section", {
          className: "py-16 md:py-24 bg-white",
          children: (0, s.jsx)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: (0, s.jsxs)("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
              children: [
                (0, s.jsxs)(i.Z, {
                  direction: "left",
                  children: [
                    (0, s.jsx)("span", {
                      className:
                        "inline-block text-brand-orange-dark font-semibold text-sm uppercase tracking-widest mb-4",
                      children: t("badge"),
                    }),
                    (0, s.jsxs)("h2", {
                      className:
                        "text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight",
                      children: [
                        t("title").split(",")[0],
                        ",",
                        (0, s.jsx)("br", {}),
                        (0, s.jsx)("span", {
                          className: "gradient-text",
                          children:
                            null === (e = t("title").split(",")[1]) ||
                            void 0 === e
                              ? void 0
                              : e.trim(),
                        }),
                      ],
                    }),
                    (0, s.jsxs)("p", {
                      className: "text-gray-500 leading-relaxed mb-4",
                      children: [
                        (0, s.jsx)("strong", { children: "Lux Time Cars" }),
                        " ",
                        t("desc"),
                      ],
                    }),
                    (0, s.jsx)("p", {
                      className: "text-gray-500 leading-relaxed mb-8",
                      children: t("desc2"),
                    }),
                    (0, s.jsx)("div", {
                      className: "grid grid-cols-2 gap-4 mb-8",
                      children: a.map((e) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: "bg-surface rounded-xl p-4",
                            children: [
                              (0, s.jsx)("p", {
                                className:
                                  "text-2xl font-extrabold text-brand-orange",
                                children: e.value,
                              }),
                              (0, s.jsx)("p", {
                                className: "text-gray-600 text-sm",
                                children: e.label,
                              }),
                            ],
                          },
                          e.label,
                        ),
                      ),
                    }),
                    (0, s.jsxs)(r.default, {
                      href: "/about",
                      className: "btn-secondary inline-flex items-center gap-2",
                      children: [
                        t("cta"),
                        (0, s.jsx)(l.Z, { className: "w-4 h-4" }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)(i.Z, {
                  direction: "right",
                  children: (0, s.jsx)("div", {
                    className: "rounded-2xl overflow-hidden shadow-card-hover",
                    children: (0, s.jsxs)("div", {
                      className: "bg-gray-100 p-3",
                      children: [
                        (0, s.jsxs)("div", {
                          className:
                            "flex items-center gap-2 text-sm text-gray-700 mb-2",
                          children: [
                            (0, s.jsx)(n.Z, {
                              className: "w-4 h-4 text-brand-orange",
                            }),
                            (0, s.jsx)("span", {
                              children: "Inara 02, 44 Rue 01, Casablanca 20470",
                            }),
                          ],
                        }),
                        (0, s.jsx)("iframe", {
                          src: "https://maps.google.com/maps?cid=7661687486121611310&output=embed&hl=fr&z=17",
                          width: "100%",
                          height: "350",
                          style: { border: 0 },
                          allowFullScreen: !0,
                          loading: "lazy",
                          referrerPolicy: "no-referrer-when-downgrade",
                          title: "Lux Time Cars - Casablanca",
                          className: "rounded-xl",
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          }),
        });
      }
    },
    21201: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return x;
        },
      });
      var s = a(57437),
        r = a(44971),
        l = a(27648),
        n = a(36873),
        i = a(69811),
        c = a(93448),
        o = a(67442),
        d = a(38706);
      function x() {
        let e = (0, d.T)("cta");
        return (0, s.jsx)("section", {
          className: "py-16 md:py-24 bg-brand-gradient",
          children: (0, s.jsx)("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
            children: (0, s.jsxs)(o.Z, {
              children: [
                (0, s.jsx)("h2", {
                  className:
                    "text-3xl md:text-5xl font-extrabold text-white mb-4",
                  children: e("title"),
                }),
                (0, s.jsx)("p", {
                  className: "text-white/80 text-lg mb-10 max-w-xl mx-auto",
                  children: e("subtitle"),
                }),
                (0, s.jsxs)("div", {
                  className:
                    "flex flex-col sm:flex-row items-center justify-center gap-4",
                  children: [
                    (0, s.jsxs)(l.default, {
                      href: "/cars",
                      className:
                        "flex items-center gap-2 bg-white text-brand-orange-dark font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                      children: [
                        (0, s.jsx)(n.Z, { className: "w-5 h-5" }),
                        e("cars"),
                      ],
                    }),
                    (0, s.jsxs)("a", {
                      href: "https://wa.me/".concat(c.NY.replace(/\D/g, "")),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className:
                        "flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1",
                      children: [
                        (0, s.jsx)(r.Z, { className: "w-5 h-5" }),
                        e("whatsapp"),
                      ],
                    }),
                    (0, s.jsxs)("a", {
                      href: "tel:".concat(c.UE),
                      className:
                        "flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/30 transition-all duration-300 hover:-translate-y-1",
                      children: [
                        (0, s.jsx)(i.Z, { className: "w-5 h-5" }),
                        c.UE,
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      }
    },
    14345: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return m;
        },
      });
      var s = a(57437),
        r = a(36247),
        l = a(27648),
        n = a(33145),
        i = a(88399),
        c = a(36825),
        o = JSON.parse(
          '[{"id":"berline","name":"Berlines","slug":"Berline","icon":"\uD83D\uDE97","description":"Location de berline \xe0 Casablanca — \xe9l\xe9gance et confort pour vos d\xe9placements professionnels","count":15,"image":"/storage/cars/car-009-0.png","gradient":"from-gray-700 to-gray-900"},{"id":"suv","name":"SUV","slug":"SUV","icon":"\uD83D\uDE99","description":"Location de SUV \xe0 Casablanca — polyvalents, id\xe9aux pour la ville et les sorties en famille","count":8,"image":"/storage/cars/car-022-0.webp","gradient":"from-blue-500 to-blue-700"},{"id":"luxe","name":"Luxe","slug":"Luxe","icon":"\uD83D\uDC8E","description":"Location de voiture de luxe \xe0 Casablanca — prestige, raffinement et conduite d\'exception","count":8,"image":"/storage/cars/car-027-0.webp","gradient":"from-yellow-500 to-yellow-700"},{"id":"familiale","name":"Familiales","slug":"Familiale","icon":"\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66","description":"Location de voiture familiale \xe0 Casablanca — spacieuses et pratiques pour toute la famille","count":2,"image":"/storage/cars/car-029-0.png","gradient":"from-green-500 to-green-700"},{"id":"utilitaire","name":"Utilitaires","slug":"Utilitaire","icon":"\uD83D\uDE90","description":"Location d\'utilitaire \xe0 Casablanca — id\xe9aux pour le transport et les activit\xe9s professionnelles","count":1,"image":"/storage/cars/car-002-0.webp","gradient":"from-orange-500 to-orange-700"}]',
        ),
        d = a(38706);
      function x(e) {
        let { cat: t, index: a, imageScale: c = 1, yShift: o = 0 } = e,
          d = String(a).padStart(2, "0");
        return (0, s.jsx)(r.E.div, {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          transition: { duration: 0.5, delay: (a - 1) * 0.08 },
          children: (0, s.jsx)(l.default, {
            href: "/cars/".concat(t.id),
            className: "block group",
            children: (0, s.jsxs)("div", {
              className:
                "relative h-64 rounded-2xl overflow-hidden shadow-lg bg-white",
              children: [
                (0, s.jsx)("div", {
                  className: "absolute inset-0",
                  style: {
                    transform: "translateY(-"
                      .concat(o, "px) scale(")
                      .concat(c, ")"),
                  },
                  children: (0, s.jsx)("div", {
                    className:
                      "relative w-full h-full transition-transform duration-700 group-hover:scale-105",
                    children: (0, s.jsx)(n.default, {
                      src: t.image,
                      alt: t.description,
                      fill: !0,
                      className: "object-contain object-top",
                      sizes:
                        "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
                    }),
                  }),
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent",
                }),
                (0, s.jsx)("div", { className: "absolute inset-0 bg-white/5" }),
                (0, s.jsx)("div", {
                  className: "absolute inset-0 bg-gradient-to-br ".concat(
                    t.gradient,
                    " opacity-15",
                  ),
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent",
                }),
                (0, s.jsx)("div", {
                  className:
                    "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ".concat(
                      t.gradient,
                    ),
                }),
                (0, s.jsx)("span", {
                  className:
                    "absolute top-3 right-4 text-[36px] font-black text-brand-blue/70 leading-none select-none pointer-events-none",
                  children: d,
                }),
                (0, s.jsxs)("div", {
                  className: "absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8",
                  children: [
                    (0, s.jsx)("h3", {
                      className:
                        "text-white font-black text-lg leading-tight mb-1",
                      children: t.name,
                    }),
                    (0, s.jsx)("p", {
                      className: "text-white/65 text-xs leading-relaxed",
                      children: t.description,
                    }),
                    (0, s.jsxs)("div", {
                      className:
                        "mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/45 group-hover:text-white transition-colors duration-300",
                      children: [
                        "Explorer la cat\xe9gorie",
                        (0, s.jsx)(i.Z, {
                          className:
                            "w-3 h-3 transition-transform duration-300 group-hover:translate-x-1",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      }
      function m() {
        let e = (0, d.T)("categories"),
          t = [
            [0.78, 30],
            [0.78, 30],
            [1.1, 46],
          ],
          a = [
            [0.78, 20],
            [1, 14],
          ];
        return (0, s.jsx)("section", {
          className: "py-16 md:py-24 bg-surface overflow-hidden",
          children: (0, s.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, s.jsx)(c.M, {
                label: e("badge"),
                title: e("title"),
                subtitle: e("subtitle"),
              }),
              (0, s.jsxs)("div", {
                className: "flex flex-col gap-4",
                children: [
                  (0, s.jsx)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                    children: o
                      .slice(0, 3)
                      .map((e, a) =>
                        (0, s.jsx)(
                          x,
                          {
                            cat: e,
                            index: a + 1,
                            imageScale: t[a][0],
                            yShift: t[a][1],
                          },
                          e.id,
                        ),
                      ),
                  }),
                  (0, s.jsx)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: o
                      .slice(3)
                      .map((e, t) =>
                        (0, s.jsx)(
                          x,
                          {
                            cat: e,
                            index: t + 4,
                            imageScale: a[t][0],
                            yShift: a[t][1],
                          },
                          e.id,
                        ),
                      ),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    72397: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return c;
        },
      });
      var s = a(57437),
        r = a(2265),
        l = a(17166),
        n = a(36825),
        i = a(38706);
      function c(e) {
        let { faqs: t } = e,
          a = (0, i.T)("faq"),
          [c, o] = (0, r.useState)(null),
          d =
            t && t.length > 0
              ? t
              : [
                  { q: a("q1"), a: a("a1") },
                  { q: a("q2"), a: a("a2") },
                  { q: a("q3"), a: a("a3") },
                  { q: a("q4"), a: a("a4") },
                  { q: a("q5"), a: a("a5") },
                  { q: a("q6"), a: a("a6") },
                  { q: a("q7"), a: a("a7") },
                ];
        return (0, s.jsx)("section", {
          className: "py-16 md:py-24 bg-surface",
          children: (0, s.jsxs)("div", {
            className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, s.jsx)(n.M, {
                label: a("badge"),
                title: a("title"),
                subtitle: a("subtitle"),
              }),
              (0, s.jsx)("div", {
                className: "space-y-3",
                children: d.map((e, t) => {
                  let a = c === t;
                  return (0, s.jsxs)(
                    "div",
                    {
                      className: "card overflow-hidden",
                      children: [
                        (0, s.jsxs)("button", {
                          onClick: () => o(a ? null : t),
                          className:
                            "w-full flex items-center justify-between p-5 text-left",
                          "aria-expanded": a,
                          children: [
                            (0, s.jsx)("span", {
                              className:
                                "font-semibold text-dark pr-4 text-sm md:text-base",
                              children: e.q,
                            }),
                            (0, s.jsx)(l.Z, {
                              className:
                                "w-5 h-5 flex-shrink-0 transition-transform duration-200 ".concat(
                                  a
                                    ? "rotate-180 text-brand-orange"
                                    : "text-gray-400",
                                ),
                            }),
                          ],
                        }),
                        (0, s.jsx)("div", {
                          className:
                            "grid transition-[grid-template-rows] duration-300 ease-in-out ".concat(
                              a ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            ),
                          children: (0, s.jsx)("div", {
                            className: "overflow-hidden",
                            children: (0, s.jsx)("div", {
                              className:
                                "px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4",
                              children: e.a,
                            }),
                          }),
                        }),
                      ],
                    },
                    t,
                  );
                }),
              }),
            ],
          }),
        });
      }
    },
    66596: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return d;
        },
      });
      var s = a(57437),
        r = a(36247),
        l = a(19150),
        n = a(36873);
      let i = (0, a(95480).Z)("key", [
        [
          "path",
          {
            d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
            key: "g0fldk",
          },
        ],
        ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
        ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }],
      ]);
      var c = a(27648),
        o = a(38706);
      function d() {
        var e;
        let t = (0, o.T)("howItWorks"),
          a = [
            {
              num: "01",
              icon: (0, s.jsx)(l.Z, { className: "w-6 h-6" }),
              title: t("step1Title"),
              desc: t("step1Desc"),
              detail: t("step1Tag"),
              color: "bg-brand-blue",
              border: "border-brand-blue",
              text: "text-brand-blue",
              light: "bg-brand-blue/5",
            },
            {
              num: "02",
              icon: (0, s.jsx)(n.Z, { className: "w-6 h-6" }),
              title: t("step2Title"),
              desc: t("step2Desc"),
              detail: t("step2Tag"),
              color: "bg-brand-orange",
              border: "border-brand-orange",
              text: "text-brand-orange",
              light: "bg-brand-orange/5",
            },
            {
              num: "03",
              icon: (0, s.jsx)(i, { className: "w-6 h-6" }),
              title: t("step3Title"),
              desc: t("step3Desc"),
              detail: t("step3Tag"),
              color: "bg-green-600",
              border: "border-green-600",
              text: "text-green-600",
              light: "bg-green-50",
            },
          ];
        return (0, s.jsx)("section", {
          className: "py-20 md:py-32 bg-white overflow-hidden",
          children: (0, s.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, s.jsxs)("div", {
                className: "max-w-xl mb-16",
                children: [
                  (0, s.jsx)("span", {
                    className:
                      "text-brand-orange-dark font-semibold text-xs uppercase tracking-[0.2em] mb-3 block",
                    children: t("badge"),
                  }),
                  (0, s.jsxs)("h2", {
                    className:
                      "text-4xl md:text-5xl font-extrabold text-dark leading-tight",
                    children: [
                      t("title").split(",")[0],
                      ",",
                      (0, s.jsx)("br", {}),
                      (0, s.jsx)("span", {
                        className: "gradient-text",
                        children:
                          null === (e = t("title").split(",")[1]) ||
                          void 0 === e
                            ? void 0
                            : e.trim(),
                      }),
                    ],
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-14",
                children: a.map((e, t) =>
                  (0, s.jsxs)(
                    r.E.div,
                    {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: !0 },
                      transition: { delay: 0.15 * t, duration: 0.5 },
                      className: "rounded-2xl border-2 "
                        .concat(e.border, " ")
                        .concat(e.light, " p-7 flex flex-col gap-5"),
                      children: [
                        (0, s.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, s.jsx)("span", {
                              className:
                                "text-5xl font-black text-dark/10 leading-none",
                              children: e.num,
                            }),
                            (0, s.jsx)("span", {
                              className: "w-12 h-12 ".concat(
                                e.color,
                                " rounded-xl flex items-center justify-center text-white",
                              ),
                              children: e.icon,
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("h3", {
                              className:
                                "font-bold text-dark text-xl mb-3 leading-snug",
                              children: e.title,
                            }),
                            (0, s.jsx)("p", {
                              className:
                                "text-gray-500 text-sm leading-relaxed",
                              children: e.desc,
                            }),
                          ],
                        }),
                        (0, s.jsx)("div", {
                          className: "mt-auto pt-4 border-t border-current/10",
                          children: (0, s.jsx)("p", {
                            className: "text-xs font-semibold ".concat(e.text),
                            children: e.detail,
                          }),
                        }),
                      ],
                    },
                    e.num,
                  ),
                ),
              }),
              (0, s.jsxs)("div", {
                className: "flex flex-col sm:flex-row gap-4",
                children: [
                  (0, s.jsx)(c.default, {
                    href: "/cars",
                    className:
                      "btn-primary inline-flex items-center justify-center px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px]",
                    children: t("ctaBook"),
                  }),
                  (0, s.jsx)(c.default, {
                    href: "/contact",
                    className:
                      "btn-secondary inline-flex items-center justify-center px-8 py-3.5 w-full sm:w-auto sm:min-w-[240px]",
                    children: t("ctaQuote"),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    38447: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return m;
        },
      });
      var s = a(57437),
        r = a(2265),
        l = a(99376),
        n = a(36247),
        i = a(25763),
        c = a(67189),
        o = a(36873),
        d = a(19150),
        x = a(38706);
      function m() {
        let e = (0, x.T)("search"),
          t = (0, l.useRouter)(),
          a = [
            e("loc1"),
            e("loc2"),
            e("loc3"),
            e("loc4"),
            e("loc5"),
            e("loc6"),
            e("loc7"),
            e("loc8"),
            e("loc9"),
            e("loc10"),
          ],
          m = [
            e("all"),
            "SUV",
            "Berline",
            "Sport",
            "Luxe",
            "Familiale",
            "Utilitaire",
          ],
          [u, h] = (0, r.useState)({
            pickupLocation: e("loc6"),
            dropLocation: e("loc6"),
            startDate: "",
            endDate: "",
            category: e("all"),
          });
        return (0, s.jsx)("section", {
          className: "relative z-20 -mt-12 pb-4",
          children: (0, s.jsx)("div", {
            className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
            children: (0, s.jsxs)(n.E.div, {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className:
                "bg-white rounded-2xl shadow-card-hover p-5 md:p-6 border border-gray-100",
              children: [
                (0, s.jsx)("h2", {
                  className: "text-lg font-bold text-dark mb-5 text-center",
                  children: e("title"),
                }),
                (0, s.jsx)("form", {
                  onSubmit: (a) => {
                    a.preventDefault();
                    let s = new URLSearchParams();
                    (u.category !== e("all") && s.set("category", u.category),
                      u.startDate && s.set("startDate", u.startDate),
                      u.endDate && s.set("endDate", u.endDate),
                      u.pickupLocation && s.set("pickup", u.pickupLocation),
                      u.dropLocation && s.set("drop", u.dropLocation),
                      t.push("/cars?".concat(s.toString())));
                  },
                  children: (0, s.jsxs)("div", {
                    className:
                      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end",
                    children: [
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("label", {
                            htmlFor: "pickup-location",
                            className:
                              "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
                            children: e("pickup"),
                          }),
                          (0, s.jsxs)("div", {
                            className: "relative",
                            children: [
                              (0, s.jsx)(i.Z, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange",
                              }),
                              (0, s.jsx)("select", {
                                id: "pickup-location",
                                value: u.pickupLocation,
                                onChange: (e) =>
                                  h({ ...u, pickupLocation: e.target.value }),
                                className: "input-field pl-9 text-sm py-2.5",
                                children: a.map((e) =>
                                  (0, s.jsx)("option", { children: e }, e),
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("label", {
                            htmlFor: "drop-location",
                            className:
                              "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
                            children: e("dropoff"),
                          }),
                          (0, s.jsxs)("div", {
                            className: "relative",
                            children: [
                              (0, s.jsx)(i.Z, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue",
                              }),
                              (0, s.jsx)("select", {
                                id: "drop-location",
                                value: u.dropLocation,
                                onChange: (e) =>
                                  h({ ...u, dropLocation: e.target.value }),
                                className: "input-field pl-9 text-sm py-2.5",
                                children: a.map((e) =>
                                  (0, s.jsx)("option", { children: e }, e),
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("label", {
                            htmlFor: "start-date",
                            className:
                              "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
                            children: e("startDate"),
                          }),
                          (0, s.jsxs)("div", {
                            className: "relative",
                            children: [
                              (0, s.jsx)(c.Z, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange",
                              }),
                              (0, s.jsx)("input", {
                                id: "start-date",
                                type: "date",
                                value: u.startDate,
                                min: new Date().toISOString().split("T")[0],
                                onChange: (e) =>
                                  h({ ...u, startDate: e.target.value }),
                                className: "input-field pl-9 text-sm py-2.5",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("label", {
                            htmlFor: "end-date",
                            className:
                              "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
                            children: e("endDate"),
                          }),
                          (0, s.jsxs)("div", {
                            className: "relative",
                            children: [
                              (0, s.jsx)(c.Z, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange",
                              }),
                              (0, s.jsx)("input", {
                                id: "end-date",
                                type: "date",
                                value: u.endDate,
                                min:
                                  u.startDate ||
                                  new Date().toISOString().split("T")[0],
                                onChange: (e) =>
                                  h({ ...u, endDate: e.target.value }),
                                className: "input-field pl-9 text-sm py-2.5",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("label", {
                            htmlFor: "car-category",
                            className:
                              "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5",
                            children: e("category"),
                          }),
                          (0, s.jsxs)("div", {
                            className: "relative",
                            children: [
                              (0, s.jsx)(o.Z, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange",
                              }),
                              (0, s.jsx)("select", {
                                id: "car-category",
                                value: u.category,
                                onChange: (e) =>
                                  h({ ...u, category: e.target.value }),
                                className: "input-field pl-9 text-sm py-2.5",
                                children: m.map((e) =>
                                  (0, s.jsx)("option", { children: e }, e),
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsxs)("div", {
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "block text-xs uppercase tracking-wider mb-1.5 select-none",
                            "aria-hidden": "true",
                            children: "\xa0",
                          }),
                          (0, s.jsxs)("button", {
                            type: "submit",
                            className:
                              "btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm",
                            children: [
                              (0, s.jsx)(d.Z, { className: "w-4 h-4" }),
                              e("search"),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        });
      }
    },
    13732: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return d;
        },
      });
      var s = a(57437),
        r = a(33145),
        l = a(27648),
        n = a(24754),
        i = a(88399),
        c = a(38706),
        o = a(36247);
      function d() {
        let e = (0, c.T)("services"),
          t = [
            {
              title: e("transport"),
              tagline: e("transportTagline"),
              href: "/transport",
              image: "/images/PhQYprxsFvXf.webp",
              imageAlt: e("transportImageAlt"),
              badge: "Chauffeur professionnel",
              badgeColor: "bg-brand-blue",
              cta: e("cta"),
              description: e("transportDesc"),
              features: [
                e("transportFeature1"),
                e("transportFeature2"),
                e("transportFeature3"),
                e("transportFeature4"),
              ],
              accent: "brand-blue",
              accentClass: "bg-brand-blue/10 text-brand-blue",
              btnClass: "btn-primary",
            },
            {
              title: e("longTerm"),
              tagline: e("longTermTagline"),
              href: "/location-longue-duree",
              image:
                "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
              imageAlt: e("longTermImageAlt"),
              badge: "De 1 mois \xe0 1 an",
              badgeColor: "bg-brand-orange-dark",
              cta: e("cta"),
              description: e("longTermDesc"),
              features: [
                e("longTermFeature1"),
                e("longTermFeature2"),
                e("longTermFeature3"),
                e("longTermFeature4"),
              ],
              accent: "brand-orange",
              accentClass: "bg-brand-orange/10 text-brand-orange",
              btnClass: "btn-primary",
            },
          ];
        return (0, s.jsx)("section", {
          id: "services",
          className: "py-16 md:py-24 bg-surface",
          children: (0, s.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, s.jsxs)(o.E.div, {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: !0 },
                transition: { duration: 0.5 },
                className: "text-center mb-14",
                children: [
                  (0, s.jsx)("span", {
                    className:
                      "text-brand-orange-dark font-semibold text-xs uppercase tracking-[0.2em] mb-3 block",
                    children: e("badge"),
                  }),
                  (0, s.jsx)("h2", {
                    className: "text-3xl md:text-4xl font-bold text-dark mb-4",
                    children: e("title"),
                  }),
                  (0, s.jsx)("p", {
                    className: "text-gray-600 max-w-xl mx-auto",
                    children: e("subtitle"),
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: t.map((e, t) =>
                  (0, s.jsxs)(
                    o.E.div,
                    {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: !0 },
                      transition: { duration: 0.5, delay: 0.1 * t },
                      className:
                        "bg-white rounded-3xl overflow-hidden shadow-card group hover:shadow-card-hover transition-shadow duration-300 flex flex-col",
                      children: [
                        (0, s.jsxs)("div", {
                          className:
                            "relative h-64 overflow-hidden flex-shrink-0",
                          children: [
                            (0, s.jsx)(r.default, {
                              src: e.image,
                              alt: e.imageAlt,
                              fill: !0,
                              className:
                                "object-cover transition-transform duration-700 group-hover:scale-105",
                              sizes: "(max-width: 1024px) 100vw, 50vw",
                            }),
                            (0, s.jsx)("div", {
                              className:
                                "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent",
                            }),
                            (0, s.jsx)("span", {
                              className: "absolute top-4 left-4 ".concat(
                                e.badgeColor,
                                " text-white text-xs font-bold px-3 py-1.5 rounded-full",
                              ),
                              children: e.badge,
                            }),
                            (0, s.jsxs)("div", {
                              className: "absolute bottom-0 left-0 right-0 p-6",
                              children: [
                                (0, s.jsx)("p", {
                                  className:
                                    "text-white/60 text-xs font-medium uppercase tracking-widest mb-1",
                                  children: e.tagline,
                                }),
                                (0, s.jsx)("h3", {
                                  className:
                                    "text-white text-2xl font-extrabold leading-tight",
                                  children: e.title,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)("div", {
                          className: "p-6 flex flex-col flex-1",
                          children: [
                            (0, s.jsx)("p", {
                              className:
                                "text-gray-500 text-sm leading-relaxed mb-5",
                              children: e.description,
                            }),
                            (0, s.jsx)("ul", {
                              className: "grid grid-cols-2 gap-2 mb-6",
                              children: e.features.map((t) =>
                                (0, s.jsxs)(
                                  "li",
                                  {
                                    className:
                                      "flex items-center gap-2 text-xs text-gray-600",
                                    children: [
                                      (0, s.jsx)("span", {
                                        className:
                                          "w-5 h-5 rounded-full ".concat(
                                            e.accentClass,
                                            " flex items-center justify-center flex-shrink-0",
                                          ),
                                        children: (0, s.jsx)(n.Z, {
                                          className: "w-3 h-3",
                                        }),
                                      }),
                                      t,
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            }),
                            (0, s.jsxs)(l.default, {
                              href: e.href,
                              className: "".concat(
                                e.btnClass,
                                " mt-auto w-full inline-flex items-center justify-center gap-2 py-3",
                              ),
                              children: [
                                e.cta,
                                (0, s.jsx)(i.Z, { className: "w-4 h-4" }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.title,
                  ),
                ),
              }),
            ],
          }),
        });
      }
    },
    9778: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return o;
        },
      });
      var s = a(57437),
        r = a(33145),
        l = a(38706);
      function n(e) {
        let { rating: t, size: a = "w-4 h-4" } = e;
        return (0, s.jsx)("div", {
          className: "flex gap-0.5",
          role: "img",
          "aria-label": "".concat(t, " \xe9toiles sur 5"),
          children: [1, 2, 3, 4, 5].map((e) =>
            (0, s.jsx)(
              "svg",
              {
                className: a,
                viewBox: "0 0 24 24",
                fill: "#FBBC04",
                "aria-hidden": "true",
                children: (0, s.jsx)("path", {
                  d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
                }),
              },
              e,
            ),
          ),
        });
      }
      function i() {
        return (0, s.jsxs)("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          "aria-label": "Google",
          children: [
            (0, s.jsx)("path", {
              d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
              fill: "#4285F4",
            }),
            (0, s.jsx)("path", {
              d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
              fill: "#34A853",
            }),
            (0, s.jsx)("path", {
              d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",
              fill: "#FBBC05",
            }),
            (0, s.jsx)("path", {
              d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
              fill: "#EA4335",
            }),
          ],
        });
      }
      function c(e) {
        let { review: t } = e,
          a = ["#1B3A6B", "#C44A1E", "#15803D", "#7c3aed", "#0369a1"],
          l = a[t.name.charCodeAt(0) % a.length],
          n =
            t.avatar ||
            t.name
              .split(" ")
              .map((e) => e[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
        return t.photoUrl
          ? (0, s.jsx)(r.default, {
              src: t.photoUrl,
              alt: "Avis Google — ".concat(t.name),
              width: 44,
              height: 44,
              className: "w-11 h-11 rounded-full object-cover flex-shrink-0",
            })
          : (0, s.jsx)("div", {
              className:
                "w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0",
              style: { backgroundColor: l },
              "aria-hidden": "true",
              children: n,
            });
      }
      function o(e) {
        let {
            reviews: t,
            rating: a,
            totalCount: r,
            mapsUrl: o,
            isGoogle: d,
          } = e,
          x = (0, l.T)("testimonials"),
          m = t.filter((e) => 5 === e.rating),
          u = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Lux Time Cars",
            description: "Location de voitures de luxe \xe0 Casablanca, Maroc",
            url: "https://luxtimecars.com",
            telephone: "+212660707200",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Inara 02, 44 Rue 01",
              addressLocality: "Casablanca",
              addressCountry: "MA",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: a.toFixed(1),
              reviewCount: r,
              bestRating: "5",
              worstRating: "1",
            },
            review: m.map((e) => ({
              "@type": "Review",
              author: { "@type": "Person", name: e.name },
              reviewRating: {
                "@type": "Rating",
                ratingValue: 5,
                bestRating: "5",
              },
              reviewBody: e.text,
              datePublished: e.date,
            })),
          },
          h =
            o ||
            "https://www.google.com/maps/place/Luxtime+Cars/data=!4m2!3m1!1s0x0:0x6a53c82cde55902e";
        return (0, s.jsxs)("section", {
          className: "py-20 md:py-28 bg-surface",
          "aria-labelledby": "reviews-heading",
          children: [
            (0, s.jsx)("script", {
              type: "application/ld+json",
              dangerouslySetInnerHTML: { __html: JSON.stringify(u) },
            }),
            (0, s.jsxs)("div", {
              className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
              children: [
                (0, s.jsxs)("div", {
                  className: "text-center mb-14",
                  children: [
                    (0, s.jsx)("p", {
                      className:
                        "text-brand-orange-dark font-semibold text-sm uppercase tracking-widest mb-3",
                      children: x("badge"),
                    }),
                    (0, s.jsx)("h2", {
                      id: "reviews-heading",
                      className:
                        "text-4xl md:text-5xl font-extrabold text-dark mb-8",
                      children: x("title"),
                    }),
                    (0, s.jsxs)("a", {
                      href: h,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className:
                        "inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow duration-300",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "flex items-center gap-3",
                          children: [
                            (0, s.jsx)(i, {}),
                            (0, s.jsx)("span", {
                              className: "text-3xl font-extrabold text-dark",
                              children: a.toFixed(1),
                            }),
                            (0, s.jsx)(n, { rating: 5, size: "w-5 h-5" }),
                          ],
                        }),
                        (0, s.jsx)("div", {
                          className: "hidden sm:block w-px h-8 bg-gray-200",
                        }),
                        (0, s.jsxs)("p", {
                          className: "text-gray-600 text-sm",
                          children: [
                            x("basedOn", { count: r }),
                            " ",
                            d ? x("googleVerified") : x("satisfied"),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className:
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10",
                  children: m.map((e) =>
                    (0, s.jsxs)(
                      "article",
                      {
                        className:
                          "bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4",
                        children: [
                          (0, s.jsxs)("div", {
                            className: "flex items-start justify-between",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  (0, s.jsx)(c, { review: e }),
                                  (0, s.jsxs)("div", {
                                    children: [
                                      e.profileUrl
                                        ? (0, s.jsx)("a", {
                                            href: e.profileUrl,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className:
                                              "font-bold text-dark text-sm hover:text-brand-orange transition-colors",
                                            children: e.name,
                                          })
                                        : (0, s.jsx)("p", {
                                            className:
                                              "font-bold text-dark text-sm",
                                            children: e.name,
                                          }),
                                      e.role &&
                                        (0, s.jsx)("p", {
                                          className:
                                            "text-gray-600 text-xs mt-0.5",
                                          children: e.role,
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsx)(i, {}),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                              (0, s.jsx)(n, { rating: 5 }),
                              (0, s.jsx)("span", {
                                className: "text-gray-600 text-xs",
                                children: e.date,
                              }),
                            ],
                          }),
                          (0, s.jsxs)("blockquote", {
                            className:
                              "text-gray-600 text-sm leading-relaxed flex-1",
                            children: ["“", e.text, "”"],
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "flex items-center gap-1.5 pt-3 border-t border-gray-100",
                            children: [
                              (0, s.jsx)("svg", {
                                className: "w-3.5 h-3.5 text-blue-500",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: (0, s.jsx)("path", {
                                  fillRule: "evenodd",
                                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                  clipRule: "evenodd",
                                }),
                              }),
                              (0, s.jsx)("span", {
                                className: "text-xs text-gray-600",
                                children: x("verified"),
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
                (0, s.jsx)("div", {
                  className: "text-center",
                  children: (0, s.jsxs)("a", {
                    href: h,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "inline-flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-brand-orange text-dark hover:text-brand-orange font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-card group",
                    children: [
                      (0, s.jsx)(i, {}),
                      (0, s.jsx)("span", { children: x("viewAll") }),
                      (0, s.jsx)("svg", {
                        className:
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: (0, s.jsx)("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M17 8l4 4m0 0l-4 4m4-4H3",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
    40710: function (e, t, a) {
      "use strict";
      a.d(t, {
        default: function () {
          return u;
        },
      });
      var s = a(57437),
        r = a(95480);
      let l = (0, r.Z)("dollar-sign", [
          ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
          [
            "path",
            {
              d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
              key: "1b0p4s",
            },
          ],
        ]),
        n = (0, r.Z)("award", [
          [
            "path",
            {
              d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
              key: "1yiouv",
            },
          ],
          ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
        ]);
      var i = a(38470);
      let c = (0, r.Z)("truck", [
        [
          "path",
          {
            d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
            key: "wrbu53",
          },
        ],
        ["path", { d: "M15 18H9", key: "1lyqi6" }],
        [
          "path",
          {
            d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
            key: "lysw3i",
          },
        ],
        ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
        ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
      ]);
      var o = a(34166),
        d = a(46124),
        x = a(67442),
        m = a(38706);
      function u() {
        let e = (0, m.T)("whyUs"),
          t = [
            {
              icon: (0, s.jsx)(l, { className: "w-6 h-6" }),
              title: e("price"),
              description: e("priceDesc"),
              color: "text-green-500",
              bg: "bg-green-50",
            },
            {
              icon: (0, s.jsx)(n, { className: "w-6 h-6" }),
              title: e("fleet"),
              description: e("fleetDesc"),
              color: "text-brand-blue",
              bg: "bg-blue-50",
            },
            {
              icon: (0, s.jsx)(i.Z, { className: "w-6 h-6" }),
              title: e("support"),
              description: e("supportDesc"),
              color: "text-brand-orange",
              bg: "bg-orange-50",
            },
            {
              icon: (0, s.jsx)(c, { className: "w-6 h-6" }),
              title: e("delivery"),
              description: e("deliveryDesc"),
              color: "text-purple-500",
              bg: "bg-purple-50",
            },
            {
              icon: (0, s.jsx)(o.Z, { className: "w-6 h-6" }),
              title: e("insurance"),
              description: e("insuranceDesc"),
              color: "text-red-500",
              bg: "bg-red-50",
            },
            {
              icon: (0, s.jsx)(d.Z, { className: "w-6 h-6" }),
              title: e("freedom"),
              description: e("freedomDesc"),
              color: "text-teal-500",
              bg: "bg-teal-50",
            },
          ];
        return (0, s.jsx)("section", {
          className: "py-16 md:py-24 bg-brand-blue",
          children: (0, s.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, s.jsxs)(x.Z, {
                className: "text-center mb-12",
                children: [
                  (0, s.jsx)("span", {
                    className:
                      "inline-block text-white font-semibold text-sm uppercase tracking-widest mb-3",
                    children: e("badge"),
                  }),
                  (0, s.jsx)("h2", {
                    className: "text-3xl md:text-4xl font-bold text-white mb-4",
                    children: e("title"),
                  }),
                  (0, s.jsx)("p", {
                    className: "text-white/60 text-lg max-w-2xl mx-auto",
                    children: e("subtitle"),
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                children: t.map((e, t) =>
                  (0, s.jsx)(
                    x.Z,
                    {
                      delay: 80 * t,
                      direction: "up",
                      children: (0, s.jsxs)("div", {
                        className:
                          "bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 h-full",
                        children: [
                          (0, s.jsx)("div", {
                            className: "w-12 h-12 "
                              .concat(
                                e.bg,
                                " rounded-xl flex items-center justify-center mb-4 ",
                              )
                              .concat(e.color),
                            children: e.icon,
                          }),
                          (0, s.jsx)("h3", {
                            className: "text-white font-bold text-lg mb-2",
                            children: e.title,
                          }),
                          (0, s.jsx)("p", {
                            className: "text-white/60 text-sm leading-relaxed",
                            children: e.description,
                          }),
                        ],
                      }),
                    },
                    e.title,
                  ),
                ),
              }),
            ],
          }),
        });
      }
    },
    53907: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return r;
        },
      });
      var s = a(57437);
      function r(e) {
        let { className: t } = e;
        return (0, s.jsxs)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: t,
          children: [
            (0, s.jsx)("circle", { cx: "4", cy: "4", r: "2" }),
            (0, s.jsx)("circle", { cx: "12", cy: "4", r: "2" }),
            (0, s.jsx)("circle", { cx: "20", cy: "4", r: "2" }),
            (0, s.jsx)("circle", { cx: "7", cy: "20", r: "2" }),
            (0, s.jsx)("circle", { cx: "17", cy: "20", r: "2" }),
            (0, s.jsx)("line", { x1: "4", y1: "6", x2: "4", y2: "13" }),
            (0, s.jsx)("line", { x1: "12", y1: "6", x2: "12", y2: "13" }),
            (0, s.jsx)("line", { x1: "20", y1: "6", x2: "20", y2: "13" }),
            (0, s.jsx)("line", { x1: "4", y1: "13", x2: "20", y2: "13" }),
            (0, s.jsx)("line", { x1: "7", y1: "13", x2: "7", y2: "18" }),
            (0, s.jsx)("line", { x1: "17", y1: "13", x2: "17", y2: "18" }),
          ],
        });
      }
    },
    93448: function (e, t, a) {
      "use strict";
      a.d(t, {
        NY: function () {
          return o;
        },
        T4: function () {
          return n;
        },
        UE: function () {
          return d;
        },
        cn: function () {
          return l;
        },
        ku: function () {
          return u;
        },
        o4: function () {
          return m;
        },
        ow: function () {
          return c;
        },
        p6: function () {
          return i;
        },
        xK: function () {
          return x;
        },
      });
      var s = a(61994),
        r = a(53335);
      function l() {
        for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        return (0, r.m6)((0, s.W)(t));
      }
      function n(e) {
        return new Intl.NumberFormat("fr-MA", {
          style: "currency",
          currency: "MAD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(e);
      }
      function i(e) {
        return new Intl.DateTimeFormat("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(e));
      }
      function c(e, t) {
        let a = new Date(e);
        return Math.ceil((new Date(t).getTime() - a.getTime()) / 864e5);
      }
      let o = "+212660707200",
        d = "+212660707200",
        x = "luxtimecontact@gmail.com",
        m = "Inara 02, 44 Rue 01, Casablanca 20470, Maroc",
        u = "Lun-Sam: 8h-20h | Dim: 9h-18h";
    },
    88399: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("arrow-right", [
        ["path", { d: "M5 12h14", key: "1ays0h" }],
        ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
      ]);
    },
    67189: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("calendar", [
        ["path", { d: "M8 2v4", key: "1cmpym" }],
        ["path", { d: "M16 2v4", key: "4m81vk" }],
        [
          "rect",
          { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
        ],
        ["path", { d: "M3 10h18", key: "8toen8" }],
      ]);
    },
    36873: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("car", [
        [
          "path",
          {
            d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
            key: "5owen",
          },
        ],
        ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
        ["path", { d: "M9 17h6", key: "r8uit2" }],
        ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }],
      ]);
    },
    24754: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("check", [
        ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }],
      ]);
    },
    17166: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("chevron-down", [
        ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
      ]);
    },
    38470: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("clock", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
      ]);
    },
    82741: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("fuel", [
        [
          "path",
          {
            d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
            key: "1wtuz0",
          },
        ],
        [
          "path",
          { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16", key: "e09ifn" },
        ],
        ["path", { d: "M2 21h13", key: "1x0fut" }],
        ["path", { d: "M3 9h11", key: "1p7c0w" }],
      ]);
    },
    25763: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("map-pin", [
        [
          "path",
          {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z",
          },
        ],
        ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
      ]);
    },
    69811: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("phone", [
        [
          "path",
          {
            d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
            key: "9njp5v",
          },
        ],
      ]);
    },
    19150: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("search", [
        ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
        ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
      ]);
    },
    34166: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("shield", [
        [
          "path",
          {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y",
          },
        ],
      ]);
    },
    48055: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("star", [
        [
          "path",
          {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s",
          },
        ],
      ]);
    },
    46124: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("user", [
        [
          "path",
          { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
        ],
        ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
      ]);
    },
    31338: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return s;
        },
      });
      let s = (0, a(95480).Z)("users", [
        [
          "path",
          { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
        ],
        ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
        ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
        ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
      ]);
    },
  },
  function (e) {
    (e.O(0, [2972, 3145, 6137, 208, 3231, 2971, 2117, 1744], function () {
      return e((e.s = 50065));
    }),
      (_N_E = e.O()));
  },
]);
