"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listararchivo_1 = require("../controllers/listararchivo");
const listararchivo_2 = require("../controllers/listararchivo");
const router = (0, express_1.Router)();
// router.get('/', getListararchivo);
router.post('/', listararchivo_1.getListararchivo);
//ESTA PARTE AGREGE
router.put('/:nomenclatura/:informacion/:fecha/:opcion/:file', listararchivo_2.listararchivoUpdate);
exports.default = router;
