export default class Math {
    static isPrime(n) {
        if (n < 2) return false;

        const primes = new Array(n + 1).fill(true);
        primes[0] = primes[1] = false;

        for (let p = 2; p * p <= n; p++) {
            if (primes[p]) {
                for (let i = p * p; i <= n; i += p) {
                    primes[i] = false;
                }
            }
        }

        return primes[n];
    }
}