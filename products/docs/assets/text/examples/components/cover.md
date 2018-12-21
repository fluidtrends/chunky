# Cover Component API

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


# Playground