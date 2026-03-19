/**
 * ArticleBody
 * Renders raw HTML content from the editor via dangerouslySetInnerHTML.
 * Styling is applied via Tailwind's `prose`-like utility classes scoped to
 * .article-body — defined in globals.css so the editor HTML needs zero
 * class attributes on its tags.
 *
 * Supported editor output tags:
 *   h2, h3, p, ul, ol, li, strong, em, blockquote,
 *   <div class="pro-tip">, <div class="warning">
 */
export default function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
