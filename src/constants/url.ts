const URL = {
  LOGIN: '/',
  LABELING_DATA_LIST: '/data/labeling',
  VALIDATING_DATA_LIST: '/data/validating',
  DONE_DATA_LIST: '/data/done',
  DATA_LABELING: '/data/:id/labeling',
  DATA_VALIDATING: '/data/:id/validating',
  DATA_DONE: '/data/:id/done',
  LONG_PROBLEM_LIST: '/problem/long',
  SHORT_PROBLEM_LIST: '/problem/short',
  MULTIPLE_PROBLEM_LIST: '/problem/multiple',
  LONG_PROBLEM_DETAIL: `/problem/:id/long`,
  LONG_PROBLEM_ADD: `/problem/long/add`,
  LONG_PROBLEM_EDIT: `/problem/:id/long/edit`,
  SHORT_PROBLEM_DETAIL: `/problem/:id/short`,
  SHORT_PROBLEM_ADD: `/problem/short/add`,
  SHORT_PROBLEM_EDIT: `/problem/:id/short/edit`,
  MULTIPLE_PROBLEM_DETAIL: `/problem/:id/multiple`,
  MULTIPLE_PROBLEM_ADD: `/problem/multiple/add`,
  MULTIPLE_PROBLEM_EDIT: `/problem/:id/multiple/edit`,
  DASHBOARD: '/dashboard',
  USER: '/user',
};

const URLWithParam = {
  DATA_LABELING: (id: string) => `/data/${id}/labeling`,
  DATA_VALIDATING: (id: string) => `/data/${id}/validating`,
  DATA_DONE: (id: string) => `/data/${id}/done`,
  LONG_PROBLEM_DETAIL: (id: string) => `/problem/${id}/long`,
  LONG_PROBLEM_EDIT: (id: string) => `/problem/${id}/long/edit`,
  SHORT_PROBLEM_DETAIL: (id: string) => `/problem/${id}/short`,
  SHORT_PROBLEM_EDIT: (id: string) => `/problem/${id}/short/edit`,
  MULTIPLE_PROBLEM_DETAIL: (id: string) => `/problem/${id}/multiple`,
  MULTIPLE_PROBLEM_EDIT: (id: string) => `/problem/${id}/multiple/edit`,
};

export { URL, URLWithParam };
