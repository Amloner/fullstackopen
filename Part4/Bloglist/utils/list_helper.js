const dummy = (blogs) => {

  return 1  // ...
}

const totalLikes = (blogs) => {

  const initialValue = 0;
  const sumWithInitial = blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    initialValue,
  );
    return  sumWithInitial
}

const maxLikes = (blogs) => {

  const likes = (blogs.map((number) => number.likes))
  const max = Math.max(...likes);
  console.log(max)

  const found = blogs.find((element) => element.likes = likes)

    return  found.title
   
}




module.exports = {
  dummy,totalLikes,maxLikes
}