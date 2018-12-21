# Hey there I'm Chunky and this is my website

## You can find it here: <a href='http://www.chunky.io/' target='_blank'>chunky.io</a>

In order to start the website run:

```javascript
npm i
```

After installing all the modules:

```javascript
chunky start web
```

In case you got the following error:

```_➡ Starting the web packager on port 8082 ...
★ This product is not provisioned. Continuing anyways.
✗ Error: ENOENT: no such file or directory, mkdir '../chunky/chunky/products/docs/.chunky/web' _
```

Do the following:

```
mkdir .chunky
cd .chunky
touch web
cd ..
chunky start web
```

All should work after.
