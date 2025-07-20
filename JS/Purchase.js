function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');

    mainImage.src = thumbnail.src;

    const reducedHeight = thumbnail.naturalHeight * 0.5;
    mainImage.style.height = reducedHeight + 'px';


    mainImage.style.width = 'auto';

}
