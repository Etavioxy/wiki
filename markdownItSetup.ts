import anchor from 'markdown-it-anchor'
import multimdTable from 'markdown-it-multimd-table'
import prism from 'markdown-it-prism' // highlight
import katex from 'markdown-it-katex'
import attrs from 'markdown-it-attrs'
import taskLists from 'markdown-it-task-lists'

export default (md: any) => {
  md.use(anchor, {
    level: [1,2],
    permalink: anchor.permalink.headerLink(),
  });
  md.use(multimdTable);
  md.use(prism);
  md.use(katex, {
    throwOnError: false,
    errorColor: '#ce5e9a',
    output: 'html',
  });
  md.use(attrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
  });
  md.use(taskLists);
  //md.use(myPlugin);
}
