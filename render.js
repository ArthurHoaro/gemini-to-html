const { htmlEscape, htmlUnescape } = require('escape-goat')
const slug = require('slug')

module.exports = render

function id(content) {
  return slug(content, {
    replacement: '_'
  })
}

function render (tokens) {
  return tokens.map((line) => {
    const { type } = line

    const out = ((line) => {
      switch (type) {
        case 'quote': return htmlEscape`<blockquote class="${line.className ?? ''}">${line.content}</blockquote>`
        case 'header': return htmlEscape`<h${line.level} id="${id(line.content)}" class="${line.className ?? ''}">${line.content}</h${line.level}>`
        case 'link': return htmlEscape`<p><a href="${line.href}" class="${line.className ?? ''}" rel="${line.rel}">${line.content}</a></p>`
        case 'pre': return line.alt
          ? htmlEscape`<pre class="${line.className ?? ''}"><code class="language-${line.alt}">\n${line.items.join('\n')}\n</code></pre>`
          : htmlEscape`<pre class="${line.className ?? ''}">\n${line.items.join('\n')}\n</pre>`
        case 'list': return `<ul ${htmlEscape`class="${line.className ?? ''}"`}>\n${line.items.map((item) => htmlEscape`\t<li>${item}</li>`).join('\n')}\n</ul>`
        default: return line.content ? htmlEscape`<p class="${line.className ?? ''}">${line.content}</p>` : '<br/>'
      }
    })(line);

    out = out.replace(' class=""', '');
    out = out.replace(' rel=""', '');

    return out;
  }).join('\n')
}
