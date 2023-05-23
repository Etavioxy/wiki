import { defineStore } from 'pinia'

// define a store
const useNumberStore = defineStore({
  // unique id of the store across your application
  id: 'numbers',
  // state: () => ({ ... }) is for TypeScript inference
  // it is the same as state: { ... }
  state: () => ({
    numbers: [] // initialize an empty array
  }),
  // optional getters
  getters: {
    // use getters to derive data from the state
    // you can also pass arguments to getters by returning a function
    // this is useful when you want to query an array in the state
    getNumberById: (state) => (id) => {
      return state.numbers.find(n => n.id === id)
    }
  },
  // optional actions
  actions: {
    // use actions to mutate the state
    // you can also access other getters and actions in this store
    addNumber(number) {
      this.numbers.push(number)
    },
    removeNumber(id) {
      this.numbers = this.numbers.filter(n => n.id !== id)
    }
  }
})

// create a store instance
const numberStore = useNumberStore()

// access the state
console.log(numberStore.numbers) // []

// mutate the state
numberStore.addNumber({ id: 1, value: 10 })
numberStore.addNumber({ id: 2, value: 20 })

// access the getters
console.log(numberStore.getNumberById(1)) // { id: 1, value: 10 }
console.log(numberStore.getNumberById(3)) // undefined

// call other actions
numberStore.removeNumber(1)

// access the state again
console.log(numberStore.numbers) // [{ id: 2, value: 20 }]
