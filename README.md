# 3d Card hover

[Демо страница](https://sulky-cat.github.io/3d-card/demo)

html структура может быть любой, но стили прописаны для такой 
```html
<div data-wrapper-hover data-distance="2">
  <div data-card-hover></div>
</div>
``` 
Атрибут `data-distance` отвечает за коэффициент глубины 3D.

В настройках js также можно настроить этот коэффициент глубины 
```js
new CardHover(element, {
  distanceCoef: 2,
})
``` 
По умолчанию стоит 2, если не указывать атрибут или в js.

Настройки анимаций делаются в стилях с помощью css переменных. 
```css
--scale: 1; /* - изначальный scale. Не меняется в js */
--rotate-x: 0; /* - наклон для карточки по Х. Меняется через js */
--rotate-y: 0; /* - наклон для карточки по Y. Меняется через js */
--rotate-z: 0; /* - наклон для карточки по Z. Не меняется в js */
--distance: 0deg; /* - настройка для глубины */
--x-move: 0px; /* - повторяет движение мыши по карточке по оси X. Меняется через js */
--y-move: 0px; /* - повторяет движение мыши по карточке по оси Y. Меняется через js */
/* Для эффекта света */
--glow-color-circle: rgba(41, 41, 41, 0.1); /* - кружок */
--glow-color-bg: rgba(41, 41, 41, 0.1); /* - фон остальной карточки для контраста */
```

При инициализации, для оболочки добавляется класс `_init_`.

При наведении на карточку, для оболочки добавляется класс `_hover_`, по которому можно изменять css переменные так, как нужно.

## Пример реализации: 
```html
<div data-wrapper-hover data-distance="2">
  <div data-card-hover></div>
</div>
```

```js
const cards = document.querySelectorAll('[data-wrapper-hover]')
if (cards.length) {
   cards.forEach(element => {
      const card = new CardHover(element, {
         distanceCoef: 2,
      })
   });
}
```

