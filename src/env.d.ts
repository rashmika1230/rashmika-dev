interface ImportMetaEnv {
  /** Web3Forms access key for the contact form. Public by design: it only allows sending to your inbox. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
