// document.body.style.border = '5px solid blue'

let sizeString = null
let priceString = null
let priceNode = null
function findSizeUnitsAndPrice(node) {
	if (node.nodeType === Node.TEXT_NODE) {
		if (node.textContent.includes('RELAY')) {
			return
		}
		if (node.textContent.endsWith('cm') && node.textContent.includes('×')) {
			sizeString = node.textContent
			// console.log(node.textContent)
			return
		}
		if (node.textContent.includes('US$')) {
			priceString = node.textContent
			priceNode = node
			// console.log(node.textContent)
			return
		}
	} else {
		for (let i = 0; i < node.childNodes.length; i++) {
			if (sizeString !== null && priceString !== null) break
			findSizeUnitsAndPrice(node.childNodes[i])
		}
	}
}

findSizeUnitsAndPrice(document.body)
const squareUnits = sizeString
	.split(' ')
	.map((x) => parseFloat(x))
	.filter((x) => !Number.isNaN(x))
	.reduce((acc, v) => acc * v, 1)
const price = priceString
	.split('US$')
	.map((x) => parseFloat(x.replace(/,/, '')))[1]
const pricePerSqUnit = price / squareUnits

// console.log('wow', squareUnits)
// console.log('price', price)
// console.log('price per sqcm', pricePerSqUnit)

const pricePerSqUnitString = ` (US$${pricePerSqUnit.toFixed(2)} per cm²)`
// console.log('pricaaaae', pricePerSqUnitString)

priceNode.textContent = priceString + pricePerSqUnitString
