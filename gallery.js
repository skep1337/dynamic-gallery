const gallery = document.getElementById('gallery');

fetch('content/')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, 'text/html');
        const links = Array.from(htmlDocument.querySelectorAll('a'));

        const imageFilenames = links
            .map(link => link.textContent.trim())
            // hide directories and the nginx fancyindex page.
            .filter(filename => !filename.includes('/') && !filename.includes('↓') &&
                !filename.includes('File') && !filename.includes('Date'));

        const fetchLastModifiedPromises = imageFilenames.map(async filename => {
            const response = await fetch('content/' + filename, { method: 'HEAD' });
            return ({
                filename: filename,
                lastModified: new Date(response.headers.get('last-modified'))
            });
        });

        Promise.all(fetchLastModifiedPromises)
            .then(imageInfoArray => {
                const sortedImageInfo = imageInfoArray
                    .filter(imageInfo => imageInfo.lastModified !== null)
                    .sort((a, b) => b.lastModified - a.lastModified);

                sortedImageInfo.forEach(imageInfo => {
                    const img = document.createElement('img');
                    const thumbnailUrl = 'content/thumbnails/' + imageInfo.filename;
                    img.src = img.alt = thumbnailUrl;

                    img.addEventListener('click', () => {
                        const fixed_url = imageInfo.filename.split(' ').join('%20');
                        navigator.clipboard.writeText(window.location.origin + '/images/content/' + fixed_url);
                    });

                    img.addEventListener('contextmenu', (menu) => {
                        menu.preventDefault();
                        const link = document.createElement('a');
                        link.href = 'content/' + imageInfo.filename;
                        link.target = '_blank';
                        link.click();
                    });

                    gallery.appendChild(img);
                });
            });
    });