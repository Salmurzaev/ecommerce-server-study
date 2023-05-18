"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var product_1 = __importDefault(require("./routes/product"));
var order_1 = __importDefault(require("./routes/order"));
var webhook_1 = require("./webhook");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.post('/webhook', express_1.default.raw({ type: 'application/json' }), webhook_1.webhookHandler);
app.use(express_1.default.json());
(0, db_1.default)();
app.get('/te', function (req, res) {
    res.send('pong');
});
app.use('/products', product_1.default);
app.use('/orders', order_1.default);
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("Started ".concat(PORT));
});
//# sourceMappingURL=server.js.map