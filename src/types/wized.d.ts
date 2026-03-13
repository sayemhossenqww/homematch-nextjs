/**
 * Global type declarations for Wized and Finsweet custom HTML attributes.
 * These custom attributes (wized, filter, sort, precision, count, etc.) are
 * used throughout the Next.js pages that embed Wized-powered content.
 */

import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    // Wized core attributes
    wized?: string;
    "wized-cloak"?: string;
    "wized-loader"?: string;
    // Filter / sort controls
    filter?: string;
    sort?: string;
    precision?: string;
    count?: string;
    // CRL / misc custom
    crl?: string;
    params?: string;
    // Review-specific
    "qb-filter"?: string;
    // Finsweet attributes
    "fs-cmsload-element"?: string;
    "fs-cmssort-field"?: string;
    "fs-cmsfilter-element"?: string;
  }
  interface AnchorHTMLAttributes<T> {
    wized?: string;
    filter?: string;
    sort?: string;
    precision?: string;
    params?: string;
    crl?: string;
  }
  interface ImgHTMLAttributes<T> {
    wized?: string;
  }
  interface InputHTMLAttributes<T> {
    wized?: string;
  }
}
