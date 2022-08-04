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
  MUTILPLE_PROBLEM_LIST: '/problem/multiple',
  LONG_PROBLEM_DETAIL: `/problem/:id/long`,
  LONG_PROBLEM_ADD: `/problem/long/add`,
  LONG_PROBLEM_EDIT: `/problem/:id/long/edit`,
  DASHBOARD: '/dashboard',
  USER: '/user',
};

const URLWithParam = {
  DATA_LABELING: (id: string) => `/data/${id}/labeling`,
  DATA_VALIDATING: (id: string) => `/data/${id}/validating`,
  DATA_DONE: (id: string) => `/data/${id}/done`,
  LONG_PROBLEM_DETAIL: (id: string) => `/problem/${id}/long`,
  LONG_PROBLEM_EDIT: (id: string) => `/problem/${id}/long/edit`,
};

export { URL, URLWithParam };
