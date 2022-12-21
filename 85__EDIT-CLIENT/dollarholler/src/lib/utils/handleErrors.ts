import { snackbar } from "$lib/stores/SnackbarStore";

export const displayErrorMessage = (error: { code: string, details: string, hint: string, message: string }) => {
  console.error(error);
  snackbar.send({
    message: error.message,
    type: 'error',
  })
}