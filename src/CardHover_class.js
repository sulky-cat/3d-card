class CardHover {
	constructor(wrapper, options) {
		// Установка настроек
		let defaultOptions = {
			// Настройка глубины
			distanceCoef: 2,
		}
		this.options = Object.assign(defaultOptions, options)

		// Обертка
		this.wrapper = wrapper
		// Глубина
		this.distanceCoef = this.wrapper.dataset.distance ? +this.wrapper.dataset.distance : this.options.distanceCoef
		// Передача событиям контекста this
		this.rotateToMouse = this.rotateToMouse.bind(this)
		this.initHover = this.initHover.bind(this)
		this.destroyHover = this.destroyHover.bind(this)

		// Инициализация
		this.init()
	}

	// Инициализация
	init() {
		this.wrapper.classList.add('_init_')
		this.wrapper.addEventListener('mouseenter', this.initHover)
	}
	// Удаление событий
	destroy() {
		this.wrapper.classList.remove('_init_')
		this.removeProperties()
		this.wrapper.removeEventListener('mouseenter', this.initHover)
		document.removeEventListener('mousemove', this.rotateToMouse)
		this.wrapper.removeEventListener('mouseleave', this.destroyHover)
	}
	// Событие при наведении
	initHover() {
		this.wrapper.classList.add('_hover_')
		document.addEventListener('mousemove', this.rotateToMouse)
		this.wrapper.removeEventListener('mouseenter', this.rotateToMouse)
		this.wrapper.addEventListener('mouseleave', this.destroyHover)
	}
	// Подсчет координат для изменения карточки
	rotateToMouse(e) {
		this.bounds = this.wrapper.getBoundingClientRect()
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const leftX = mouseX - this.bounds.x;
		const topY = mouseY - this.bounds.y;
		this.center = {
			x: leftX - this.bounds.width / 2,
			y: topY - this.bounds.height / 2
		}
		this.distance = Math.sqrt(this.center.x ** 2 + this.center.y ** 2);
		// Установка свойств
		this.setProperties()
	}
	destroyHover() {
		// Удаление событий
		document.removeEventListener('mousemove', this.rotateToMouse)
		this.wrapper.removeEventListener('mouseleave', this.destroyHover)
		// Удаление свойств
		this.removeProperties()
		// Удаление класса
		this.wrapper.classList.remove('_hover_')
		// Установка события наведения
		this.wrapper.addEventListener('mouseenter', this.initHover)
	}
	// Установка значений
	setProperties() {
		this.wrapper.style.setProperty('--rotate-x', `${this.center.y}`)
		this.wrapper.style.setProperty('--rotate-y', `${this.center.x * -1}`)
		this.wrapper.style.setProperty('--distance', `${Math.log(this.distance) * this.distanceCoef}deg`)

		this.wrapper.style.setProperty('--x-move', `${this.center.x + this.bounds.width / 2}px`)
		this.wrapper.style.setProperty('--y-move', `${this.center.y + this.bounds.height / 2}px`)
	}
	// Удалени6е значений
	removeProperties() {
		this.wrapper.style.removeProperty('--rotate-x')
		this.wrapper.style.removeProperty('--rotate-y')
		this.wrapper.style.removeProperty('--distance')

		this.wrapper.style.removeProperty('--x-move')
		this.wrapper.style.removeProperty(`--y-move`)
	}
}
