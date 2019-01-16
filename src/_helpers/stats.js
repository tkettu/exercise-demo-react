export const cumulative_sum = ( arr ) => (
   arr.reduce((a, x, i) => [...a, x + (a[i-1] || 0)], [] )  
)