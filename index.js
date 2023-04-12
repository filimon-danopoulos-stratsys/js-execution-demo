import { examples } from './examples.js'

const $select = document.querySelector('select')
const $clear = document.querySelector('#clear')
const $run = document.querySelector('#run')
const $step = document.querySelector('#step')
const $all = document.querySelector('#all')
const $code = document.querySelector('code')
const $output = document.querySelector('output')
const $view = document.querySelector('.view')
const $time = document.querySelector('#time')

const steps = []
console.log = (message, ...rest) => {
  const now = performance.now()
  steps.push(() => {
    const $text = document.createElement('div')
    $text.textContent = message
    $text.setAttribute('time', (now - start).toFixed(1))
    $output.appendChild($text)
  })
}


for (const example of examples) {
  const $option = document.createElement('option')
  $option.value = example.code
  $option.textContent = example.name
  $option.dataset['view'] = example.view
  $select.appendChild($option)
}

let shouldClearOutput = false
let selectedCode = ''
let start
const run = async (code) => {
  start = performance.now()
  steps.length = 0
  shouldClearOutput = true
  await eval(selectedCode)
}

const clearOutput = () => {
  if (shouldClearOutput) {
    $output.innerHTML = ''
    shouldClearOutput = false
  }
}

$select.addEventListener('change', () => {
  const code = $select.value.trim()
  selectedCode = code
  $output.innerHTML = ''
  $code.innerText = code
  $view.hidden = $select.selectedOptions[0]?.dataset['view'] !== 'true'
})

$code.addEventListener('input', () => {
  selectedCode = $code.innerText
})

$clear.addEventListener('click', () => {
  $output.innerHTML = ''
  $view.innerHTML = ''
})

$run.addEventListener('click', () => {
  run()
})

$step.addEventListener('click', () => {
  clearOutput()
  const step = steps.shift()
  if (step) {
    step()
  }
})

$all.addEventListener('click', () => {
  clearOutput()
  for(const step of steps) {
    step()
  }
  steps.length = 0
})

$time.addEventListener('change', (e) => {
  $output.toggleAttribute('show-time', e.target.checked)
})