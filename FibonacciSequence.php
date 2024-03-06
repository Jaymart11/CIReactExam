<?php
function findFibonacciPosition($sequence) {
  $fibPrev = 1;
  $fibCurr = $sequence;
  $fibNext = $fibPrev + $fibCurr;
  $position = 3; // Start from the 3rd position since we've already set the first two Fibonacci numbers

  while ($fibNext <= 4000000) {
    $fibPrev = $fibCurr;
    $fibCurr = $fibNext;
    $fibNext = $fibPrev + $fibCurr;
    $position++;
  }

  return $position;
}

echo findFibonacciPosition(500);
?>