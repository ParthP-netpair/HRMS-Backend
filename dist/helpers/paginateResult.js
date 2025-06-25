"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facetStage = void 0;
exports.default = (records, currentPage, limitPerPage, total, notFacet) => {
    var _a, _b, _c, _d, _e;
    const recordLength = notFacet ? records === null || records === void 0 ? void 0 : records.length : (_b = (_a = records[0]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length;
    const showFrom = recordLength ? (currentPage - 1) * limitPerPage + 1 : 0;
    const showTo = recordLength ? showFrom + recordLength - 1 : 0;
    const t = notFacet ? total : (_e = (_d = (_c = records[0]) === null || _c === void 0 ? void 0 : _c.total[0]) === null || _d === void 0 ? void 0 : _d.total) !== null && _e !== void 0 ? _e : 0;
    const data = {
        records: records[0].data,
        currentPage,
        pages: Math.ceil(t / limitPerPage),
        total: t,
        from: showFrom,
        to: showTo,
    };
    return data;
};
const facetStage = (skip, limitPerPage) => [
    {
        $facet: {
            data: [{ $skip: skip }, { $limit: limitPerPage }],
            total: [
                {
                    $count: 'total',
                },
            ],
        },
    },
];
exports.facetStage = facetStage;
