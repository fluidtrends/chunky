# Text 

### <a href="https://github.com/fluidtrends/chunky-website/edit/master/assets/text/docs/components/text.md" target="_blank" rel="noopener"> Improve this doc <svg viewBox="0 0 896 896" class="" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>

</a>
Component used to display Markdown content

When to use it ?

Whenever you want to display information that can be written in Markdown for easier development.

Example of how to use in your chunk.json:

```json
"text": {
	"source": "text",
	"textSource": "local://text",
	"style": {
		"margin": "10%"
	}
}
```

This will look for our **text.md** file inside the **assets** folder and display the content from it.

You can also display content directly from github if you use **textSource** like this:

```json
"text": "github://fluidtrends/chunky-website/blob/master/assets/text/docs/components/text"
```

We implemented a placeholder until your data loads, so no need to worry about that.

<br>
### **See it live <a href='/docs/example/text' target='_blank' rel='noopener'>here</a>.**
<br>


### API

If you want only to style your text just use the **style** property.

| Property   | Description                                                                                                  | Type               | Default                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------- |
| source     | source needs to be specified as text so Chunky knows to render the Text component                            | string             | -                                                                                     |
| textSource | location of the markdown. It can be both local or github, you can specify it by using: local:// or github:// | string             | -                                                                                     |
| style      | Additional styling for the text                                                                              | Object (CSS in JS) | ```{ textAlign: 'center', padding: '20px', maxWidth: '90vw', overflow: 'hidden' } ``` |



