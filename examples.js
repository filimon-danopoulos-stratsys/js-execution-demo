export const examples = [{
  name: 'Tasks & Microtasks',
  code: `
console.log('Starting...')

setTimeout(() => {
  console.log('Task 1')
  setTimeout(() => {
      console.log('Task 2')
  })
})

queueMicrotask(() => {
  console.log('Microtask 1')
  queueMicrotask(() => {
      console.log('Microtask 2')
  })
})

console.log('Done!')
`
}, {
  name: 'Tasks & Animation Frames',
  code: `
console.log('Starting...')

let count = 0
while (count++ < 20) {
  const taskIndex = count
  setTimeout(() => {
      console.log(\`Task \${taskIndex}\`)
  })
}

requestAnimationFrame(() => {
  console.log('Animation Frame 1')
})

console.log('Done!')
  `
}, {
  name: 'Microtasks & Animation Frames',
  code: `
console.log('Starting...')

requestAnimationFrame(() => {
  console.log('Animation Frame 1')

  queueMicrotask(() => {
      console.log('Microtask 1')
  })

  requestAnimationFrame(() => {
      console.log('Animation Frame 2')

      queueMicrotask(() => {
          console.log('Microtask 2')
      })
  })
})

queueMicrotask(() => {
  console.log('Microtask 3')
  queueMicrotask(() => {
      console.log('Microtask 4')
  })
})

console.log('Done!')
  `
}, {
  name: 'Animation Frames & Slow Code',
  code: `
// Asume 60Hz display, 16ms frame rate

console.log('Starting...')

setTimeout(() => {
  console.log('Task 1')
})

// Note, delayed for ~20ms
setTimeout(() => {
  console.log('Task 2')
}, 20)

requestAnimationFrame(() => {
  console.log('Animation Frame 1')

  requestAnimationFrame(() => {
      console.log('Animation Frame 2')
  })
})

// Blocking wait for ~20ms
const start = Date.now()
while(Date.now() - start < 20);

console.log('Done!')
`
}, {
  name: 'Mutation Observers',
  code: `
const observer = new MutationObserver(() => {
  console.log('Mutated!')
})

const element = document.createElement('div')
observer.observe(element, { attributes: true })

let counter = 1
const mutate = (count) => {
  console.log(\`Mutating \${count}\`)
  element.setAttribute('test', count)
}

element.addEventListener('click', () => {
  console.log('Clicked')
  mutate(counter++)
  queueMicrotask(() => mutate(counter++))
})

console.log('Starting')
mutate(counter++)
element.click()
console.log('Done!')
  `
}]