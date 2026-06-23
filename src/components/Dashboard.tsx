import { useEffect } from "react";
import { ChapterCard } from "./brand/ChapterCard";
import { ScrollReveal } from "./effects/ScrollReveal";
import { ProgressBar } from "./ui/ProgressBar";
import { PieChart } from "./ui/PieChart";
import { useBrandStore } from "../store/useBrandStore";
import heroBg from "../../IMAGES/weekend_viveska.jpg";
const chapters = [
  { id: "brand-identity", num: "01", icon: "◆", title: "Brand Identity", desc: "Миссия, ценности, позиционирование, tone of voice, архетип бренда", count: "6 подразделов", color: "var(--color-ch1)" },
  { id: "visual-system", num: "02", icon: "◐", title: "Visual System", desc: "Цвета, типографика, иконография, фотостиль, паттерны, сетка", count: "6 подразделов", color: "var(--color-ch2)" },
  { id: "logobook", num: "03", icon: "⬡", title: "Логотип & Logobook", desc: "Разработка логотипа, вариации, правила использования, паттерны", count: "24 страницы", color: "var(--color-ch3)" },
  { id: "marketing", num: "04", icon: "◈", title: "Marketing Assets", desc: "Соцсети, баннеры, POS-материалы, мерч, фотоархив", count: "5 подразделов", color: "var(--color-ch4)" },
  { id: "corporate", num: "05", icon: "▣", title: "Деловая документация", desc: "Визитки, бланки, конверты, коммерческие предложения, презентации", count: "18 страниц", color: "var(--color-ch5)" },
  { id: "digital", num: "06", icon: "◎", title: "Digital Presence", desc: "Веб-сайт, email-шаблоны, социальные медиа, онлайн-магазин", count: "3 подраздела", color: "var(--color-ch6)" },
  { id: "physical", num: "07", icon: "⬢", title: "Физические носители", desc: "Транспорт, форма сотрудников, вывески, сувенирная продукция", count: "20 страниц", color: "var(--color-ch7)" },
  { id: "resources", num: "08", icon: "⤓", title: "Ресурсы & Загрузки", desc: "Шаблоны, гайды для подрядчиков, FAQ, файлы логотипов", count: "3 подраздела", color: "var(--color-ch8)" },
];

export const Dashboard = () => {

  const { stats, refreshStats } = useBrandStore();

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      {/* Hero Section */}
      <div className="relative w-full max-w-[1440px] mx-auto z-10 mb-24">
        {/* Photo Block */}
        <ScrollReveal className="relative w-full" direction="down" distance={30}>
          <img src={heroBg} alt="Brandbook Hero" className="w-full h-auto block" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent pointer-events-none" />

          <div className="absolute top-8 left-8 md:left-16 z-20">
            <div className="inline-block px-3 py-1 rounded-sm bg-black/50 text-accent-primary text-xs font-mono uppercase tracking-widest border border-white/10 backdrop-blur-md shadow-sm">
              ⬡ Corporate Brandbook
            </div>
          </div>

          <div className="absolute bottom-0 left-8 md:left-16 translate-y-[60%] z-30">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-text-primary drop-shadow-xl leading-none">
              Weekend Billiard
              <br />
              <span className="text-text-secondary">Brandbook</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Text Block Below */}
        <ScrollReveal className="px-8 md:px-16 pt-32 md:pt-40" direction="up" distance={30} delay={0.1}>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl font-body mb-10">
            Полное руководство по визуальной идентичности, стандартам коммуникации и применению бренда на всех носителях
          </p>

          <div className="flex items-center gap-12 border-t border-border-subtle pt-8">
            <div>
              <div className="text-3xl font-bold text-text-primary">2026</div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mt-1">Версия</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">v1.0</div>
              <div className="text-xs font-mono text-text-tertiary uppercase tracking-widest mt-1">Релиз</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Chapters Grid */}
      <div className="px-8 md:px-16 max-w-[1440px] mx-auto z-10 relative">
        <h2 className="text-2xl font-bold mb-8">Разделы брендбука</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chapters.map((ch, i) => (
            <ScrollReveal key={ch.id} delay={i * 0.1}>
              <ChapterCard {...ch} />
            </ScrollReveal>
          ))}
        </div>

        {/* Portal Statistics */}
        <ScrollReveal className="mt-16 pt-16 border-t border-border-subtle" delay={0.4}>
          <h2 className="text-2xl font-bold mb-8">Статистика портала</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 col-span-2">
              <h3 className="text-lg font-bold mb-6 text-text-primary">Прогресс заполнения</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Визуальная система</span>
                    <span className="text-sm font-bold text-text-tertiary">0%</span>
                  </div>
                  <ProgressBar progress={0} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Деловая документация</span>
                    <span className="text-sm font-bold text-text-tertiary">0%</span>
                  </div>
                  <ProgressBar progress={0} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-text-secondary">Маркетинговые материалы</span>
                    <span className="text-sm font-bold text-text-tertiary">0%</span>
                  </div>
                  <ProgressBar progress={0} />
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-6 text-text-primary w-full">Общая готовность</h3>
              <PieChart percentage={0} size={160} strokeWidth={12} colorClass="text-text-tertiary" />
              <div className="mt-6 flex items-center gap-6 w-full justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{stats?.totalComments || 0}</div>
                  <div className="text-xs text-text-tertiary">Комментов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{stats?.totalFiles || 0}</div>
                  <div className="text-xs text-text-tertiary">Файлов</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Brand Summary Cards */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 pt-16 border-t border-border-subtle" delay={0.5}>
          <div className="bg-bg-secondary border border-border-subtle rounded-xl p-4 text-center flex flex-col justify-center">
            <div className="text-[10px] text-text-tertiary uppercase tracking-widest mb-2 font-mono">Основано</div>
            <div className="text-xl font-black text-accent-primary mb-1">Weekend</div>
            <div className="text-xs text-text-secondary">Billiard Company</div>
          </div>
          <div className="bg-bg-secondary border border-border-subtle rounded-xl p-4 text-center flex flex-col justify-center">
            <div className="text-[10px] text-text-tertiary uppercase tracking-widest mb-2 font-mono">Сфера</div>
            <div className="text-base font-bold text-text-primary mb-1">Бильярдное оборудование</div>
            <div className="text-xs text-text-secondary">Продажа и доставка по РФ</div>
          </div>
          <div className="bg-bg-secondary border border-border-subtle rounded-xl p-4 text-center flex flex-col justify-center">
            <div className="text-[10px] text-text-tertiary uppercase tracking-widest mb-2 font-mono">Контакты</div>
            <div className="text-base font-bold text-text-primary mb-1">weekend-billiard.ru</div>
            <div className="text-xs text-text-secondary">Москва · Санкт-Петербург</div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

