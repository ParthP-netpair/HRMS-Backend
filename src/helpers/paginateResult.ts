export default (
  records: any[],
  currentPage: number,
  limitPerPage: number,
  total?: number,
  notFacet?: boolean,
) => {
  const recordLength = notFacet ? records?.length : records[0]?.data?.length;
  const showFrom = recordLength ? (currentPage - 1) * limitPerPage + 1 : 0;
  const showTo = recordLength ? showFrom + recordLength - 1 : 0;
  const t = notFacet ? total : records[0]?.total[0]?.total ?? 0;
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

export const facetStage = (skip: number, limitPerPage: number) => [
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
