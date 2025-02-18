export const colorDifference = (color1:string, color2:string) => {
  if (color1 === '' || color2 === '') {
    return Infinity;
  }
  const getRGB = (color:string) => color.match(/\d+/g)!.map(Number);
  const rgb1 = getRGB(color1);
  const rgb2 = getRGB(color2);
  const diff = Math.sqrt(
    Math.pow(rgb2[0] - rgb1[0], 2) +
    Math.pow(rgb2[1] - rgb1[1], 2) +
    Math.pow(rgb2[2] - rgb1[2], 2)
  );
  return diff;
}

let previousColor = '';

// Generate random RGB values (limit the range and ensure it's not too close to the previous color)
export const getRandomRGB = ()=> {
  const min = 80;
  const max = 180;
  let newColor = '';
  
  // Generate a new color, ensuring a significant difference from the previous color
  do {
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    newColor = `rgb(${r}, ${g}, ${b})`;
  } while (colorDifference(previousColor, newColor) < 100); // // Adjust the difference threshold
  
  previousColor = newColor;
  return newColor;
}