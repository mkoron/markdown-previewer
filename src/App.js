import React, { Component } from 'react';
import './App.css';
import marked from 'marked';
import hljs from 'highlight.js';

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class App extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: placeholder
    }
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleMarkup() {
    const renderer = new marked.Renderer();
    renderer.link = ( href, title, text ) => `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`; 

    marked.setOptions({
      renderer,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })

    return {
			__html: marked(this.state.text)
		}
  }

  render() {
    return (
      <div className="App container">
        <h1 className="title has-text-grey is-uppercase has-text-centered">Markdown Previewer</h1>
        <div className="columns">
          <div className="column">
          <h2 className="subtitle">Enter Markdown</h2>
            <textarea id="editor" className="textarea" onChange={this.handleChange}>{this.state.text}</textarea>
          </div>
          <div className="column">
            <h2 className="subtitle">Preview</h2>
              <div id="preview" dangerouslySetInnerHTML={this.handleMarkup()}></div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
