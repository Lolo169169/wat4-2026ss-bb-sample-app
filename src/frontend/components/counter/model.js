import Math from '../../utils/Math.js';

export class CounterModel {
    #value;
    get value() { return this.#value; }

    get isPrime() { return Math.isPrime(this.#value); }

    constructor(apiService) {
        this.apiService = apiService;
        this.subscribers = [];
    }

    async initialize() {
        this.#value = await this.apiService.getValue();
        this.notifySubscribers();
    }

    async increment() {
        this.#value = await this.apiService.increment();
        this.notifySubscribers();
    }

    async decrement() {
        this.#value = await this.apiService.decrement();
        this.notifySubscribers();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback());
    }
}
