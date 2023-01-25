const cards = document.querySelectorAll('[data-wrapper-hover]')
if (cards.length) {
	cards.forEach(element => {
		const card = new CardHover(element, {
			// distanceCoef:2,
		})
	});
}