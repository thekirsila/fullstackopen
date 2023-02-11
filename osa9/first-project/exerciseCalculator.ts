interface ReturnObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[], targetAmount: number): ReturnObject => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.filter(e => e !== 0).length
  const target: number = targetAmount
  const average: number = hours.reduce((a, b) => a + b, 0)/hours.length
  const success: boolean = average > targetAmount
  const rating: number = 1
  const ratingDescription: string = 'You can always try harder'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))