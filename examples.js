export const examples = [{
  name: 'Timers', 
  view: false,
  code: `
console.log('Starting...')

setTimeout(() => {
  console.log('Timer 1')

  setTimeout(() => {
    console.log('Timer 2')
  })

  setTimeout(() => {
    console.log('Timer 3')
  }, 10)
})

setTimeout(() => {
  console.log('Timer 4')
})

setTimeout(() => {
  console.log('Timer 5')
}, 10)

console.log('Done!')
  `
}, {
  name: 'Microtasks', 
  view: false,
  code: `
console.log('Starting...')

queueMicrotask(() => {
  console.log('Microtask 1')

  queueMicrotask(() => {
    console.log('Microtask 2')
  })

  queueMicrotask(() => {
    console.log('Microtask 3')
  })
})

queueMicrotask(() => {
  console.log('Microtask 4')
})

queueMicrotask(() => {
  console.log('Microtask 5')
})

console.log('Done!')
  `
}, {
  name: 'Tasks & Microtasks',
  view: false,
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
  name: 'Recursive Timers', 
  view: false,
  code: `
const runCount = 10 
const run = (left) => {
  if (!left) {
    return
  }

  setTimeout(() => {
    console.log(\`Run \${runCount - left + 1}\`)
    run(left - 1)
  })
}

run(runCount)
  ` 
}, {
  name: 'Recursive postMessage', 
  view: false,
  code: `
const runCount = 10 
const run = (left) => {
  if (!left) {
      return
  }

  const start = performance.now()
  const channel = new MessageChannel()
  
  channel.port1.onmessage = function () {
      console.log(\`Run \${runCount - left + 1}\`)
      run(left - 1)
  }

  channel.port2.postMessage('')
}

run(runCount)
  ` 
}, {
  name: 'Tasks & Animation Frames',
  view: false,
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
  view: false,
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
  view: false,
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
  view: false,
  code: `
const observer = new MutationObserver(() => {
  console.log('Mutated!')
})

const $element = document.createElement('div')
observer.observe($element, { childList: true })

const mutate = (number) => {
  console.log(\`Mutating \${number}\`)
  $element.innerText = number
}

console.log('Starting')

mutate(1)

setTimeout(() => mutate(2))

mutate(3)

queueMicrotask(() => mutate(4))

console.log('Done!')
  `
}, {
  name: 'Promises',
  view: false,
  code: `
queueMicrotask(() => {
  console.log('Microtask 1')
})

const promise = Promise.resolve()
  .then(() => {
    console.log('Promise 1')
    
    queueMicrotask(() => {
      console.log('Microtask 2')
    })
  })
  .then(() => {
    console.log('Promise 2')
    queueMicrotask(() => {
      console.log('Microtask 3')
      Promise.resolve().then(() => {
        console.log('Promise 3')
      })
    })
  })
  .then(() => {
    console.log('Promise 4')
  })

promise.then(() => {
  console.log('Promise 5')
})

queueMicrotask(() => {
  console.log('Microtask 4')
})
  `
}, {
  name: 'Events',
  view: true,
  code: `
const $container = document.createElement('div')
const $button = document.createElement('button')

$button.innerText = 'Click Me!'
$container.appendChild($button)

document.querySelector('.view').appendChild($container)

console.log('Starting')

queueMicrotask(() => console.log('Microtask 1'))

setTimeout(() => console.log('Task 1'))

$container.addEventListener('click', () => {
  console.log('Click Bubbled!')

  setTimeout(() => console.log('Task 3'))
  queueMicrotask(() => console.log('Microtask 3'))
})

$button.addEventListener('click', () => {
    console.log('Button Clicked!')

    setTimeout(() => console.log('Task 2'))
    queueMicrotask(() => console.log('Microtask 2'))
})

console.log('Done!')
  `
}, {
  name: 'Programmatic Events',
  view: false,
  code: `
const $container = document.createElement('div')
const $button = document.createElement('button')
$container.appendChild($button)

console.log('Starting')

queueMicrotask(() => console.log('Microtask 1'))

setTimeout(() => console.log('Task 1'))

$container.addEventListener('click', () => {
  console.log('Click Bubbled!')

  setTimeout(() => console.log('Task 3'))
  queueMicrotask(() => console.log('Microtask 3'))
})

$button.addEventListener('click', () => {
    console.log('Button Clicked!')

    setTimeout(() => console.log('Task 2'))
    queueMicrotask(() => console.log('Microtask 2'))
})

$button.click()

console.log('Done!')
  `
}, {
  name: 'A Hard One',
  view: false,
  code: `
const $button = document.createElement('button')

let observerCounter = 1
const observer = new MutationObserver(() => {
  console.log(\`Mutated \${observerCounter++}\`)
})
observer.observe($button, { attributes: true })
const mutate = (id) =>  {
  console.log(\`Mutating \${id}\`)
  $button.setAttribute('test', id)
}

console.log('Starting')

setTimeout(() => {
  console.log('Task 1')
  mutate(1)
})

queueMicrotask(() => {
  console.log('Microtask 1')
  mutate(2)
})

$button.addEventListener('click', () => {
  console.log('Button Clicked!')

  setTimeout(() => {
    console.log('Task 2')
    mutate(3)
  })

  queueMicrotask(() => {
    console.log('Microtask 2')
    mutate(4)
  })
})

mutate(5)
$button.click()
mutate(6)

console.log('Done!')
  `
}]
