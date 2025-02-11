export const selectLoading = (state) => state.pagination.loading;
export const selectError = (state) => state.pagination.error;
export const selectTodos = (state) => state.pagination.todos || [];
export const selectPage = (state) => state.pagination.page || 1;