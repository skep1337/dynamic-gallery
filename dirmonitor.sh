input_directory="<directory of content>"
output_directory="<directory of thumbnails>"

# monitor the directory for new files
inotifywait -m -e moved_to -e close_write -e create --format "%w%f" $input_directory | while read -r newfile
do
    if [ -f "$newfile" ]; then
        output_filename=$(basename "$newfile")
        output_path="$output_directory/$output_filename"

        ffmpeg -i "$newfile" -vf "scale=iw*0.75:ih*0.75" -q:v 3 -vframes 1 "$output_path"
    fi
done
