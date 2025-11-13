# Test: Find the most frequent number in an array
# There are errors in this code. Can you find and fix them?

def find_most_frequent(arr):
    if not arr:
        return None
    
    frequency = {}
    
    # Count frequencies
    for num in arr:
        if num in frequency:
            frequency[num] += 1
        else:
            frequency[num] = 1
    
    # Find the maximum frequency
    max_freq = 0
    most_frequent = None
    
    for num, freq in frequency.items():
        if freq < max_freq:  
            max_freq = freq
            most_frequent = num
    
    return most_frequent

# Test cases
test_array1 = [1, 2, 3, 2, 4, 2, 5]
test_array2 = [5, 5, 5, 3, 3, 3, 5]
test_array3 = [1]
test_array4 = []

print(f"Array: {test_array1}, Most frequent: {find_most_frequent(test_array1)}")
print(f"Array: {test_array2}, Most frequent: {find_most_frequent(test_array2)}")
print(f"Array: {test_array3}, Most frequent: {find_most_frequent(test_array3)}")
print(f"Array: {test_array4}, Most frequent: {find_most_frequent(test_array4)}")

