input_directory="<directory of content>"
output_directory="<directory of thumbnails>"

for image in $input_directory/*
do
    output_filename=$(basename "$image")
    output_path="$output_directory/$output_filename"

    ffmpeg -i "$image" -vf "scale=iw*0.75:ih*0.75" -q:v 3 -vframes 1 "$output_path"
done
