# Cover

### <a href="https://github.com/fluidtrends/chunky-website/edit/master/assets/text/docs/components/cover.md" target="_blank" rel="noopener"> Improve this doc <svg viewBox="0 0 896 896" class="" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>

</a>
Component used to display Cover like content

When to use it ?

Whenever you want to display information alongside with a picture. Mostly used on landing pages as the first sections.

Example of how to use in your chunk.json:

```json
"cover": {
	"backgroundColor": "#61AFE1",
	"opacity": 0.6,
	"title": "Title of the cover",
	"subtitle": "Subtitle of the Cover",
	"titleStyle": {
		"margin": "50px"
	},
	"subtitleStyle": {
		"textAlign": "center"
	},
	"type": "default",
	"image": "image.jpg"
}
```

This prop can be defined at the rooter level of your chunk. No need to put it under your components key.

<br>
### **See it live <a href='/docs/example/cover' target='_blank' rel='noopener'>here</a>.**
<br>

### API

You can use different types of covers such as: **_presenation_**, **_simple_**, **_menu_**, **_ico_** and **_section_**.

| Property        | Description                                                                                                                                          | Type               | Default                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------- |
| source          | this can be specified as cover so Chunky knows to render the Cover component. This is used only when calling cover in the "Components" key           | string             | -                      |
| backgroundColor | background color of the cover                                                                                                                        | string             | -                      |
| opacity         | defines the opacity of the overlay that is on top of the image 0 -> the image is very visible, 1 -> black background.  It should be between 1 and 0. | number             | -                      |
| title           | Title for the cover                                                                                                                                  | string             | -                      |
| subtitle        | Subtitle for the cover                                                                                                                               | string             | -                      |
| titleStyle      | Additional styling for the title                                                                                                                     | Object (CSS in JS) | ``` { margin: 20 } ``` |
| subtitleStyle   | Additional styling for the subtitle                                                                                                                  | Object (CSS in JS) | ``` { margin: 20 } ``` |
| type            | type of cover. must be one of: 'presentation', 'simple', 'menu', 'section', if not they'll be 'default'                                              | string             | default                |
| image           | image name for the cover, it will automatically look in assets folder                                                                                | string             | -                      |

