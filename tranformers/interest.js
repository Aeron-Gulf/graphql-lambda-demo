const transformInterest = item => {
    return {
        id: item.ID,
        colors: item.colors,
        foods: item.foods,
        movies: item.movies,
        animals: item.animals 
    }
}

module.exports = {
    transformInterest,
}