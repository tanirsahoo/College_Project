def count_distinct_pairs(project_costs, target):
    # Use a set to store project costs for fast lookup
    project_costs_set = set(project_costs)
    count = 0

    # Iterate through each project cost
    for cost in project_costs:
        # Check for pairs that have the desired absolute difference
        if (cost + target) in project_costs_set:
            count += 1
        if (cost - target) in project_costs_set:
            count += 1

    # Divide by 2 to account for double-counting (e.g., (a, b) and (b, a))
    return count // 2

# Example usage
n = 3
project_costs = [1, 3, 5]
target = 2

result = count_distinct_pairs(project_costs, target)
print("Number of distinct pairs:", result)