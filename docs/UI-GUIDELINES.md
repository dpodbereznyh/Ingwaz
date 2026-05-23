# UI guidelines (Ingwaz v0.2)

Thesis-витрина, не marketplace. Copy: [CONTENT-COPY.md](./CONTENT-COPY.md).

---

## Порядок блоков (главная)

1. Hero + thesis  
2. Primary CTA (CommentSignal) — **dominant**  
3. Evidence (пример сигналов)  
4. Для кого / не для кого  
5. Secondary tools — **компактный список**, не card grid  
6. FAQ (×3)  
7. Maintenance — **слабый** блок или footer-уровень  
8. Footer / legal  

---

## Visual hierarchy

| Элемент | Вес |
|---------|-----|
| Primary CTA | Крупная кнопка + accent surface |
| Evidence | Скрин CommentSignal + подпись со ссылкой на prod |
| Secondary | Текстовые ссылки, без равных card с primary |
| Maintenance | Мелкий текст, border-top muted |
| FAQ | `<details>` или простой список, без accordion-анимаций |

---

## Тема (v0.3)

**Светлая** по умолчанию; переключатель «Светлая / Тёмная» в footer. Сохранение в `localStorage` (`ingwaz-theme-v1`). Без flash — inline script в `index.html`.

Палитра light: `--accent` #3d6fd4, фон #f7f8fc. Dark: `--accent` #6b9fff, фон #0f1117.

---

## Референсы (тип, не клон)

- Minimal research tool (воздух, текст)  
- Technical product thesis page  
- Indie software lab  

---

## Anti-patterns

- 6 равных hero-cards  
- Maintenance block как «misc dump» на уровне primary  
- Animations-first polish без content  
- «AI wrapper» neon aesthetic  
