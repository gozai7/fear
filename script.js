document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#element', {
        strings: ['Какой твой самый большой страх?'],
        typeSpeed: 50,
        showCursor: true,
        cursorChar: '|',
        onComplete: function() {
            var inputContainer = document.getElementById('inputContainer');
            inputContainer.classList.remove('hidden');
            inputContainer.classList.add('visible');
        },
        onCharAppended: function() {
            var audioTyping = new Audio('click1.mp3');
            audioTyping.play();
        }

    });


    document.getElementById('submitButton').addEventListener('click', function () {
        var userInput = document.getElementById('userInput').value.trim();
        var audio2 = new Audio('click2.mp3');
        audio2.play();
        if (userInput !== '') {
            hideContainerAndSearch(userInput);
        }
        else {
            hideContainerAndSearch("Пустота");
        }
    });

    function hideContainerAndSearch(query) {
        var container = document.querySelector('.container');
        container.classList.remove('visible');
        container.classList.add('hidden');
        searchPhotos(query);
    }

    function searchPhotos(query) {
        const apiKey = 'AHRU8uHEmH3pHbMUQc1XDR6YHJ2NutIY2kyQDBQfzWwPoQWLkiJStiiU';
        const perPage = 10;
        const locale = 'ru-RU';
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&locale=${locale}`;


        fetch(url, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                cacheImages(data.photos);
            } else {
                alert('Попробуйте свой другой страх...');
                var container = document.querySelector('.container');
                container.classList.add('visible');
                container.classList.remove('hidden');
            }
        })
    }

    function cacheImages(photos) {
        const imageCache = [];

        photos.forEach((photo, index) => {
            const img = new Image();
            img.onload = function() {
                imageCache.push(photo.src.large);
                if (imageCache.length === photos.length) {
                    displayBackgroundSlideshow(imageCache);
                    
                    
                }
            };
            img.onerror = function() {
                console.error(`Ошибка загрузки изображения ${photo.src.large}`);
            };
            img.src = photo.src.large;
        });
    }

    function displayBackgroundSlideshow(images) {
        let currentIndex = 0;
        const totalImages = images.length;

        function changeBackground() {
            var audio3 = new Audio('click3.mp3');
            if (currentIndex >= totalImages) {
                currentIndex = totalImages - 1;
                setTimeout(window.close(), 150)
                return;
            }

            const imageUrl = images[currentIndex];
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';

            currentIndex++;
            audio3.play();
            setTimeout(changeBackground, 150);
        }

        changeBackground();
    }
});
