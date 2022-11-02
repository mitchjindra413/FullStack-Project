require 'date'

startA = Date.parse('2020-01-01')
endA = Date.parse('2020-01-07')

startB = Date.parse('2000-01-08')
endB = Date.parse('2020-01-09')


p (startA <= endB)&&(endA >= startB)