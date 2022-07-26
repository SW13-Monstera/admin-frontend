const API_URL = {
  LOGIN: '/v1/auth/login',
  REFRESH: '/v1/auth/refresh',
  LONG_PROBLEM_LIST: '/admin/problems/long',
  LONG_PROBLEM_CREATE: '/admin/problems/long',
  SHORT_PROBLEM_LIST: '/admin/problems/short',
  SHORT_PROBLEM_CREATE: '/admin/problems/short',
  MULTIPLE_PROBLEM_LIST: '/admin/problems/multiple',
  MULTIPLE_PROBLEM_CREATE: '/admin/problems/multiple',
  DATA_LIST: '/admin/user-answers',
  DATA_LIST_CREATE: '/admin/user-answers',
  USER_DETAIL: '',
  USER_LIST: '/v1/users',
};

const API_URL_WITH_PARAMS = {
  LONG_PROBLEM_DETAIL: (problem_id: string) => `/admin/problems/long/${problem_id}`,
  LONG_PROBLEM_UPDATE: (problem_id: string) => `/admin/problems/long/${problem_id}`,
  MULTIPLE_PROBLEM_DETAIL: (problem_id: string) => `/admin/problems/multiple/${problem_id}`,
  MULTIPLE_PROBLEM_UPDATE: (problem_id: string) => `/admin/problems/multiple/${problem_id}`,
  SHORT_PROBLEM_DETAIL: (problem_id: string) => `/admin/problems/short/${problem_id}`,
  SHORT_PROBLEM_UPDATE: (problem_id: string) => `/admin/problems/short/${problem_id}`,
  DATA_DETAIL: (user_answer_id: string) => `/admin/user-answers/${user_answer_id}`,
  DATA_LABELING: (user_answer_id: string) => `/admin/user-answers/${user_answer_id}/label`,
  DATA_VALIDATING: (user_answer_id: string) => `/admin/user-answers/${user_answer_id}/validate`,
};

export { API_URL, API_URL_WITH_PARAMS };
