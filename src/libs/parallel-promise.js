'use strict';

module.exports = class ParallelPromise {

	static _sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	static async _doWork(iterator, sleepTime) {
		const result = [];
		for(const [index, item] of iterator) {
			await this._sleep(sleepTime);
			const value = await item;
			result.push([index, value]);
		}
		return result;
	}

	static async all(array, limit, sleepTime = 5) {
		const iterator = array.entries();
		const workers = new Array(limit)
			.fill(iterator)
			.map(i => this._doWork(i, sleepTime));

		const result = await Promise.all(workers);
		return result
			.flat()
			.sort(([a], [b]) => a - b)
			.map(([, value]) => value);
	}

};
