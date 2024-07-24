const { htmlEscape } = require('escape-goat')
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
    const className = line.className ? ` class="${line.className}"` : ''

    switch (type) {
      case 'quote': return htmlEscape`<blockquote${className}>${line.content}</blockquote>`
      case 'header': return htmlEscape`<h${line.level} id="${id(line.content)}"${className}>${line.content}</h${line.level}>`
      case 'link': return htmlEscape`<p><a href="${line.href}"${className}>${line.content}</a></p>`
      case 'pre': return line.alt
        ? htmlEscape`<pre${className}><code class="language-${line.alt}">\n${line.items.join('\n')}\n</code></pre>`
        : htmlEscape`<pre${className}>\n${line.items.join('\n')}\n</pre>`
      case 'list': return htmlEscape`<ul${className}>\n${line.items.map((item) => htmlEscape`\t<li>${item}</li>`).join('\n')}\n</ul>`
      default: return line.content ? htmlEscape`<p${className}>${line.content}</p>` : '<br/>'
    }
  }).join('\n')
}
