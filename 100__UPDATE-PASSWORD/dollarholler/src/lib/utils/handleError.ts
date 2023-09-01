import { snackbar } from "$lib/stores/SnackbarStore";

export const displayErrorMessage = (error: Error) => {
  console.error(error);
  snackbar.send({
    message: error.message,
    type: "error",
  })
}