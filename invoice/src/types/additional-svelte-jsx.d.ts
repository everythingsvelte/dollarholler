// Reference: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md

declare namespace svelteHTML {
  // enhance elements

  // enhance attributes
  interface HTMLAttributes<HTMLDivElement> {
    'on:outofview'?: (event) => void;
  }
}
