## Screenshots
<a href="url"><img src="https://github.com/skep1337/dynamic-gallery/assets/45910586/3c5a9c54-5412-4765-b91a-e9a376abe822" align="left" height="256" ></a>

### Mobile view
<a href="url"><img src="https://github.com/skep1337/dynamic-gallery/assets/45910586/81bec605-9b2e-481f-aa2c-d5528073a156" align="left" height="256" ></a>

## Dependencies

```
nginx
ffmpeg
inotify-tools
screen
```

Inside of your nginx config, (located at ```/etc/nginx/sites-enabled/default```)

Add the following to your "**server**" block:
```
location /images {
   autoindex on;
}
```

Then restart nginx ```systemctl restart nginx```

This will allow the javascript to access all image filenames.

## Setup

Create a directory named "**content**" inside the website directory.

Within the "**content**" directory, create another named "**thumbnails**".

Edit the variables in the **compress.sh** and **dirwatch.sh** to where those two directories are.

```
input_directory="<directory of content>"
output_directory="<directory of thumbnails>"
```

Add images you want to host and display into the **content** directory.

Run **compress.sh**. This will use ffmpeg to resize and compress any images in that directory, and place the output (*of the same filenames*) into the thumbnail directory.

```sh compress.sh```

I recommend screening the **dirwatch.sh** to have it run in the background. 

```screen sh dirwatch.sh```

To exit, press Ctrl + a + d

Now, any images you add into the **content** directory will automatically be resized, compressed, and added to the **thumbnail** directory.

## Additional features

If you left click an image, it will copy the url of the full image.

If you right click an image, it will directly open up a new tab of the full image.

Images are sorted by recently modified.

#### GIF support

The compress scripts already contain ffmpeg options to only include the first frame of the gif for the thumbnail.

I started this project so I could self-host gifs to use on discord lol.
