"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

type Badge = "Vegetariano" | "Sin gluten";
type Item = {
  name: string;
  description?: string;
  price: string | null;
  badges?: Badge[];
  note?: string;
};
type Category = { title: string; subtitle?: string; items: Item[] };
type Tab = { id: string; label: string; categories: Category[] };

const TABS: Tab[] = [
  {
    id: "desayuno",
    label: "Desayuno",
    categories: [
      {
        title: "Desayunos",
        subtitle: "Todos los días de 8:00 a 12:00 h",
        items: [
          {
            name: "Chipa Muffin Huevo y Lomo",
            description: "Pan de queso relleno de huevo estrellado, queso y lomo canadiense",
            price: "$165",
            badges: ["Sin gluten"],
          },
          {
            name: "Chipa Muffin de Huevo y Tocino",
            description: "Pan de queso relleno de huevo estrellado, queso y tocino",
            price: "$165",
            badges: ["Sin gluten"],
          },
          {
            name: "Chipa Muffin Veggie",
            description: "Pan de queso relleno de setas, queso panela y verdes",
            price: "$165",
            badges: ["Vegetariano", "Sin gluten"],
          },
          {
            name: "Chilaquiles Muffin",
            description: "Pan de queso relleno de chilaquiles, huevo estrellado, cebolla, crema y queso",
            price: "$165",
          },
          {
            name: "Avo Toast",
            description: "Flat bread con aguacate y huevo al gusto",
            price: "$129",
          },
          {
            name: "Molletes",
            description: "Mollete en pan de masa madre con huevos al gusto, aguacate y pico de gallo",
            price: "$115",
          },
          {
            name: "Huevos al gusto",
            description: "Huevos al gusto acompañados de frijoles, aguacate y porción de papas",
            price: "$120",
          },
          {
            name: "Huevos Turcos",
            description: "En flat bread con yogurt de ajo y espinacas salteadas",
            price: "$160",
          },
          {
            name: "Chilaquiles",
            description: "Con salsa verde o roja, crema, queso, aguacate y huevos al gusto",
            price: "$139",
          },
        ],
      },
      {
        title: "Desayunos Dulces",
        items: [
          {
            name: "Hot Cakes",
            description: "Pregunta por los hotcakes de temporada",
            price: "$139",
          },
          {
            name: "Yogurt con Granola",
            description: "Yogurt con coulis de frutos rojos y granola",
            price: "$85",
          },
          {
            name: "Plato de fruta",
            description: "Mix de frutas de temporada, con miel y granola",
            price: "$80",
          },
        ],
      },
    ],
  },
  {
    id: "todo-el-dia",
    label: "Todo el Día",
    categories: [
      {
        title: "Empanadas",
        items: [
          { name: "Jamón y queso", price: "$60" },
          { name: "Setas y Huitlacoche", price: "$60" },
          { name: "Provoleta y chorizo", price: "$60" },
          { name: "Carne", price: "$60" },
        ],
      },
      {
        title: "Mbeju",
        subtitle: "Flat bread de harina de tapioca y queso",
        items: [
          {
            name: "Clásico",
            description: "Acompañado de mix de verdes",
            price: "$95",
            badges: ["Vegetariano", "Sin gluten"],
          },
          {
            name: "Chipotle",
            description: "Acompañado de mix de verdes",
            price: "$100",
            badges: ["Vegetariano", "Sin gluten"],
          },
          {
            name: "Romeo y Julieta",
            description: "Tortilla de harina de mandioca rellena de dulce de guayaba y queso",
            price: "$110",
            badges: ["Vegetariano", "Sin gluten"],
          },
        ],
      },
      {
        title: "Pizzas",
        items: [
          {
            name: "Setas",
            description: "Setas, queso de cabra y pesto de cilantro con crunch de ajo",
            price: "$220",
          },
          {
            name: "Spicy Berenjena",
            description: "Berenjena, muzzarella, parmesano y peperonccino",
            price: "$220",
          },
          {
            name: "Chicharron",
            description: "Queso provolone, crunch de chicharrón y pesto de chiltepin",
            price: "$230",
          },
          {
            name: "Pizza Guapa",
            description: "Pregunta por la pizza de la semana",
            price: null,
          },
        ],
      },
      {
        title: "Chipa Muffin",
        items: [
          {
            name: "Huevo y Lomo",
            description: "Pan de queso relleno de huevo estrellado, queso y lomo canadiense",
            price: "$165",
            badges: ["Sin gluten"],
          },
          {
            name: "Huevo y Tocino",
            description: "Pan de queso relleno de huevo estrellado, queso y tocino",
            price: "$165",
            badges: ["Sin gluten"],
          },
          {
            name: "Veggie",
            description: "Pan de queso relleno de setas, queso panela y verdes",
            price: "$165",
            badges: ["Vegetariano", "Sin gluten"],
          },
        ],
      },
      {
        title: "Sandwiches",
        items: [
          {
            name: "Jamón y queso",
            description: "Chapata de jamón natural, queso mánchego, jitomate, aguacate y pesto",
            price: "$125",
          },
          {
            name: "Jamón Serrano",
            description: "Chapata de jamón serrano, queso brie, rucula y tomates cherry",
            price: "$170",
          },
        ],
      },
      {
        title: "Ensaladas",
        items: [
          {
            name: "Lola",
            description:
              "Pimientos, pepino persa, jitomates San Marzano, cebolla encurtida, aceituna negra, queso de cabra, queso feta, pistachos y aderezo de alcaparras",
            price: "$160",
            badges: ["Vegetariano"],
          },
        ],
      },
      {
        title: "Platitos Guapos",
        items: [
          {
            name: "Quinoa Chicken",
            description:
              "Pechuga de pollo empanizado con quinoa y mezcla de semillas, acompañada con mix de verdes y papas",
            price: "$195",
          },
          {
            name: "Guapa's Bowl",
            description: "Arroz yamani, lentejas, verduras asadas y hummus de betabel",
            price: "$190",
          },
          {
            name: "Purple Gnocchi",
            description: "Gnocchi de camote morado acompañados de salsa de queso gorgonzola",
            price: "$180",
          },
          {
            name: "Flat Lasagna",
            description: "Ragú de res, bechamel, queso parmesano, pesto genovés y muzzarella",
            price: "$180",
          },
          {
            name: "Pasta Guapa",
            description: "Pregunta por la pasta de la semana",
            price: null,
          },
        ],
      },
    ],
  },
  {
    id: "panaderia",
    label: "Panadería",
    categories: [
      {
        title: "Horneados con amor",
        items: [
          { name: "Medialuna Clásica", price: "$40" },
          { name: "Medialuna Chocolate con Leche", price: "$55" },
          { name: "Medialuna Chocolate Blanco", price: "$55" },
          { name: "Medialuna Chocolate Rubí", price: "$55" },
          { name: "Medialuna Jamón y Queso", price: "$70" },
          { name: "Cinnamon Roll Clásico", price: "$60" },
          { name: "Cinnamon Roll Nutella", price: "$60" },
          { name: "Cinnamon Roll Berries", price: "$60" },
        ],
      },
    ],
  },
  {
    id: "cafeteria",
    label: "Cafetería",
    categories: [
      {
        title: "Café",
        items: [
          { name: "Doble", price: "$45" },
          { name: "Latte", price: "$60" },
          { name: "Magic", price: "$50" },
          { name: "Flat White", price: "$60" },
          { name: "Americano", price: "$40" },
          { name: "Matcha Espresso Latte", price: "$78" },
          { name: "Chocolate", price: "$65" },
          { name: "Capuccino", price: "$60" },
        ],
      },
      {
        title: "Café Frío",
        items: [
          { name: "Americano", price: "$40" },
          { name: "Americano Orange", price: "$65" },
          { name: "Americano Honey", price: "$65" },
          { name: "Iced Latte", price: "$60" },
          { name: "Vainilla Latte", price: "$65" },
          { name: "Espresso Honey Tonic", price: "$70" },
          { name: "Iced Chocolate", price: "$65" },
        ],
      },
      {
        title: "Ponte Guapa",
        items: [
          { name: "Matcha Latte", price: "$65" },
          { name: "Lavander Matcha", price: "$75" },
          { name: "Butterfly Matcha Latte", price: "$70" },
          { name: "Chai Latte", price: "$65" },
        ],
      },
      {
        title: "Tés",
        subtitle: "Puedes pedirlo caliente o helado",
        items: [
          { name: "Winter Love", description: "Almendra, caramelo y berries", price: "$60" },
          { name: "Moscú", description: "Manzana, canela y almendra", price: "$60" },
          {
            name: "White Queen",
            description: "Té blanco, manzana, mango, caléndula y fresa",
            price: "$60",
          },
          { name: "Moras", price: "$60" },
          {
            name: "Blue Eyes",
            description: "Cascara de naranja, rosas, butterfly pea tea y manzana",
            price: "$60",
          },
          { name: "English Breakfast", description: "Té negro", price: "$40" },
        ],
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    categories: [
      {
        title: "Limonadas",
        items: [
          { name: "Limonada Pitahaya", price: "$60" },
          { name: "Limonada Lavanda", price: "$60" },
          { name: "Limonada Maracuya", price: "$60" },
          { name: "Limonada Lychee", price: "$60" },
        ],
      },
      {
        title: "Refrescos y Agua",
        items: [
          {
            name: "Refrescos",
            description: "Coca Cola, Coca Cola Light, Coca Cola Zero, Sprite",
            price: "$45",
          },
          { name: "Agua Mineral", description: "Topochico", price: "$65" },
          { name: "Agua Natural", description: "Ciel", price: "$40" },
        ],
      },
      {
        title: "Cervezas",
        items: [
          { name: "Corona", price: "$60" },
          { name: "Stella", price: "$70" },
          { name: "Modelo Negra", price: "$65" },
          { name: "Modelo Especial", price: "$65" },
          { name: "Michelob", price: "$70" },
        ],
      },
    ],
  },
  {
    id: "mimosas",
    label: "Mimosas & Vinos",
    categories: [
      {
        title: "Mimosas",
        items: [
          { name: "Naranja", price: "$130" },
          { name: "Frutos Rojos", price: "$130" },
          { name: "Maracuya", price: "$130" },
          { name: "Fresa y Menta", price: "$130" },
        ],
      },
      {
        title: "Coctelitos con Vino",
        items: [
          { name: "Tinto de Verano", price: "$110" },
          { name: "Clericot Tinto", price: "$110" },
          { name: "Clericot Blanco", price: "$110" },
          { name: "Sangria Lychee", price: "$100" },
          { name: "Frozen Vinito Tinto", price: "$120" },
          { name: "Frozen Vinito Blanco", price: "$120" },
        ],
      },
    ],
  },
];

function BadgeChip({ badge }: { badge: Badge }) {
  const isVeg = badge === "Vegetariano";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        fontFamily: "var(--font-be-vietnam)",
        background: isVeg ? "rgba(148,200,188,0.2)" : "rgba(248,207,201,0.4)",
        color: isVeg ? "var(--color-green-deep)" : "#7a5b57",
        border: `1px solid ${isVeg ? "rgba(148,200,188,0.5)" : "rgba(248,207,201,0.8)"}`,
        fontSize: "0.7rem",
        letterSpacing: "0.02em",
      }}
      aria-label={badge}
    >
      {isVeg ? "🌿" : "✦"} {badge}
    </span>
  );
}

function MenuItemRow({ item }: { item: Item }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5" style={{ borderBottom: "1px solid var(--color-outline)", opacity: 1 }}>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold"
          style={{
            fontFamily: "var(--font-be-vietnam)",
            fontSize: "0.9375rem",
            color: "var(--color-text)",
          }}
        >
          {item.name}
        </p>
        {item.description && (
          <p
            className="mt-0.5"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </p>
        )}
        {item.badges && item.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {item.badges.map((b) => (
              <BadgeChip key={b} badge={b} />
            ))}
          </div>
        )}
      </div>
      <div className="shrink-0 pt-0.5">
        {item.price ? (
          <span
            className="font-semibold"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              fontSize: "0.9375rem",
              color: "var(--color-green-deep)",
            }}
          >
            {item.price}
          </span>
        ) : (
          <span
            className="text-xs italic"
            style={{
              fontFamily: "var(--font-literata)",
              color: "var(--color-text-muted)",
            }}
          >
            Consulta
          </span>
        )}
      </div>
    </div>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  return (
    <div className="mb-8">
      <div className="mb-1">
        <h3
          className="font-semibold"
          style={{
            fontFamily: "var(--font-literata)",
            fontSize: "1.1875rem",
            color: "var(--color-text)",
          }}
        >
          {category.title}
        </h3>
        {category.subtitle && (
          <p
            className="mt-0.5 text-xs"
            style={{
              fontFamily: "var(--font-be-vietnam)",
              color: "var(--color-green-deep)",
              letterSpacing: "0.04em",
            }}
          >
            {category.subtitle}
          </p>
        )}
      </div>
      <div style={{ borderTop: "1px solid var(--color-outline)" }}>
        {category.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const reduce = useReducedMotion();
  const tab = TABS.find((t) => t.id === activeTab)!;

  // Split categories into two columns for desktop
  const half = Math.ceil(tab.categories.length / 2);
  const col1 = tab.categories.slice(0, half);
  const col2 = tab.categories.slice(half);

  return (
    <section
      id="menu"
      className="py-24 md:py-32"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.6, ease: "easeOut" as const },
          })}
        >
          <h2
            style={{
              fontFamily: "var(--font-literata)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              textWrap: "balance",
            }}
          >
            Nuestro Menú
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: "40px",
              height: "2px",
              background: "var(--color-green)",
              borderRadius: "9999px",
            }}
          />
        </motion.div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-10 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Secciones del menú"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className="shrink-0 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--font-be-vietnam)",
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
                minHeight: "44px",
                background: activeTab === t.id ? "var(--color-green)" : "transparent",
                color: activeTab === t.id ? "#ffffff" : "var(--color-text-muted)",
                border:
                  activeTab === t.id
                    ? "1px solid var(--color-green)"
                    : "1px solid var(--color-outline)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab panel — 2-col grid on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-label={tab.label}
            className="grid md:grid-cols-2 gap-0 md:gap-x-16"
            {...(reduce ? {} : {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.3, ease: "easeOut" as const },
            })}
          >
            <div>{col1.map((cat) => <CategoryBlock key={cat.title} category={cat} />)}</div>
            <div>{col2.map((cat) => <CategoryBlock key={cat.title} category={cat} />)}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
