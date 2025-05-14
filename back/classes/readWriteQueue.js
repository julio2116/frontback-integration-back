class ReadWriteQueue {
    constructor() {
        this.queue = Promise.resolve();
    }

    enqueue(cb) {
        this.queue = this.queue
            .then(() => cb())
            .catch(err =>
                console.error(err)
            )
        return this.queue
    }
}

module.exports = new ReadWriteQueue()