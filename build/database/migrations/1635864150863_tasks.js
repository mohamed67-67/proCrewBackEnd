"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Tasks extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'tasks';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('user_id').unsigned().nullable();
            table.string('title').notNullable();
            table.boolean('is_completed').defaultTo(0);
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Tasks;
//# sourceMappingURL=1635864150863_tasks.js.map