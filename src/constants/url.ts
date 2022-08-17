const URL = {
  LOGIN: '/',
  LABELING_DATA_LIST: '/data/labeling',
  VALIDATING_DATA_LIST: '/data/validating',
  DONE_DATA_LIST: '/data/done',
  DATA_LABELING: '/data/labeling/:id',
  DATA_VALIDATING: '/data/validating/:id',
  DATA_DONE: '/data/done/:id',
  LONG_PROBLEM_LIST: '/problem/long',
  SHORT_PROBLEM_LIST: '/problem/short',
  MULTIPLE_PROBLEM_LIST: '/problem/multiple',
  LONG_PROBLEM_DETAIL: `/problem/long/:id`,
  LONG_PROBLEM_ADD: `/problem/long/add`,
  LONG_PROBLEM_EDIT: `/problem/long/:id/edit`,
  SHORT_PROBLEM_DETAIL: `/problem/short/:id`,
  SHORT_PROBLEM_ADD: `/problem/short/add`,
  SHORT_PROBLEM_EDIT: `/problem/short/:id/edit`,
  MULTIPLE_PROBLEM_DETAIL: `/problem/multiple/:id`,
  MULTIPLE_PROBLEM_ADD: `/problem/multiple/add`,
  MULTIPLE_PROBLEM_EDIT: `/problem/multiple/:id/edit`,
  DASHBOARD: '/dashboard',
  USER: '/user',
};

const URLWithParam = {
  DATA_LABELING: (id: string) => `/data/labeling/${id}`,
  DATA_VALIDATING: (id: string) => `/data/validating/${id}`,
  DATA_DONE: (id: string) => `/data/done/${id}`,
  LONG_PROBLEM_DETAIL: (id: string) => `/problem/long/${id}`,
  LONG_PROBLEM_EDIT: (id: string) => `/problem/long/${id}/edit`,
  SHORT_PROBLEM_DETAIL: (id: string) => `/problem/short/${id}`,
  SHORT_PROBLEM_EDIT: (id: string) => `/problem/short/${id}/edit`,
  MULTIPLE_PROBLEM_DETAIL: (id: string) => `/problem/multiple/${id}`,
  MULTIPLE_PROBLEM_EDIT: (id: string) => `/problem/multiple/${id}/edit`,
};

export { URL, URLWithParam };
