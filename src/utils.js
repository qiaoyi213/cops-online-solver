function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getRandomColorTable(num_colors) {
    var colors = [];
    for (var i = 0; i < num_colors; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}