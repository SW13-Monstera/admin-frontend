const API_URL = {
  LOGIN: '/v1/auth/login',
  PROBLEM_LIST: '/admin/problems/long',
  PROBLEM_DETAIL: (problem_id: number) => `/admin/problems/long/${problem_id}`,
  PROBLEM_CREATE: '/admin/problems/long',
  PROBLEM_UPDATE: (problem_id: number) => `/admin/problems/long/${problem_id}`,
  DATA_LIST: '/admin/user-answers',
  DATA_DETAIL: (user_answer_id: number) => `/admin/user-answers/${user_answer_id}`,
  DATA_LABELING: (user_answer_id: number) => `/admin/user-answers/${user_answer_id}/label`,
  DATA_VALIDATING: (user_answer_id: number) => `/admin/user-answers/${user_answer_id}/validate`,
  DATA_LIST_CREATE: '/admin/user-answers',
};

export { API_URL };
