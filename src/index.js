#!/usr/bin/env node
const gherkin = require('gherkin')
const cat = require('globcat');
const fs = require('fs');
const path = require('path');

const toHTML = require('@shedali/mdgen').toHTML

const processfile = file => parsecontents(getcontents(file));

const parsecontents = content => toHTML("features", content);

const printcontents = contents => console.log(contents);

const getcontents = file => fs.readFileSync(path.join(process.cwd(), file), 'utf-8') + "\n \n ---------------- \n \n ";

const files = fs.readdirSync(path.join(process.cwd(), 'features'))

const featurefile = f => path.join('features', f);

const html = `

<link rel="stylesheet"
      href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css">
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>


<pre style="width: 600px !important">
<code class="gherkin" >
${files.reduce((acc, cur)=>acc.concat(getcontents(featurefile(cur))), []).join('')}
</code>
</pre>



<script>
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block)
  })
})
</script>
`

parsecontents(html)