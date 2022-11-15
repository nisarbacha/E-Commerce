const fs = require('fs')
const crypto = require('crypto')

module.exports = class Repository{
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        }
        catch (e) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async create(attrs){
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf-8'
        }));
    }  
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }
    async delete(id) {
        const records = await this.getAll();
        const filterRecords = records.filter(record => record.id !== id);
        await this.writeAll(filterRecords);
    }
    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) {
            throw new Error(`Record with id ${id} is not find`);
        }
        Object.assign(record, attrs);
        await this.writeAll(records);
        console.log("your record is updated");
    }
    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            if (found) {
                return record;
            }
        }
    } 
    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

}