"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultorio_1 = require("../controllers/consultorio");
const router = (0, express_1.Router)();
router.get('/:nomenclatura', consultorio_1.getConsultorioBusqueda);
exports.default = router;
