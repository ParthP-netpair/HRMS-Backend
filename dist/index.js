"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = __importDefault(require("./config/env.config"));
const server_config_1 = __importDefault(require("./config/server.config"));
const logger_1 = __importDefault(require("./helpers/logger"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = Number((0, env_config_1.default)('PORT'));
        const mongoUri = (0, env_config_1.default)('MONGO_URL');
        yield mongoose_1.default.connect(mongoUri);
        console.log(`Database connected`);
        const server = server_config_1.default.listen(port, () => console.log(`Server running at port ${port}`));
        process.on('SIGINT', () => {
            console.log('Shutting down server...');
            server.close(() => {
                console.log('Server stopped');
                process.exit(0);
            });
        });
    }
    catch (error) {
        logger_1.default.error('Error while starting server: ' + (error === null || error === void 0 ? void 0 : error.message), { data: error, log: 'error' });
        process.exit(1);
    }
}))();
