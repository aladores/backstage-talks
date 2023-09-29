class Store {
    constructor() {
        this.counter = 0;
    }

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }

    setCounter(counter) {
        this.counter = counter;
    }
}

export default Store;