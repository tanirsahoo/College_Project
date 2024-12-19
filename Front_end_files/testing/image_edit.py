def minimum_difference(measurements):
    if measurements is None or len(measurements) < 2:
        print("Insufficient data to calculate differences.")
        return

    # Sort the list to calculate differences between consecutive elements
    measurements.sort()
    print(measurements)

    # Initialize variables to find the minimum difference
    min_difference = float('inf')
    result_pairs = []

    # Calculate the minimum difference
    for i in range(len(measurements) - 1):
        diff = abs(measurements[i + 1] - measurements[i])

        if diff < min_difference:
            min_difference = diff
            result_pairs.clear()  # Clear old pairs since we found a smaller difference
            result_pairs.append((measurements[i], measurements[i + 1]))
        elif diff == min_difference:
            result_pairs.append((measurements[i], measurements[i + 1]))

    # Sort the pairs with the minimum difference
    result_pairs.sort()

    # Print the pairs with the minimum difference
    for pair in result_pairs:
        print(f"{pair[0]} {pair[1]}")


measurements = [-1 , 3 , 6 , -5 , 0]
minimum_difference(measurements)
