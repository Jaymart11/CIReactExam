<?php

function sortArray($arr, $param)
{
    if ($param === 1) {
        $sortedArray = $arr;
        sort($sortedArray);

        return $sortedArray;
    } elseif ($param === 2) {
        $sortedArray = $arr;
        rsort($sortedArray);

        return $sortedArray;
    } else {
        return 'Invalid parameter. Please use 1 or 2.';
    }
}

echo '<pre>';
print_r(sortArray([5, 3, 9, 1, 7], 1));
echo '<br/>';
print_r(sortArray([5, 3, 9, 1, 7], 2));
